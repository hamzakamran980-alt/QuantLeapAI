import React, { createContext, useContext, useState, ReactNode } from 'react';
import { RiskProfile, Portfolio, IndividualPortfolio, RiskAnswers } from '../types';

interface AppContextType {
  riskProfile: RiskProfile | null;
  setRiskProfile: (profile: RiskProfile | null) => void;
  portfolio: Portfolio | null;
  setPortfolio: (portfolio: Portfolio | null) => void;
  individualPortfolio: IndividualPortfolio | null;
  setIndividualPortfolio: (portfolio: IndividualPortfolio | null) => void;
  riskAnswers: RiskAnswers | null;
  setRiskAnswers: (answers: RiskAnswers | null) => void;
  disclaimerAccepted: boolean;
  acceptDisclaimer: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [riskProfile, setRiskProfile] = useState<RiskProfile | null>(null);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [individualPortfolio, setIndividualPortfolio] = useState<IndividualPortfolio | null>(null);
  const [riskAnswers, setRiskAnswers] = useState<RiskAnswers | null>(null);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);

  const acceptDisclaimer = () => {
    setDisclaimerAccepted(true);
  };
  
  return (
    <AppContext.Provider value={{ 
        riskProfile, setRiskProfile, 
        portfolio, setPortfolio, 
        individualPortfolio, setIndividualPortfolio,
        riskAnswers, setRiskAnswers,
        disclaimerAccepted, acceptDisclaimer 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
