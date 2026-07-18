import { HashRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import SearchPage from './pages/SearchPage';
import StatisticsPage from './pages/StatisticsPage';
import RankingPage from './pages/RankingPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<SearchPage />} />
          <Route path="statistics" element={<StatisticsPage />} />
          <Route path="ranking" element={<RankingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
