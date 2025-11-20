import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { explainPortfolio, getStressTestExplanation } from '../services/marketService';
import InteractiveAllocation from '../components/portfolio/InteractiveAllocation';
import PerformanceChart from '../components/charts/PerformanceChart';
import Card from '../components/ui/Card';
import PortfolioHoldingsDetail from '../components/portfolio/PortfolioHoldingsDetail';

const MetricCard: React.FC<{ title: string; value: string; }> = ({ title, value }) => (
    <div className="bg-brand-surface p-4 rounded-lg border border-brand-border text-center">
        <p className="text-sm text-brand-secondary">{title}</p>
        <p className="text-2xl font-semibold text-brand-primary">{value}</p>
    </div>
);

const generatePerformanceData = (initialAmount: number, expectedReturn: number, volatility: number) => {
    const data = [{ name: 'Start', portfolio: initialAmount }];
    let currentValue = initialAmount;
    const monthlyReturn = expectedReturn / 100 / 12;
    const monthlyVolatility = volatility / 100 / Math.sqrt(12);
    
    for (let i = 1; i <= 12; i++) {
        const date = new Date();
        date.setMonth(date.getMonth() - (12 - i));
        const randomFactor = (Math.random() - 0.5) * 2; 
        const change = currentValue * (monthlyReturn + randomFactor * monthlyVolatility);
        currentValue += change;
        data.push({ name: date.toLocaleString('default', { month: 'short' }), portfolio: Math.max(0, Math.round(currentValue)) });
    }
    return data;
};

const CorePortfolioPage: React.FC = () => {
  const { riskProfile, portfolio, riskAnswers } = useAppContext();
  const navigate = useNavigate();
  const [explanation, setExplanation] = useState<string>('');
  const [stressTest, setStressTest] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchExplanations = useCallback(async () => {
    if (portfolio && riskProfile) {
      setIsLoading(true);
      try {
        const [portfolioExplanation, stressTestExplanation] = await Promise.all([
          explainPortfolio(portfolio, riskProfile.bucket),
          getStressTestExplanation()
        ]);
        setExplanation(portfolioExplanation);
        setStressTest(stressTestExplanation);
      } catch (error) {
        console.error("Error fetching explanations:", error);
        setExplanation("Could not load AI explanation at this time.");
        setStressTest("Could not load AI stress test at this time.");
      } finally {
        setIsLoading(false);
      }
    }
  }, [portfolio, riskProfile]);

  useEffect(() => {
    if (!riskProfile || !portfolio) {
      navigate('/');
    } else {
      fetchExplanations();
    }
  }, [riskProfile, portfolio, navigate, fetchExplanations]);

  const investmentAmount = riskAnswers?.investmentAmount || 10000;

  const performanceData = useMemo(() => {
    if (!portfolio) return [];
    return generatePerformanceData(investmentAmount, portfolio.expectedReturn, portfolio.volatility);
  }, [investmentAmount, portfolio]);

  if (!riskProfile || !portfolio) {
    return null; 
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold text-brand-primary">Your Core ETF Portfolio</h1>
        <p className="text-lg text-brand-secondary">A diversified foundation for a <span className="text-brand-gold font-semibold">{riskProfile.bucket}</span> investor.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
        <MetricCard title="Expected Return" value={`${portfolio.expectedReturn.toFixed(1)}%`} />
        <MetricCard title="Volatility" value={`${portfolio.volatility.toFixed(1)}%`} />
        <MetricCard title="Sharpe Ratio" value={portfolio.sharpeRatio.toFixed(2)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3 p-4 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <h2 className="text-xl font-semibold text-brand-primary mb-4">Core ETF Allocation</h2>
          <InteractiveAllocation weights={portfolio.weights} />
        </Card>
        <Card className="lg:col-span-2 p-4 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <h2 className="text-xl font-semibold text-brand-primary mb-4">Hypothetical Growth of ${investmentAmount.toLocaleString()}</h2>
          <PerformanceChart data={performanceData} dataKey="portfolio" dataName="Portfolio" />
        </Card>
      </div>

      <Card className="p-6 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
        <h2 className="text-xl font-semibold text-brand-blue mb-2">AI Explanation of Core ETF Strategy</h2>
        {isLoading ? <div className="animate-pulse h-24 bg-gray-100 rounded"></div> : <p className="text-brand-secondary">{explanation}</p>}
      </Card>
      
      <Card className="p-6 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
        <h2 className="text-xl font-semibold text-brand-gold mb-2">AI Stress Test: What if 2008 Repeats?</h2>
        {isLoading ? <div className="animate-pulse h-12 bg-gray-100 rounded"></div> : <p className="text-brand-secondary">{stressTest}</p>}
      </Card>

      <div className="pt-6 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-brand-primary mb-2">Detailed Holdings Breakdown</h2>
            <p className="max-w-xl mx-auto text-brand-secondary">
              Learn about each ETF and its specific role in your diversified portfolio.
            </p>
          </div>
          <PortfolioHoldingsDetail weights={portfolio.weights} />
        </div>
    </div>
  );
};

export default CorePortfolioPage;