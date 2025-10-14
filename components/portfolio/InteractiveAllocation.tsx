import React, { useState, useMemo } from 'react';
import AllocationChart from '../charts/AllocationChart';
import { PerformanceData, AssetDescription } from '../../types';
import { MOCK_ASSET_DESCRIPTIONS } from '../../constants';
import Card from '../ui/Card';
import Button from '../ui/Button';

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

const AssetDetailModal: React.FC<{ asset: AssetDescription; onClose: () => void; }> = ({ asset, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="asset-modal-title"
    >
      <Card 
        className="max-w-lg w-full animate-fade-in-up"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
                <h2 id="asset-modal-title" className="text-2xl font-bold text-brand-gold">{asset.name} ({asset.ticker})</h2>
                <div className="mt-2"><CategoryBadge category={asset.category} /></div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-black text-3xl leading-none font-bold" aria-label="Close modal">&times;</button>
          </div>
          
          <div className="space-y-4 text-brand-secondary">
            <div>
              <h4 className="font-semibold text-brand-blue mb-1">What it is</h4>
              <p className="text-sm">{asset.description}</p>
            </div>
            <div>
              <h4 className="font-semibold text-brand-blue mb-1">Why it's in your portfolio</h4>
              <p className="text-sm">{asset.rationale}</p>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button onClick={onClose} variant="secondary">Close</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};


interface InteractiveAllocationProps {
  weights: Record<string, number>;
}

const InteractiveAllocation: React.FC<InteractiveAllocationProps> = ({ weights }) => {
  const [selectedAsset, setSelectedAsset] = useState<AssetDescription | null>(null);

  const allocationData: PerformanceData[] = useMemo(() =>
    Object.entries(weights).map(([name, value]) => ({ name, value })),
    [weights]
  );
  
  const handlePieClick = (data: any) => {
    const assetDetails = MOCK_ASSET_DESCRIPTIONS[data.name];
    if (assetDetails) {
        setSelectedAsset(assetDetails);
    }
  };
  
  const handleItemClick = (ticker: string) => {
      const assetDetails = MOCK_ASSET_DESCRIPTIONS[ticker];
      if (assetDetails) {
          setSelectedAsset(assetDetails);
      }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div>
          <AllocationChart data={allocationData} onPieClick={handlePieClick} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-brand-primary mb-3 border-b border-brand-border pb-2">Holdings</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
              {allocationData.map(item => (
                  <div 
                      key={item.name} 
                      className="p-3 rounded-lg border-l-4 border-transparent cursor-pointer transition-all bg-brand-bg hover:bg-sky-50 hover:border-brand-blue"
                      onClick={() => handleItemClick(item.name)}
                      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleItemClick(item.name)}
                      role="button"
                      tabIndex={0}
                      aria-label={`View details for ${item.name}`}
                  >
                      <div className="flex justify-between items-center">
                          <span className="font-semibold text-brand-primary">{item.name}</span>
                          <span className="font-mono text-brand-secondary">{(item.value * 100).toFixed(1)}%</span>
                      </div>
                  </div>
              ))}
          </div>
        </div>
      </div>

      {selectedAsset && <AssetDetailModal asset={selectedAsset} onClose={() => setSelectedAsset(null)} />}
    </>
  );
};

export default InteractiveAllocation;