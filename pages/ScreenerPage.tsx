import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getRankedStocks, getStockScreenerExplanation } from '../services/geminiService';
import { Stock, RecommendationCategory, RiskBucket } from '../types';
import Card from '../components/ui/Card';
import TeacherAssistant from '../components/TeacherAssistant';
import { useAppContext } from '../context/AppContext';
import Button from '../components/ui/Button';

const recommendationColor: Record<RecommendationCategory, string> = {
  "Highly Recommended": "bg-green-100 text-green-800 border-green-200",
  "Recommended": "bg-sky-100 text-sky-800 border-sky-200",
  "Neutral": "bg-gray-100 text-gray-800 border-gray-200",
  "Consider Caution": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Not Recommended": "bg-red-100 text-red-800 border-red-200",
};

const ScreenerPage: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [explanation, setExplanation] = useState('');
  const [sectorFilter, setSectorFilter] = useState('All');
  const navigate = useNavigate();
  const { riskProfile } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      if (!riskProfile) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const [rankedStocks, screenerExplanation] = await Promise.all([
            getRankedStocks(),
            getStockScreenerExplanation(riskProfile.bucket)
        ]);
        setStocks(rankedStocks);
        setExplanation(screenerExplanation);
      } catch (error) {
        console.error("Failed to fetch stock data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [riskProfile]);

  const sectors = useMemo(() => ['All', ...new Set(stocks.map(s => s.sector))], [stocks]);

  const filteredStocks = useMemo(() => {
    if (sectorFilter === 'All') return stocks;
    return stocks.filter(s => s.sector === sectorFilter);
  }, [stocks, sectorFilter]);

  const teacherTopics = [
    {
      title: 'What is a Stock Screener?',
      content: 'A stock screener is a tool that investors use to filter stocks based on specific criteria. Our AI ranks stocks on factors like financial health, growth potential, and valuation to help you discover ideas.'
    },
    {
      title: 'Understanding Recommendations',
      content: 'Our AI categories are for educational purposes. "Highly Recommended" suggests strong fundamentals, while "Not Recommended" may indicate significant risks. Always do your own research.'
    }
  ]

  if (!riskProfile) {
    return (
        <Card className="text-center p-8 animate-fade-in-up">
            <h2 className="text-2xl font-bold text-brand-gold mb-4">Unlock Your Personalized Screener</h2>
            <p className="text-brand-secondary mb-6">Complete your risk profile questionnaire to view AI-powered stock recommendations tailored just for you.</p>
            <Link to="/onboarding">
                <Button>Take the Questionnaire</Button>
            </Link>
        </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-fade-in">
      <div className="lg:col-span-3 space-y-6">
        <h1 className="text-3xl font-bold text-brand-primary">AI-Powered Stock Screener</h1>
        
        <Card className="p-6 animate-fade-in-up">
          <h2 className="text-xl font-semibold text-brand-blue mb-2">AI Teacher's Note for a <span className="text-brand-gold">{riskProfile.bucket}</span> Investor</h2>
          {isLoading ? <div className="animate-pulse h-12 bg-gray-100 rounded"></div> : <p className="text-brand-secondary">{explanation}</p>}
        </Card>

        <Card className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <div className="p-4 flex items-center space-x-4 border-b border-brand-border">
            <label htmlFor="sector-filter" className="text-brand-secondary">Filter by Sector:</label>
            <select 
              id="sector-filter"
              value={sectorFilter}
              onChange={(e) => setSectorFilter(e.target.value)}
              className="bg-brand-surface border border-brand-border rounded-md px-3 py-2 text-brand-primary focus:ring-brand-blue focus:border-brand-blue"
            >
              {sectors.map(sector => <option key={sector} value={sector}>{sector}</option>)}
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-brand-border">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-brand-secondary uppercase tracking-wider">Ticker</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-brand-secondary uppercase tracking-wider">Price</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-brand-secondary uppercase tracking-wider">Recommendation</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-brand-secondary uppercase tracking-wider hidden md:table-cell">Personalized Rationale</th>
                </tr>
              </thead>
              <tbody className="bg-brand-surface divide-y divide-brand-border">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      <td colSpan={4} className="px-6 py-4 whitespace-nowrap"><div className="animate-pulse h-6 bg-gray-100 rounded"></div></td>
                    </tr>
                  ))
                ) : (
                  filteredStocks.map((stock) => {
                    const personalizedRec = stock.recommendations[riskProfile.bucket];
                    return (
                        <tr key={stock.ticker} onClick={() => navigate(`/stock/${stock.ticker}`)} className="hover:bg-sky-50 transition-colors cursor-pointer">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-mono text-brand-blue">{stock.ticker}</div>
                            <div className="text-sm text-brand-secondary">{stock.company}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="mr-2 text-brand-primary">${stock.price.toFixed(2)}</span>
                              <span className={stock.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                                {stock.change >= 0 ? '▲' : '▼'} {Math.abs(stock.change).toFixed(1)}%
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${recommendationColor[personalizedRec.recommendation]}`}>
                              {personalizedRec.recommendation}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-brand-secondary hidden md:table-cell">{personalizedRec.rationale}</td>
                        </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
       <div className="lg:col-span-1 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
        <TeacherAssistant title="Screener Guide" topics={teacherTopics} />
      </div>
    </div>
  );
};

export default ScreenerPage;