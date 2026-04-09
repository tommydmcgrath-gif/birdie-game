import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Leaderboard } from './pages/Leaderboard';
import { PunchCard } from './pages/PunchCard';
import { JoinPlayer } from './pages/JoinPlayer';
import { CourseInfo } from './pages/CourseInfo';
import { Rules } from './pages/Rules';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Leaderboard />} />
          <Route path="/join" element={<JoinPlayer />} />
          <Route path="/player/:playerId" element={<PunchCard />} />
          <Route path="/course" element={<CourseInfo />} />
          <Route path="/rules" element={<Rules />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
