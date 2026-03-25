const envUrl = import.meta.env.VITE_API_URL;
const BASE_URL = envUrl ? (envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`) : '/api';
export const api = {
  simulate: async (decision: string, mode: string, userId?: string) => {
    const res = await fetch(`${BASE_URL}/simulate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ decision, mode, userId }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to simulate');
    return data;
  },
  
  getUserStats: async (userId: string) => {
    const res = await fetch(`${BASE_URL}/user/stats?userId=${userId}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to get stats');
    return data;
  },
  
  getLeaderboard: async () => {
    const res = await fetch(`${BASE_URL}/leaderboard`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch leaderboard');
    return data;
  },
  
  reactToDecision: async (decisionId: string, type: string, userId: string) => {
    const res = await fetch(`${BASE_URL}/leaderboard/${decisionId}/react`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, userId })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to react');
    return data;
  }
};
