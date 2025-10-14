import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import { StockSuggestion } from '../../types';

interface StockSuggestionsProps {
  suggestions: StockSuggestion[];
}

const StockSuggestions: React.FC<StockSuggestionsProps> = ({ suggestions }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {suggestions.map((stock) => (
        <Card
          key={stock.ticker}
          className="p-6 flex flex-col justify-between hover:border-brand-blue transition-all cursor-pointer transform hover:-translate-y-1"
          onClick={() => navigate(`/stock/${stock.ticker}`)}
          role="link"
          aria-label={`View details for ${stock.company}`}
        >
          <div>
            <div className="flex justify-between items-baseline">
                <h3 className="text-xl font-bold text-brand-primary">{stock.company}</h3>
                <span className="font-mono text-brand-blue">{stock.ticker}</span>
            </div>
            <p className="text-sm text-brand-secondary mt-4">
              <strong className="text-brand-gold">AI Rationale:</strong> {stock.rationale}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StockSuggestions;