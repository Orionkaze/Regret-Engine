import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { supabase } from '../services/supabase';
import { generateRegretResponse } from '../services/groq';
import { normalizeDecision } from '../lib/utils';
import { SimulationMode } from '../types';

const router = Router();

const simulateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: 'Simulation rate limit reached. Wait a moment.' },
});

router.post('/', simulateLimiter, async (req, res) => {
  try {
    const { decision, mode } = req.body;
    const { userId } = req.body; // Passed gracefully from secure client

    if (!decision || typeof decision !== 'string') {
      return res.status(400).json({ error: 'decision is required and must be a string' });
    }
    if (!['savage', 'motivational', 'reality'].includes(mode)) {
      return res.status(400).json({ error: 'mode must be savage, motivational, or reality' });
    }

    const cacheKey = `${normalizeDecision(decision)}:${mode}`;

    // 1. Cache Check
    const { data: cached } = await supabase
      .from('response_cache')
      .select('response, created_at')
      .eq('cache_key', cacheKey)
      .single();

    if (cached) {
      const ageMs = Date.now() - new Date(cached.created_at).getTime();
      if (ageMs < 24 * 60 * 60 * 1000) {
        return res.status(200).json(cached.response);
      }
    }

    // 2. Habit Memory Initialization
    let repeatCount = 0;
    if (userId) {
      const { data: history } = await supabase
        .from('decisions')
        .select('id')
        .eq('user_id', userId)
        .ilike('decision_text', `%${decision.substring(0, 20)}%`);
      repeatCount = history ? history.length : 0;
    }

    // 3. AI Generation
    const result = await generateRegretResponse(decision, mode as SimulationMode, repeatCount);

    // 4. Upsert Cache Matrix
    await supabase.from('response_cache').upsert({ cache_key: cacheKey, response: result }, { onConflict: 'cache_key' });

    // 5. Commit Extrapolation Trace 
    const dbPayload = {
      user_id: userId || null,
      decision_text: decision,
      mode,
      regret_score: result.regretScore,
      score_label: result.scoreLabel,
      roast_text: result.roastText,
      outcomes: result.outcomes,
      mood_data: result.moodData,
      category: result.category,
      repeat_count: repeatCount + 1,
      is_public: true
    };

    const { error: insertError } = await supabase.from('decisions').insert(dbPayload);
    if (insertError) {
      console.warn("DB Insert Minor Sync Failure", insertError);
    } 

    // 6. Habit Persistence
    if (userId) {
      const { data: habit } = await supabase
        .from('habit_counts')
        .select('count')
        .eq('user_id', userId)
        .eq('category', result.category)
        .single();

      await supabase.from('habit_counts').upsert({
        user_id: userId,
        category: result.category,
        count: habit ? habit.count + 1 : 1
      }, { onConflict: 'user_id,category' });

      // Profile Incrementations
      const { data: profile } = await supabase.from('profiles').select('total_regret_score, decision_count').eq('id', userId).single();
      if (profile) {
        await supabase.from('profiles').update({
          total_regret_score: profile.total_regret_score + result.regretScore,
          decision_count: profile.decision_count + 1
        }).eq('id', userId);
      }
    }

    return res.status(200).json(result);

  } catch (err) {
    console.error('[POST /api/simulate]', err);
    return res.status(500).json({ error: 'Internal server error while simulating regret.' });
  }
});

export default router;
