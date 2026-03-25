import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Result } from './pages/Result';
import { Leaderboard } from './pages/Leaderboard';
import { Profile } from './pages/Profile';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="min-h-[calc(100vh-64px)] w-full overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<Result />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
