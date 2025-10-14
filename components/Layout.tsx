import React, { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
      <footer className="text-center p-4 text-xs text-brand-secondary border-t border-brand-border">
        <p>&copy; 2024 QuantLeap AI. For educational purposes only. Not investment advice.</p>
      </footer>
    </div>
  );
};

export default Layout;