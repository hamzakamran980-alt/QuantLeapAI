import React from 'react';
import Card from '../ui/Card';
import { MOCK_ASSET_DESCRIPTIONS } from '../../constants';
import { AssetDescription } from '../../types';

interface PortfolioHoldingsDetailProps {
  weights: Record<string, number>;
}

const CategoryBadge: React.FC<{ category: AssetDescription['category'] }> = ({ category }) => {
    const categoryColors: Record<AssetDescription['category'], string> = {
        'US Equities': 'bg-blue-100 text-blue-800',
        'International Equities': 'bg-green-100 text-green-800',
        'Bonds': 'bg-yellow-100 text-yellow-800',
        'Alternatives': 'bg-purple-100 text-purple-800',
        'Cash & Equivalents': 'bg-gray-100 text-gray-800',
    };
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${categoryColors[category]}`}>{category}</span>;
}


const PortfolioHoldingsDetail: React.FC<PortfolioHoldingsDetailProps> = ({ weights }) => {
  const holdings = Object.entries(weights)
    // FIX: Added a type guard to ensure `weight` is a number before comparison and use.
    // This resolves issues where `Object.entries` might infer the value as `unknown`.
    .filter(([, weight]) => typeof weight === 'number' && weight > 0)
    .map(([ticker, weight]) => ({
      ...MOCK_ASSET_DESCRIPTIONS[ticker],
      weight,
    }));

  return (
    <div className="space-y-6">
      {holdings.map((holding) => (
        <Card key={holding.ticker} className="p-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-brand-border pb-4 mb-4">
            <div>
              <h3 className="text-xl font-bold text-brand-primary">{holding.name} ({holding.ticker})</h3>
              <div className="mt-2"><CategoryBadge category={holding.category} /></div>
            </div>
            <div className="text-left sm:text-right mt-2 sm:mt-0">
              <p className="text-sm text-brand-secondary">Portfolio Weight</p>
              <p className="text-2xl font-semibold text-brand-blue">{(holding.weight * 100).toFixed(1)}%</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-brand-gold mb-2">What it is</h4>
              <p className="text-sm text-brand-secondary">{holding.description}</p>
            </div>
            <div>
              <h4 className="font-semibold text-brand-gold mb-2">Why it's in your portfolio</h4>
              <p className="text-sm text-brand-secondary">{holding.rationale}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default PortfolioHoldingsDetail;
