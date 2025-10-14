export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  published: string;
  snippet: string;
}

export const MOCK_NEWS_ARTICLES: NewsArticle[] = [
  {
    id: '1',
    title: 'Federal Reserve Hints at Slower Pace of Interest Rate Hikes',
    source: 'Bloomberg',
    published: '45 minutes ago',
    snippet: 'Officials suggest that the central bank may scale back the size of its rate increases as it assesses the impact on the economy.'
  },
  {
    id: '2',
    title: 'Tech Stocks Rally on Positive Earnings Surprises',
    source: 'Reuters',
    published: '2 hours ago',
    snippet: 'Major technology companies reported better-than-expected quarterly earnings, boosting investor confidence in the sector.'
  },
  {
    id: '3',
    title: 'Oil Prices Fluctuate Amidst Geopolitical Tensions',
    source: 'Wall Street Journal',
    published: '5 hours ago',
    snippet: 'Crude oil prices saw a volatile trading session as markets weighed supply concerns against fears of a global economic slowdown.'
  },
  {
    id: '4',
    title: 'Consumer Spending Shows Resilience Despite Inflation',
    source: 'CNBC',
    published: '8 hours ago',
    snippet: 'The latest retail sales data indicates that consumers are continuing to spend, though a shift towards essential goods is noted.'
  },
  {
    id: '5',
    title: 'Global Supply Chain Pressures Begin to Ease',
    source: 'Financial Times',
    published: '1 day ago',
    snippet: 'Shipping costs and delivery times are declining from their peaks, signaling a potential normalization of global trade flows.'
  }
];
