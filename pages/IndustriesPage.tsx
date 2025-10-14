import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import { INDUSTRY_SECTORS } from '../constants/industries';
import { RecommendationCategory } from '../types';
import { useAppContext } from '../context/AppContext';
import Button from '../components/ui/Button';

const recommendationColor: Record<RecommendationCategory, string> = {
  "Highly Recommended": "bg-green-100 text-green-800 border-green-200",
  "Recommended": "bg-sky-100 text-sky-800 border-sky-200",
  "Neutral": "bg-gray-100 text-gray-800 border-gray-200",
  "Consider Caution": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Not Recommended": "bg-red-100 text-red-800 border-red-200",
};


const IndustriesPage: React.FC = () => {
  const [openSector, setOpenSector] = useState<string | null>(INDUSTRY_SECTORS[0].sector);
  const { riskProfile } = useAppContext();

  const toggleSector = (sector: string) => {
    setOpenSector(openSector === sector ? null : sector);
  };
  
  if (!riskProfile) {
    return (
        <Card className="text-center p-8 max-w-2xl mx-auto animate-fade-in-up">
            <h2 className="text-2xl font-bold text-brand-gold mb-4">Unlock Personalized Industry Analysis</h2>
            <p className="text-brand-secondary mb-6">Complete your risk profile to see how the AI rates different industry sectors for your specific investment style.</p>
            <Link to="/onboarding">
                <Button>Take the Questionnaire</Button>
            </Link>
        </Card>
    );
  }


  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-brand-primary">Industry Sectors</h1>
        <p className="mt-2 text-lg text-brand-secondary">
          Explore AI-rated sectors of the economy, personalized for a <span className="font-bold text-brand-gold">{riskProfile.bucket}</span> investor.
        </p>
      </div>

      <div className="space-y-4">
        {INDUSTRY_SECTORS.map((sector, index) => (
          <Card key={sector.sector} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <button
              onClick={() => toggleSector(sector.sector)}
              className="w-full text-left p-4 flex justify-between items-center bg-brand-surface hover:bg-gray-50 transition-colors rounded-t-lg"
              aria-expanded={openSector === sector.sector}
            >
              <h2 className="text-xl font-semibold text-brand-blue">{sector.sector}</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 transform transition-transform text-brand-secondary ${openSector === sector.sector ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openSector === sector.sector && (
              <div className="p-6 bg-brand-bg">
                <ul className="space-y-6">
                  {sector.industries.map((industry) => {
                    const personalizedRec = industry.recommendations[riskProfile.bucket];
                    return (
                        <li key={industry.name} className="border-l-4 border-brand-border pl-4">
                          <div className="flex items-center space-x-3 mb-1">
                            <h3 className="font-semibold text-brand-primary">{industry.name}</h3>
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${recommendationColor[personalizedRec.recommendation]}`}>
                                {personalizedRec.recommendation}
                            </span>
                          </div>
                          <p className="text-brand-secondary text-sm mt-1">{industry.description}</p>
                          <p className="text-brand-secondary text-xs mt-2 italic border-l-2 border-brand-gold/50 pl-2">
                            <strong>AI Rationale:</strong> {personalizedRec.rationale}
                          </p>
                        </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default IndustriesPage;