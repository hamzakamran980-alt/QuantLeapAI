import React from 'react';
import Card from './ui/Card';
import { MOCK_NEWS_ARTICLES } from '../constants/news';

const NewsFeed: React.FC = () => {
  return (
    <Card className="h-full">
      <div className="p-4 border-b border-brand-border">
        <h2 className="text-lg font-bold text-brand-gold flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3h3m-3 4h3m-3 4h3m-3 4h3" />
          </svg>
          Market News
        </h2>
      </div>
      <div className="p-4 space-y-4">
        {MOCK_NEWS_ARTICLES.map((article, index) => (
          <div key={article.id} className={`pt-4 ${index > 0 ? 'border-t border-brand-border' : ''}`}>
            <h3 className="font-semibold text-brand-primary hover:text-brand-blue cursor-pointer">{article.title}</h3>
            <p className="text-sm text-brand-secondary mt-1">{article.snippet}</p>
            <div className="text-xs text-gray-400 mt-2">
              <span>{article.source}</span> &middot; <span>{article.published}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default NewsFeed;