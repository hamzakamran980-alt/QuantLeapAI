import React from 'react';
import Card from '../ui/Card';
import { IndividualPortfolio } from '../../types';

interface StockHoldingsDetailProps {
  portfolio: IndividualPortfolio;
}

const StockHoldingsDetail: React.FC<StockHoldingsDetailProps> = ({ portfolio }) => {
  return (
    <div className="space-y-6">
      {portfolio.holdings.map((holding) => (
        <Card key={holding.ticker} className="p-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-brand-border pb-4 mb-4">
            <div>
              <h3 className="text-xl font-bold text-brand-primary">{holding.company} ({holding.ticker})</h3>
            </div>
            <div className="text-left sm:text-right mt-2 sm:mt-0">
              <p className="text-sm text-brand-secondary">Portfolio Weight</p>
              <p className="text-2xl font-semibold text-brand-blue">{(holding.weight * 100).toFixed(1)}%</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <h4 className="font-semibold text-brand-gold mb-2">AI Rationale</h4>
              <p className="text-sm text-brand-secondary">{holding.rationale}</p>
            </div>
            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-brand-secondary">Shares:</span>
                    <span className="font-semibold text-brand-primary">{holding.shares}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-brand-secondary">Value:</span>
                    <span className="font-semibold text-brand-primary">${holding.value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StockHoldingsDetail;