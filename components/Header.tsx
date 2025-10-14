import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Header: React.FC = () => {
  const { riskProfile } = useAppContext();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? 'bg-brand-blue/10 text-brand-blue' : 'text-brand-secondary hover:bg-gray-100 hover:text-brand-primary'
    }`;

  return (
    <header className="bg-brand-surface/80 backdrop-blur-sm sticky top-0 z-50 border-b border-brand-border">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0">
               <h1 className="text-xl font-bold text-brand-primary">
                Quant<span className="text-brand-blue">Leap</span>
              </h1>
            </NavLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/" className={navLinkClass}>Dashboard</NavLink>
              <NavLink to="/onboarding" className={navLinkClass}>Risk Profile</NavLink>
              {riskProfile && (
                <>
                  <NavLink to="/portfolio/etf" className={navLinkClass}>ETF Portfolio</NavLink>
                  <NavLink to="/portfolio/stock" className={navLinkClass}>Stock Portfolio</NavLink>
                </>
              )}
              <NavLink to="/screener" className={navLinkClass}>Stock Screener</NavLink>
              <NavLink to="/industries" className={navLinkClass}>Industries</NavLink>
              <NavLink to="/assistant" className={navLinkClass}>AI Assistant</NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;