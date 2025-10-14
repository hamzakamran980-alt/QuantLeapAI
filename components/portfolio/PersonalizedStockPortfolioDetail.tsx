import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import { IndividualPortfolio } from '../../types';

interface PersonalizedStockPortfolioDetailProps {
  portfolio: IndividualPortfolio;
}

const PersonalizedStockPortfolioDetail: React.FC<PersonalizedStockPortfolioDetailProps> = ({ portfolio }) => {
    const navigate = useNavigate();

    return (
        <Card>
            <div className="p-4 border-b border-brand-border">
                 <h3 className="text-lg font-semibold text-brand-primary">Total Value: ${portfolio.totalValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-brand-border">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-brand-secondary uppercase tracking-wider">Asset</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-brand-secondary uppercase tracking-wider hidden sm:table-cell">Shares</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-brand-secondary uppercase tracking-wider">Value</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-brand-secondary uppercase tracking-wider">% Weight</th>
                        </tr>
                    </thead>
                    <tbody className="bg-brand-surface divide-y divide-brand-border">
                        {portfolio.holdings.map(holding => (
                            <tr key={holding.ticker} onClick={() => navigate(`/stock/${holding.ticker}`)} className="hover:bg-sky-50 transition-colors cursor-pointer">
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <div className="font-mono text-brand-blue">{holding.ticker}</div>
                                    <div className="text-sm text-brand-secondary truncate max-w-[120px]">{holding.company}</div>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-brand-primary hidden sm:table-cell">{holding.shares}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-brand-primary">${holding.value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <div className="text-sm text-brand-primary">{(holding.weight * 100).toFixed(1)}%</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
             <div className="p-4 bg-gray-50/50 border-t border-brand-border">
                <h4 className="font-semibold text-brand-blue mb-2 text-sm">AI Rationale Overview</h4>
                <p className="text-xs text-brand-secondary">
                    This selection of individual stocks has been tailored based on your profile. It is designed to complement your core ETF holdings by providing focused exposure to companies that align with your growth expectations, sector interests, and risk tolerance. Each stock was chosen for specific reasons, which you can explore by clicking on them.
                </p>
            </div>
        </Card>
    );
};

export default PersonalizedStockPortfolioDetail;
