import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getStockDetails } from '../services/geminiService';
import { StockDetail, RecommendationCategory } from '../types';
import Card from '../components/ui/Card';
import PerformanceChart from '../components/charts/PerformanceChart';
import ForecastChart from '../components/charts/ForecastChart';
import TeacherAssistant from '../components/TeacherAssistant';
import Button from '../components/ui/Button';
import { useAppContext } from '../context/AppContext';

const recommendationColor: Record<RecommendationCategory, string> = {
  "Highly Recommended": "bg-green-100 text-green-800 border-green-200",
  "Recommended": "bg-sky-100 text-sky-800 border-sky-200",
  "Neutral": "bg-gray-100 text-gray-800 border-gray-200",
  "Consider Caution": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Not Recommended": "bg-red-100 text-red-800 border-red-200",
};


const Stat: React.FC<{ label: string, value: string | number | undefined }> = ({ label, value }) => (
    <div className="flex justify-between py-2 border-b border-brand-border">
        <span className="text-brand-secondary">{label}</span>
        <span className="font-semibold text-brand-primary">{value ?? 'N/A'}</span>
    </div>
);

const StockDetailPage: React.FC = () => {
    const { ticker } = useParams<{ ticker: string }>();
    const navigate = useNavigate();
    const { riskProfile } = useAppContext();
    const [stock, setStock] = useState<StockDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'overview' | 'forecast'>('overview');

    useEffect(() => {
        if (!ticker) {
            navigate('/screener');
            return;
        }
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const data = await getStockDetails(ticker);
                setStock(data);
            } catch (error) {
                console.error("Failed to fetch stock details", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [ticker, navigate]);

    if (isLoading) {
        return <div className="text-center text-lg">Loading stock details...</div>;
    }

    if (!stock) {
        return <div className="text-center text-lg text-red-500">Could not find details for ticker: {ticker}</div>;
    }
    
    if (!riskProfile) {
        return (
            <Card className="text-center p-8 animate-fade-in-up">
                <h2 className="text-2xl font-bold text-brand-gold mb-4">View Personalized Analysis for {ticker}</h2>
                <p className="text-brand-secondary mb-6">Complete your risk profile to see how this stock aligns with your investment strategy.</p>
                <Link to="/onboarding">
                    <Button>Take the Questionnaire</Button>
                </Link>
            </Card>
        );
    }
    
    const personalizedRec = stock.recommendations[riskProfile.bucket];

    const teacherTopics = [
        { title: 'What is Market Cap?', content: 'Market Capitalization is the total value of a company\'s shares of stock. It is calculated by multiplying the price of a stock by its total number of outstanding shares.' },
        { title: 'What is P/E Ratio?', content: 'The Price-to-Earnings ratio compares a company\'s stock price to its earnings per share. A high P/E could mean the stock is overvalued, or that investors expect high growth.' },
        { title: 'What is Beta?', content: 'Beta measures a stock\'s volatility relative to the overall market. A beta greater than 1 indicates the stock is more volatile than the market, while less than 1 means it is less volatile.' },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-fade-in">
            <div className="lg:col-span-3 space-y-6">
                <Card className="p-6 animate-fade-in-up">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-brand-primary">{stock.company} ({stock.ticker})</h1>
                            <p className="text-brand-secondary mb-2">{stock.sector}</p>
                             <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${recommendationColor[personalizedRec.recommendation]}`}>
                                {personalizedRec.recommendation} for your profile
                            </span>
                        </div>
                        <div className="text-left sm:text-right mt-4 sm:mt-0">
                            <p className={`text-3xl font-bold ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                ${stock.price.toFixed(2)}
                            </p>
                            <p className={`text-lg ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {stock.change >= 0 ? '▲' : '▼'} {Math.abs(stock.change).toFixed(2)}%
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-4 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                    <h2 className="text-xl font-semibold text-brand-primary mb-4 px-2">Historical Performance (1Y)</h2>
                    <PerformanceChart data={stock.historicalData} dataKey="price" dataName="Price" />
                </Card>

                <Card className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                    <div className="border-b border-brand-border">
                        <nav className="flex space-x-1 p-2">
                            <button onClick={() => setActiveTab('overview')} className={`px-3 py-2 font-medium text-sm rounded-md ${activeTab === 'overview' ? 'bg-brand-blue text-white' : 'text-brand-secondary hover:bg-gray-100'}`}>Overview</button>
                            <button onClick={() => setActiveTab('forecast')} className={`px-3 py-2 font-medium text-sm rounded-md ${activeTab === 'forecast' ? 'bg-brand-blue text-white' : 'text-brand-secondary hover:bg-gray-100'}`}>AI Forecast</button>
                        </nav>
                    </div>
                    <div className="p-6">
                        {activeTab === 'overview' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
                                <div>
                                    <h3 className="text-lg font-semibold text-brand-blue mb-2">Company Profile</h3>
                                    <p className="text-brand-secondary mb-6">{stock.profile}</p>

                                    <h3 className="text-lg font-semibold text-brand-blue mb-2">AI Rationale for a <span className="text-brand-gold">{riskProfile.bucket}</span> Investor</h3>
                                    <p className="text-brand-secondary">{personalizedRec.rationale}</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-brand-blue mb-4">Key Statistics</h3>
                                    <div className="space-y-2">
                                        <Stat label="Market Cap" value={stock.marketCap} />
                                        <Stat label="P/E Ratio" value={stock.peRatio} />
                                        <Stat label="Earnings Per Share (EPS)" value={stock.eps} />
                                        <Stat label="Beta" value={stock.beta} />
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'forecast' && (
                            <div className="animate-fade-in">
                                <h2 className="text-xl font-semibold text-brand-primary mb-4">AI Price Forecast (1Y)</h2>
                                <ForecastChart data={stock.forecastData} />
                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold text-brand-blue mb-2">AI Forecast Rationale</h3>
                                    <p className="text-brand-secondary text-sm">{stock.forecastRationale}</p>
                                    <p className="text-yellow-600 text-xs mt-4 bg-yellow-100 p-2 rounded-md"><strong>Disclaimer:</strong> This is a simulated forecast for educational purposes and is not investment advice. It is based on historical data and simulated assumptions, and does not guarantee future results.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </Card>

            </div>
            <div className="lg:col-span-1 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                 <TeacherAssistant title="Learning Center" topics={teacherTopics} />
            </div>
        </div>
    );
};

export default StockDetailPage;