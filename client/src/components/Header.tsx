import { Link } from 'react-router-dom';

export function Header() {
  // Mock login state for design buildout
  const isLoggedIn = false;

  return (
    <header className="h-[64px] bg-bg-primary/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-content mx-auto px-4 lg:px-16 h-full flex items-center justify-between">
        
        <Link to="/" className="text-[20px] font-extrabold tracking-tight">
          ☠️ <span className="text-accent-light">Regret</span><span className="text-text-primary">Engine</span>
        </Link>

        <nav className="hidden md:flex gap-6 absolute left-1/2 -translate-x-1/2">
          <Link to="/" className="text-sm text-text-muted hover:text-text-primary font-medium transition-colors">Home</Link>
          <Link to="/leaderboard" className="text-sm text-text-muted hover:text-text-primary font-medium transition-colors">Leaderboard</Link>
          <Link to="/profile" className="text-sm text-text-muted hover:text-text-primary font-medium transition-colors">Profile</Link>
        </nav>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-text-primary font-medium hidden sm:block">User</span>
              <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-text-primary font-bold shadow-md cursor-pointer hover:bg-accent-mid transition-colors">
                U
              </div>
            </div>
          ) : (
            <>
              <button className="hidden sm:block border-border border text-text-primary bg-transparent py-2 px-4 rounded-lg font-semibold text-sm hover:bg-white/5 transition-colors">
                Sign In
              </button>
              <button className="bg-accent text-text-primary py-2 px-4 rounded-lg font-semibold text-sm hover:bg-accent-mid hover:shadow-[0_0_16px_rgba(167,139,250,0.3)] transition-all">
                Sign Up
              </button>
            </>
          )}
        </div>
        
      </div>
    </header>
  );
}
