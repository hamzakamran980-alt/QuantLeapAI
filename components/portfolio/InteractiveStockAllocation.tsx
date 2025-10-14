import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AllocationChart from '../charts/AllocationChart';
import { IndividualPortfolio, IndividualStockHolding } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';

const StockDetailModal: React.FC<{ stock: IndividualStockHolding; onClose: () => void; }> = ({ stock, onClose }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/stock/${stock.ticker}`);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="stock-modal-title"
    >
      <Card 
        className="max-w-lg w-full animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
                <h2 id="stock-modal-title" className="text-2xl font-bold text-brand-gold">{stock.company} ({stock.ticker})</h2>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-black text-3xl leading-none font-bold" aria-label="Close modal">&times;</button>
          </div>
          
          <div className="space-y-4 text-brand-secondary">
            <div>
              <h4 className="font-semibold text-brand-blue mb-1">AI Rationale</h4>
              <p className="text-sm">{stock.rationale}</p>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 mt-4 border-t border-brand-border">
                <div className="text-center">
                    <p className="text-xs">Shares</p>
                    <p className="font-semibold text-brand-primary">{stock.shares}</p>
                </div>
                <div className="text-center">
                    <p className="text-xs">Value</p>
                    <p className="font-semibold text-brand-primary">${stock.value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                </div>
                <div className="text-center">
                    <p className="text-xs">Weight</p>
                    <p className="font-semibold text-brand-primary">{(stock.weight * 100).toFixed(1)}%</p>
                </div>
            </div>
          </div>
          <div className="mt-6 flex justify-between items-center">
            <Button onClick={handleViewDetails} variant="secondary">View Full Details</Button>
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

interface InteractiveStockAllocationProps {
  portfolio: IndividualPortfolio;
}

const InteractiveStockAllocation: React.FC<InteractiveStockAllocationProps> = ({ portfolio }) => {
  const [selectedStock, setSelectedStock] = useState<IndividualStockHolding | null>(null);

  const allocationData = useMemo(() =>
    portfolio.holdings.map(h => ({ name: h.ticker, value: h.weight })),
    [portfolio]
  );
  
  const handlePieClick = (data: any) => {
    const stockDetails = portfolio.holdings.find(h => h.ticker === data.name);
    if (stockDetails) {
        setSelectedStock(stockDetails);
    }
  };
  
  const handleItemClick = (ticker: string) => {
      const stockDetails = portfolio.holdings.find(h => h.ticker === ticker);
      if (stockDetails) {
          setSelectedStock(stockDetails);
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
              {portfolio.holdings.map(item => (
                  <div 
                      key={item.ticker} 
                      className="p-3 rounded-lg border-l-4 border-transparent cursor-pointer transition-all bg-brand-bg hover:bg-sky-50 hover:border-brand-blue"
                      onClick={() => handleItemClick(item.ticker)}
                      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleItemClick(item.ticker)}
                      role="button"
                      tabIndex={0}
                      aria-label={`View details for ${item.company}`}
                  >
                      <div className="flex justify-between items-center">
                          <div>
                            <span className="font-semibold text-brand-primary">{item.ticker}</span>
                            <p className="text-xs text-brand-secondary truncate max-w-[120px]">{item.company}</p>
                          </div>
                          <span className="font-mono text-brand-secondary">{(item.weight * 100).toFixed(1)}%</span>
                      </div>
                  </div>
              ))}
          </div>
        </div>
      </div>

      {selectedStock && <StockDetailModal stock={selectedStock} onClose={() => setSelectedStock(null)} />}
    </>
  );
};

export default InteractiveStockAllocation;