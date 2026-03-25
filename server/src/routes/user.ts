import { Router } from 'express';
import { supabase } from '../services/supabase';

const router = Router();

router.get('/stats', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId || typeof userId !== 'string') {
      return res.status(401).json({ error: 'Valid userId query param required' });
    }

    const { data: profile, error: profErr } = await supabase.from('profiles').select('*').eq('id', userId).single();
    const { data: habits, error: habErr } = await supabase.from('habit_counts').select('*').eq('user_id', userId);
    
    if (profErr || !profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    return res.json({ profile, habits });

  } catch (error) {
    console.error('[GET /api/user/stats]', error);
    return res.status(500).json({ error: 'Failed to fetch user stats' });
  }
});

export default router;
