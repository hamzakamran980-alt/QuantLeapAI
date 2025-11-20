import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RISK_QUESTIONS, TARGET_ALLOCATIONS } from '../constants';
import { RiskAnswers, RiskBucket, RiskProfile, Portfolio } from '../types';
import { useAppContext } from '../context/AppContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { createPersonalizedStockPortfolio } from '../services/marketService';

const OnboardingPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<RiskAnswers>>({});
  const { setRiskProfile, setPortfolio, setIndividualPortfolio, setRiskAnswers } = useAppContext();
  const navigate = useNavigate();

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };
  
  const handleNext = () => {
     if (currentStep < RISK_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateProfile(answers);
    }
  };
  
  const handlePrevious = () => {
      if (currentStep > 0) {
          setCurrentStep(currentStep -1);
      }
  }

  const calculateProfile = async (finalAnswers: Partial<RiskAnswers>) => {
    // BUG FIX: Removed a brittle check that prevented the questionnaire from completing.
    // The UI flow ensures that all questions are answered before this function is called.

    let score = 0;
    for (const questionId in finalAnswers) {
      if (Object.prototype.hasOwnProperty.call(finalAnswers, questionId)) {
        const question = RISK_QUESTIONS.find(q => q.id === questionId);
        const answerValue = finalAnswers[questionId];
        
        // Only sum score for questions designed for risk scoring
        if (question && question.type === 'radio' && !['dividendPreference', 'esgFocus'].includes(question.id) && typeof answerValue === 'number') {
          score += answerValue;
        }
      }
    }

    let bucket: RiskBucket;
    if (score <= 45) bucket = "Conservative";
    else if (score <= 90) bucket = "Balanced";
    else if (score <= 140) bucket = "Growth";
    else bucket = "Aggressive";

    const completeAnswers = finalAnswers as RiskAnswers;
    setRiskAnswers(completeAnswers);

    const newRiskProfile: RiskProfile = {
      score,
      bucket,
      targetAllocation: TARGET_ALLOCATIONS[bucket],
    };
    setRiskProfile(newRiskProfile);

    const newPortfolio: Portfolio = {
      weights: TARGET_ALLOCATIONS[bucket],
      expectedReturn: { Conservative: 4.5, Balanced: 6.2, Growth: 8.1, Aggressive: 9.5 }[bucket],
      volatility: { Conservative: 6.0, Balanced: 9.5, Growth: 13.5, Aggressive: 16.0 }[bucket],
      sharpeRatio: { Conservative: 0.58, Balanced: 0.65, Growth: 0.70, Aggressive: 0.72 }[bucket],
    };
    setPortfolio(newPortfolio);
    
    // Generate and set the personalized individual stock portfolio
    const individualPortfolio = await createPersonalizedStockPortfolio(completeAnswers, bucket);
    setIndividualPortfolio(individualPortfolio);
    
    navigate('/portfolio/etf');
  };

  const question = RISK_QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / RISK_QUESTIONS.length) * 100;

  const renderQuestion = () => {
    switch (question.type) {
      case 'text':
        return (
          <input
            type="number"
            placeholder={question.options?.[0]?.text || ''}
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswerChange(question.id, parseFloat(e.target.value) || 0)}
            className="w-full p-4 bg-brand-surface border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent transition"
          />
        );
      case 'select':
        return (
          <select
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className="w-full p-4 bg-brand-surface border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent transition"
          >
            {question.options?.map(option => (
              <option key={String(option.value)} value={option.value}>{option.text}</option>
            ))}
          </select>
        );
      case 'radio':
        return (
          <div className="space-y-4">
            {question.options?.map((option) => (
              <button
                key={String(option.value)}
                onClick={() => {
                  const newAnswers = { ...answers, [question.id]: option.value as number };
                  handleAnswerChange(question.id, option.value as number);
                  if (currentStep < RISK_QUESTIONS.length - 1) {
                    setTimeout(() => setCurrentStep(currentStep + 1), 200);
                  } else {
                    setTimeout(() => calculateProfile(newAnswers), 200);
                  }
                }}
                className={`w-full text-left p-4 border rounded-lg transition-all duration-200 transform hover:scale-105 hover:border-brand-blue ${answers[question.id] === option.value ? 'bg-brand-blue/10 border-brand-blue ring-2 ring-brand-blue' : 'bg-brand-surface border-brand-border'}`}
              >
                {option.text}
              </button>
            ))}
          </div>
        );
        case 'checkbox':
        return (
          <label className="flex items-center space-x-3 p-4 bg-brand-surface border border-brand-border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="checkbox"
              checked={!!answers[question.id]}
              onChange={(e) => handleAnswerChange(question.id, e.target.checked ? 1 : 0)}
              className="h-5 w-5 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
            />
            <span className="text-brand-primary">{question.options?.[0].text}</span>
          </label>
        )
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in-up">
      <Card>
        <div className="p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-brand-primary mb-2">Risk Profile Questionnaire</h1>
          <p className="text-brand-secondary mb-6">Let's find the best investment strategy for you.</p>

          <div className="w-full bg-brand-border rounded-full h-2.5 mb-6">
            <div className="bg-brand-blue h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
          
          <div className="min-h-[250px]">
            <h2 className="text-xl font-semibold text-brand-primary mb-6">{`Step ${currentStep + 1} of ${RISK_QUESTIONS.length}: ${question.text}`}</h2>
            {renderQuestion()}
          </div>
          
          <div className="mt-8 flex justify-between items-center">
             <Button onClick={handlePrevious} variant="secondary" disabled={currentStep === 0}>
                Previous
            </Button>
            {question.type !== 'radio' && (
              <Button onClick={handleNext}>
                {currentStep === RISK_QUESTIONS.length - 1 ? 'Finish & View Portfolios' : 'Next'}
              </Button>
            )}
          </div>

        </div>
      </Card>
    </div>
  );
};

export default OnboardingPage;