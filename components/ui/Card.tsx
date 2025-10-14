import React, { ReactNode } from 'react';

// FIX: Extended CardProps to include all standard HTML div attributes, such as `onClick`.
// This allows event handlers and other attributes to be passed down to the underlying div element.
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div className={`bg-brand-surface border border-brand-border rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;