import { useState } from 'react';
import { createPortal } from 'react-dom';
import { supabase } from '../lib/supabase';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: Props) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onClose();
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage('Check your email. We sent a confirmation link.');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-bg-card border border-border w-full max-w-sm rounded-card p-6 md:p-8 shadow-2xl relative animate-[fadeUp_200ms_ease-out_forwards]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-5 text-text-muted hover:text-text-primary text-2xl font-light leading-none"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Welcome Back 💀' : 'Join the Chaos 🔥'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-widest mb-1.5">Email</label>
            <input 
              type="email" 
              value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full bg-bg-input border border-border rounded-inner px-4 py-2.5 outline-none focus:border-accent-mid transition-colors text-text-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-widest mb-1.5">Password</label>
            <input 
              type="password" 
              value={password} onChange={e => setPassword(e.target.value)} required minLength={6}
              className="w-full bg-bg-input border border-border rounded-inner px-4 py-2.5 outline-none focus:border-accent-mid transition-colors text-text-primary"
            />
          </div>

          {error && <div className="text-brand-danger text-[13px] font-semibold mt-1 bg-brand-danger/10 p-2 rounded">{error}</div>}
          {message && <div className="text-brand-success text-[13px] font-semibold mt-1 bg-brand-success/10 p-2 rounded">{message}</div>}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-2 bg-accent text-text-primary py-3 rounded-inner font-semibold hover:bg-accent-mid transition-colors shadow-md disabled:opacity-50"
          >
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-muted">
          {isLogin ? "Don't have an account?" : "Already regret this?"}
          <button 
            type="button"
            onClick={() => { setIsLogin(!isLogin); setError(null); setMessage(null); }}
            className="ml-2 text-accent-light font-semibold hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>,
    document.body
  );
}
