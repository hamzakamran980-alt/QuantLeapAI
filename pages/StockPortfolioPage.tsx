import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { explainStockPortfolio } from '../services/marketService';
import PerformanceChart from '../components/charts/PerformanceChart';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import InteractiveStockAllocation from '../components/portfolio/InteractiveStockAllocation';
import StockHoldingsDetail from '../components/portfolio/StockHoldingsDetail';

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

const StockPortfolioPage: React.FC = () => {
  const { riskProfile, individualPortfolio, riskAnswers } = useAppContext();
  const navigate = useNavigate();
  const [explanation, setExplanation] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchExplanations = useCallback(async () => {
    if (individualPortfolio && riskProfile) {
      setIsLoading(true);
      try {
        const stockExplanation = await explainStockPortfolio(individualPortfolio, riskProfile.bucket);
        setExplanation(stockExplanation);
      } catch (error) {
        console.error("Error fetching explanations:", error);
        setExplanation("Could not load AI explanation at this time.");
      } finally {
        setIsLoading(false);
      }
    }
  }, [individualPortfolio, riskProfile]);

  useEffect(() => {
    if (!riskProfile || !individualPortfolio) {
      navigate('/');
    } else {
      fetchExplanations();
    }
  }, [riskProfile, individualPortfolio, navigate, fetchExplanations]);

  const investmentAmount = riskAnswers?.investmentAmount || 0;

  const performanceData = useMemo(() => {
    if (!individualPortfolio) return [];
    return generatePerformanceData(investmentAmount, individualPortfolio.expectedReturn, individualPortfolio.volatility);
  }, [investmentAmount, individualPortfolio]);

  if (!riskProfile || !individualPortfolio) {
    return null; 
  }
  
  if (individualPortfolio.holdings.length === 0) {
      return (
        <div className="animate-fade-in">
          <Card className="p-8 text-center max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-brand-primary">Personalized Stock Portfolio</h1>
             <p className="text-brand-secondary mt-4 mb-6">
                Unfortunately, based on your specific criteria in the questionnaire, the AI could not construct a personalized portfolio of individual stocks.
            </p>
            <p className="text-brand-secondary mb-8">
                This can sometimes happen with very specific or restrictive choices (e.g., combining a niche sector with high ESG requirements). Please try adjusting your answers to see a suggested portfolio.
            </p>
            <Link to="/onboarding">
                <Button>Retake Questionnaire</Button>
            </Link>
          </Card>
        </div>
      );
  }

  return (
    <div className="space-y-6 animate-fade-in">
       <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold text-brand-primary">Your Personalized Stock Portfolio</h1>
        <p className="text-lg text-brand-secondary">A satellite portfolio for a <span className="text-brand-gold font-semibold">{riskProfile.bucket}</span> investor.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
        <MetricCard title="Expected Return" value={`${individualPortfolio.expectedReturn.toFixed(1)}%`} />
        <MetricCard title="Volatility" value={`${individualPortfolio.volatility.toFixed(1)}%`} />
        <MetricCard title="Sharpe Ratio" value={individualPortfolio.sharpeRatio.toFixed(2)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3 p-4 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <h2 className="text-xl font-semibold text-brand-primary mb-4">Personalized Stock Allocation</h2>
          <InteractiveStockAllocation portfolio={individualPortfolio} />
        </Card>
        <Card className="lg:col-span-2 p-4 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <h2 className="text-xl font-semibold text-brand-primary mb-4">Hypothetical Growth of ${investmentAmount.toLocaleString()}</h2>
          <PerformanceChart data={performanceData} dataKey="portfolio" dataName="Portfolio" />
        </Card>
      </div>

      <Card className="p-6 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
        <h2 className="text-xl font-semibold text-brand-blue mb-2">AI Explanation of Satellite Stock Strategy</h2>
        {isLoading ? <div className="animate-pulse h-24 bg-gray-100 rounded"></div> : <p className="text-brand-secondary">{explanation}</p>}
      </Card>
      
       <div className="pt-6 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-brand-primary mb-2">Detailed Holdings Breakdown</h2>
            <p className="max-w-xl mx-auto text-brand-secondary">
              Explore each stock selected by the AI and the rationale for its inclusion in your personalized portfolio.
            </p>
          </div>
          <StockHoldingsDetail portfolio={individualPortfolio} />
        </div>
    </div>
  );
};

export default StockPortfolioPage;