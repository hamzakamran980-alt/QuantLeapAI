import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import NewsFeed from '../components/NewsFeed';

const DashboardPage: React.FC = () => {
  const { riskProfile } = useAppContext();

  const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-brand-primary sm:text-5xl">
          Welcome to Quant<span className="text-brand-blue">Leap</span> AI
        </h1>
        <p className="mt-4 text-lg text-brand-secondary">
          Your AI-powered guide to intelligent investing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <Card className="p-6 lg:col-span-2 animate-fade-in-up">
          <h2 className="text-2xl font-semibold text-brand-gold mb-4">Your Journey to Smarter Investing</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <span className={`flex h-12 w-12 items-center justify-center rounded-full ${riskProfile ? 'bg-green-500' : 'bg-brand-blue'} text-white text-xl font-bold`}>
                  {riskProfile ? <CheckCircleIcon className="h-8 w-8" /> : '1'}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-brand-primary">Discover Your Risk Profile</h3>
                <p className="mt-1 text-brand-secondary">
                  Answer a few simple questions to understand your investment style and tolerance for risk.
                </p>
                {!riskProfile ? (
                  <Link to="/onboarding">
                    <Button className="mt-3">Start Now</Button>
                  </Link>
                ) : (
                  <p className="mt-3 text-green-600 font-semibold">Completed! Your risk profile is: {riskProfile.bucket}</p>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <span className={`flex h-12 w-12 items-center justify-center rounded-full ${riskProfile ? 'bg-brand-blue' : 'bg-gray-300'} text-white text-xl font-bold`}>
                  2
                </span>
              </div>
              <div>
                <h3 className={`text-lg font-medium ${!riskProfile && 'text-gray-400'}`}>Build Your AI-Powered Portfolio</h3>
                <p className={`mt-1 ${riskProfile ? 'text-brand-secondary' : 'text-gray-500'}`}>
                  Based on your profile, we'll suggest a diversified ETF portfolio and a personalized stock portfolio.
                </p>
                {riskProfile && (
                  <Link to="/portfolio/etf">
                    <Button className="mt-3">View Portfolio</Button>
                  </Link>
                )}
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue text-white text-xl font-bold">
                  3
                </span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-brand-primary">Explore & Learn</h3>
                <p className="mt-1 text-brand-secondary">
                  Use our Stock Screener and AI Assistant to deepen your market knowledge.
                </p>
                <div className="flex space-x-4">
                  <Link to="/screener">
                    <Button className="mt-3" variant="secondary">Go to Screener</Button>
                  </Link>
                  <Link to="/assistant">
                    <Button className="mt-3" variant="secondary">Ask Assistant</Button>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </Card>

        <div className="lg:col-span-1 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <NewsFeed />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;