import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { supabase } from '../lib/supabase';
import { AuthModal } from './AuthModal';

export function Header() {
  const { user } = useAppStore();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="h-[64px] bg-bg-primary/90 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-content mx-auto px-4 lg:px-16 h-full flex items-center justify-between">
        
        <Link to="/" className="text-[20px] font-extrabold tracking-tight">
          ☠️ <span className="text-accent-light">Regret</span><span className="text-text-primary">Engine</span>
        </Link>

        <nav className="hidden md:flex gap-6 absolute left-1/2 -translate-x-1/2 mt-1">
          <Link to="/" className="text-sm text-text-muted hover:text-text-primary font-medium transition-colors">Home</Link>
          <Link to="/leaderboard" className="text-sm text-text-muted hover:text-text-primary font-medium transition-colors">Leaderboard</Link>
          <Link to="/profile" className="text-sm text-text-muted hover:text-text-primary font-medium transition-colors">Profile</Link>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-text-muted hidden sm:block truncate max-w-[150px]">
                {user.email}
              </span>
              <button 
                onClick={handleLogout}
                className="text-xs font-semibold text-brand-danger border border-brand-danger/30 bg-transparent py-1.5 px-3 rounded hover:bg-brand-danger/10 transition-colors cursor-pointer"
              >
                Log Out
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsAuthOpen(true)}
              className="bg-accent text-text-primary py-2 px-5 rounded-lg font-semibold text-sm hover:bg-accent-mid hover:shadow-[0_0_16px_rgba(167,139,250,0.3)] transition-all cursor-pointer"
            >
              Sign In
            </button>
          )}
        </div>
        
      </div>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </header>
  );
}
