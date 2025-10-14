import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import OnboardingPage from './pages/OnboardingPage';
import CorePortfolioPage from './pages/CorePortfolioPage';
import StockPortfolioPage from './pages/StockPortfolioPage';
import ScreenerPage from './pages/ScreenerPage';
import AssistantPage from './pages/AssistantPage';
import DisclaimerModal from './components/DisclaimerModal';
import StockDetailPage from './pages/StockDetailPage';
import IndustriesPage from './pages/IndustriesPage';

function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/portfolio/etf" element={<CorePortfolioPage />} />
            <Route path="/portfolio/stock" element={<StockPortfolioPage />} />
            <Route path="/screener" element={<ScreenerPage />} />
            <Route path="/stock/:ticker" element={<StockDetailPage />} />
            <Route path="/assistant" element={<AssistantPage />} />
            <Route path="/industries" element={<IndustriesPage />} />
          </Routes>
        </Layout>
        <DisclaimerModal />
      </HashRouter>
    </AppProvider>
  );
}

export default App;