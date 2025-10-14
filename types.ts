// FIX: Removed self-import of `RiskBucket` which was causing a name conflict.
export type RiskBucket = "Conservative" | "Balanced" | "Growth" | "Aggressive";

export interface RiskQuestion {
  id: string;
  text: string;
  type: 'radio' | 'text' | 'select' | 'checkbox';
  options?: { text: string; value: number | string }[];
}

export interface RiskAnswers {
  // FIX: Removed `boolean` from the index signature to resolve type errors in input elements.
  [key:string]: number | string;
  investmentAmount: number;
  sectorPreference: string;
  dividendPreference: number;
  // FIX: Changed `esgFocus` type from `boolean` to `number` to match question data.
  esgFocus: number;
}

export interface RiskProfile {
  score: number;
  bucket: RiskBucket;
  targetAllocation: Record<string, number>;
}

export interface Portfolio {
  weights: Record<string, number>;
  expectedReturn: number;
  volatility: number;
  sharpeRatio: number;
}

export type RecommendationCategory = "Highly Recommended" | "Recommended" | "Neutral" | "Consider Caution" | "Not Recommended";

export type PersonalizedRecommendation = {
    recommendation: RecommendationCategory;
    rationale: string;
}

export interface Stock {
    ticker: string;
    company: string;
    sector: string;
    price: number;
    change: number;
    recommendations: Record<RiskBucket, PersonalizedRecommendation>;
}

export interface StockDetail extends Stock {
    profile: string;
    marketCap: string;
    peRatio: number | string;
    eps: number;
    beta: number;
    dividendYield?: number;
    esgRating?: 'Leader' | 'Average' | 'Laggard';
    news: { title: string; source: string; date: string }[];
    historicalData: { name: string; price: number }[];
    forecastData: { name: string; price: number; forecast: number | null }[];
    forecastRationale: string;
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

export interface PerformanceData {
    name: string;
    value: number;
}

export interface AssetDescription {
  ticker: string;
  name: string;
  description: string;
  category: 'US Equities' | 'International Equities' | 'Bonds' | 'Alternatives' | 'Cash & Equivalents';
  rationale: string;
}

export interface StockSuggestion {
  ticker: string;
  company: string;
  rationale: string;
}

export interface IndividualStockHolding {
    ticker: string;
    company: string;
    rationale: string;
    shares: number;
    value: number;
    weight: number;
}

export interface IndividualPortfolio {
    holdings: IndividualStockHolding[];
    totalValue: number;
    expectedReturn: number;
    volatility: number;
    sharpeRatio: number;
}

export interface Industry {
  name: string;
  description: string;
  recommendations: Record<RiskBucket, PersonalizedRecommendation>;
}

export interface IndustrySector {
  sector: string;
  industries: Industry[];
}