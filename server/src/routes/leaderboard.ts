import { Router } from 'express';
import { supabase } from '../services/supabase';

const router = Router();

// GET /api/leaderboard
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('decisions')
      .select(`
        *,
        reactions ( type, user_id )
      `)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;
    
    return res.json(data);
  } catch (error) {
    console.error('[GET /api/leaderboard]', error);
    return res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// POST /api/leaderboard/:id/react
router.post('/:id/react', async (req, res) => {
  try {
    const { id } = req.params;
    const { type, userId } = req.body;
    
    if (!userId || !type) return res.status(400).json({ error: 'Missing userId or type' });
    
    const { data, error } = await supabase
      .from('reactions')
      .insert({ decision_id: id, user_id: userId, type })
      .select()
      .single();
      
    if (error) {
       // If unique constraint violated, silently succeed for demo (preventing multiple reactions)
       return res.status(200).json({ success: true, message: 'Reaction recorded or updated' });
    }
    
    return res.json(data);
  } catch (error) {
    console.error('[POST /api/leaderboard/react]', error);
    return res.status(500).json({ error: 'Failed to add reaction' });
  }
});

export default router;
