import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import SearchPage from '@/pages/SearchPage';
import StatisticsPage from '@/pages/StatisticsPage';
import RankingPage from '@/pages/RankingPage';
import NotFoundPage from '@/pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<SearchPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/ranking" element={<RankingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
