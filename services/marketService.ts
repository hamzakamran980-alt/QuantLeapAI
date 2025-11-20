import { Portfolio, RiskBucket, Stock, StockDetail, RiskAnswers, IndividualPortfolio, IndividualStockHolding, RiskProfile, PersonalizedRecommendation } from '../types';
import { MOCK_STOCKS, MOCK_STOCK_DETAILS } from '../constants';

const TRACKED_TICKERS: { ticker: string; sector?: string; display?: string }[] = [
  { ticker: 'AAPL', sector: 'Technology', display: 'Apple Inc.' },
  { ticker: 'MSFT', sector: 'Technology', display: 'Microsoft Corp.' },
  { ticker: 'NVDA', sector: 'Technology', display: 'NVIDIA Corporation' },
  { ticker: 'AMZN', sector: 'Consumer Discretionary', display: 'Amazon.com, Inc.' },
  { ticker: 'META', sector: 'Communication Services', display: 'Meta Platforms, Inc.' },
  { ticker: 'JPM', sector: 'Financials', display: 'JPMorgan Chase & Co.' },
  { ticker: 'UNH', sector: 'Healthcare', display: 'UnitedHealth Group' },
  { ticker: 'PG', sector: 'Consumer Staples', display: 'Procter & Gamble Co.' },
  { ticker: 'XOM', sector: 'Energy', display: 'Exxon Mobil Corp.' },
  { ticker: 'V', sector: 'Financials', display: 'Visa Inc.' },
];

const YAHOO_QUOTE_URL = 'https://query1.finance.yahoo.com/v7/finance/quote';
const YAHOO_SUMMARY_URL = 'https://query2.finance.yahoo.com/v10/finance/quoteSummary';
const YAHOO_CHART_URL = 'https://query1.finance.yahoo.com/v8/finance/chart';

const fetchJson = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

const formatMarketCap = (marketCap?: number | null) => {
  if (!marketCap) return 'N/A';
  if (marketCap >= 1e12) return `${(marketCap / 1e12).toFixed(1)}T`;
  if (marketCap >= 1e9) return `${(marketCap / 1e9).toFixed(1)}B`;
  if (marketCap >= 1e6) return `${(marketCap / 1e6).toFixed(1)}M`;
  return marketCap.toString();
};

const buildRecommendation = (metrics: { pe?: number | null; beta?: number | null; dividendYield?: number | null }, bucket: RiskBucket): PersonalizedRecommendation => {
  const { pe, beta, dividendYield } = metrics;
  let score = 0;

  if (pe) {
    if (pe < 15) score += 1;
    else if (pe > 40) score -= 1.5;
  }

  if (beta != null) {
    if (beta < 1) score += 1;
    else if (beta > 1.3) score -= 1;
  }

  if (dividendYield != null) {
    if (dividendYield > 0.02 && (bucket === 'Conservative' || bucket === 'Balanced')) score += 0.5;
    if (dividendYield === 0 && bucket === 'Conservative') score -= 0.5;
  }

  const thresholds: Record<RiskBucket, { strong: number; caution: number }> = {
    Conservative: { strong: 1, caution: -0.5 },
    Balanced: { strong: 0.5, caution: -1 },
    Growth: { strong: 0, caution: -1.5 },
    Aggressive: { strong: -0.5, caution: -2 },
  };

  const { strong, caution } = thresholds[bucket];

  if (score >= strong + 0.5) return { recommendation: 'Highly Recommended', rationale: 'Valuation, stability, and income metrics align well with this risk profile.' };
  if (score >= strong) return { recommendation: 'Recommended', rationale: 'Core fundamentals look healthy for the risk level.' };
  if (score > caution) return { recommendation: 'Neutral', rationale: 'Mixed signals across valuation, volatility, and dividends.' };
  if (score > caution - 0.5) return { recommendation: 'Consider Caution', rationale: 'Volatility or valuation flags mean this deserves careful sizing.' };
  return { recommendation: 'Not Recommended', rationale: 'Current metrics do not fit the desired balance of risk and reward.' };
};

const buildRecommendationSet = (metrics: { pe?: number | null; beta?: number | null; dividendYield?: number | null }) => {
  return {
    Conservative: buildRecommendation(metrics, 'Conservative'),
    Balanced: buildRecommendation(metrics, 'Balanced'),
    Growth: buildRecommendation(metrics, 'Growth'),
    Aggressive: buildRecommendation(metrics, 'Aggressive'),
  };
};

const mapQuoteToStock = (quote: any): Stock => {
  const pe = quote.trailingPE ?? quote.forwardPE ?? null;
  const beta = quote.beta ?? quote.beta3Year ?? null;
  const dividendYield = quote.dividendYield ?? quote.trailingAnnualDividendYield ?? null;

  const sector = quote.sector ?? TRACKED_TICKERS.find(t => t.ticker === quote.symbol)?.sector ?? 'N/A';
  const company = quote.longName || quote.shortName || TRACKED_TICKERS.find(t => t.ticker === quote.symbol)?.display || quote.symbol;

  const metrics = { pe, beta, dividendYield };

  return {
    ticker: quote.symbol,
    company,
    sector,
    price: quote.regularMarketPrice ?? 0,
    change: quote.regularMarketChangePercent ?? 0,
    recommendations: buildRecommendationSet(metrics),
  };
};

const getQuoteData = async (tickers: string[]) => {
  const symbols = tickers.join(',');
  const url = `${YAHOO_QUOTE_URL}?symbols=${symbols}`;
  const data = await fetchJson(url);
  return (data?.quoteResponse?.result || []) as any[];
};

const getQuoteSummary = async (ticker: string) => {
  const url = `${YAHOO_SUMMARY_URL}/${ticker}?modules=assetProfile,summaryDetail,defaultKeyStatistics,financialData`;
  const data = await fetchJson(url);
  return data?.quoteSummary?.result?.[0] ?? {};
};

const getChartData = async (ticker: string) => {
  const url = `${YAHOO_CHART_URL}/${ticker}?range=1y&interval=1mo`;
  const data = await fetchJson(url);
  const result = data?.chart?.result?.[0];
  const timestamps: number[] = result?.timestamp || [];
  const closes: number[] = result?.indicators?.quote?.[0]?.close || [];

  const historicalData = timestamps.map((ts, idx) => {
    const date = new Date(ts * 1000);
    return { name: date.toLocaleString('default', { month: 'short', year: '2-digit' }), price: parseFloat((closes[idx] ?? 0).toFixed(2)) };
  }).filter(d => !isNaN(d.price));

  return historicalData;
};

export const explainPortfolio = async (portfolio: Portfolio, riskBucket: RiskBucket): Promise<string> => {
  return `This portfolio targets a ${portfolio.expectedReturn}% return for a ${riskBucket} investor using diversified building blocks. Holdings are sized to balance expected growth with drawdown control.`;
};

export const explainStockPortfolio = async (portfolio: IndividualPortfolio, riskBucket: RiskBucket): Promise<string> => {
  return `Your custom stock mix complements the ETF core by tilting toward names that match a ${riskBucket} comfort level. Each pick includes a plain-language rationale so you can understand why it is included.`;
};

export const getStressTestExplanation = async (): Promise<string> => {
  return 'A 2008-style shock would temporarily hit equities hard. Diversification across sectors and quality balance sheets helps, but expect volatility and size positions accordingly.';
};

export const getRankedStocks = async (): Promise<Stock[]> => {
  try {
    const quotes = await getQuoteData(TRACKED_TICKERS.map(t => t.ticker));
    if (quotes.length === 0) throw new Error('No quotes returned');
    return quotes.map(mapQuoteToStock);
  } catch (error) {
    console.error('Falling back to mock stocks because live data failed', error);
    return MOCK_STOCKS;
  }
};

export const getStockDetails = async (ticker: string): Promise<StockDetail | null> => {
  try {
    const [quote] = await getQuoteData([ticker]);
    if (!quote) throw new Error('No quote found');

    const summary = await getQuoteSummary(ticker);
    const historicalData = await getChartData(ticker);

    const financialData = summary?.financialData || {};
    const summaryDetail = summary?.summaryDetail || {};
    const keyStats = summary?.defaultKeyStatistics || {};
    const profile = summary?.assetProfile || {};

    const lastPrice = quote.regularMarketPrice ?? historicalData[historicalData.length - 1]?.price ?? 0;
    const pe = keyStats?.trailingPE ?? keyStats?.forwardPE ?? quote.trailingPE ?? quote.forwardPE ?? null;
    const beta = quote.beta ?? keyStats?.beta ?? null;
    const dividendYield = summaryDetail?.dividendYield ?? quote.dividendYield ?? null;

    const metrics = { pe, beta, dividendYield };
    const recommendations = buildRecommendationSet(metrics);

    const forecastTrend = (financialData?.revenueGrowth ?? 0.05) as number;
    const forecastData = historicalData.map(d => ({ ...d, forecast: null }));
    let projected = lastPrice;
    for (let i = 1; i <= 6; i++) {
      projected = projected * (1 + forecastTrend / 6);
      const futureDate = new Date();
      futureDate.setMonth(futureDate.getMonth() + i);
      forecastData.push({ name: futureDate.toLocaleString('default', { month: 'short', year: '2-digit' }), price: null as any, forecast: parseFloat(projected.toFixed(2)) });
    }

    return {
      ticker: quote.symbol,
      company: quote.longName || quote.shortName || ticker,
      sector: profile?.sector || quote.sector || 'N/A',
      price: lastPrice,
      change: quote.regularMarketChangePercent ?? 0,
      recommendations,
      profile: profile?.longBusinessSummary || 'No profile available from Yahoo Finance.',
      marketCap: formatMarketCap(quote.marketCap || financialData?.marketCap),
      peRatio: pe ?? 'N/A',
      eps: keyStats?.trailingEps ?? quote.epsTrailingTwelveMonths ?? 0,
      beta: beta ?? 0,
      dividendYield: dividendYield ? parseFloat((dividendYield * 100).toFixed(2)) : undefined,
      esgRating: undefined,
      news: [],
      historicalData,
      forecastData,
      forecastRationale: 'Projected path blends recent price history with revenue growth pulled from Yahoo Finance. Treat this as a directional scenario, not advice.',
    };
  } catch (error) {
    console.error('Falling back to mock detail because live lookup failed', error);
    if (MOCK_STOCK_DETAILS[ticker]) return MOCK_STOCK_DETAILS[ticker];
    return null;
  }
};

export const getStockScreenerExplanation = async (riskBucket: RiskBucket): Promise<string> => {
  const base = 'Live pricing and fundamentals are pulled directly from Yahoo Finance. Rankings lean on valuation, volatility, and dividend support to align with your comfort zone.';
  switch (riskBucket) {
    case 'Conservative':
      return `${base} We favor lower-beta, dividend-friendly names and avoid stretched valuations.`;
    case 'Balanced':
      return `${base} You will see a mix of steady compounders and select growth leaders with reasonable risk.`;
    case 'Growth':
      return `${base} Expect higher-beta innovators with solid revenue momentum, while avoiding extreme valuations.`;
    case 'Aggressive':
      return `${base} Volatility is acceptable when paired with upside; we still flag overextended valuations for caution.`;
    default:
      return base;
  }
};

export const getChatResponse = async (message: string, history: any[], riskProfile: RiskProfile | null): Promise<string> => {
  const tickerMatch = message.toUpperCase().match(/\(?\b([A-Z]{1,5})\b\)?/);
  const ticker = tickerMatch?.[1];
  if (ticker) {
    const details = await getStockDetails(ticker);
    if (details) {
      const riskNote = riskProfile ? `For your ${riskProfile.bucket} profile, the system currently tags it as "${details.recommendations[riskProfile.bucket].recommendation}" because ${details.recommendations[riskProfile.bucket].rationale}` : 'Set your risk profile to see a personalized stance.';
      return `Here is what I found for ${details.company} (${details.ticker}): it trades around $${details.price.toFixed(2)} with a P/E near ${details.peRatio}. ${riskNote}`;
    }
  }
  return 'Tell me a ticker and I will pull fresh stats from Yahoo Finance to break it down in plain English.';
};

export const createPersonalizedStockPortfolio = async (answers: RiskAnswers, bucket: RiskBucket): Promise<IndividualPortfolio> => {
  await new Promise(resolve => setTimeout(resolve, 400));

  let candidates = [...MOCK_STOCKS];

  if (answers.sectorPreference && answers.sectorPreference !== 'any') {
    candidates = candidates.filter(stock => stock.sector === answers.sectorPreference);
  }

  if (answers.esgFocus === 1) {
    candidates = candidates.filter(stock => MOCK_STOCK_DETAILS[stock.ticker]?.esgRating === 'Leader');
  }

  candidates.sort((a, b) => {
    const recA = a.recommendations[bucket].recommendation;
    const recB = b.recommendations[bucket].recommendation;
    const rank = (rec: string) => ["Highly Recommended", "Recommended", "Neutral", "Consider Caution", "Not Recommended"].indexOf(rec);
    return rank(recA) - rank(recB);
  });

  const suitableCandidates = candidates.filter(stock => {
    const rec = stock.recommendations[bucket].recommendation;
    return rec === 'Highly Recommended' || rec === 'Recommended';
  });

  const portfolioSize = { 'Conservative': 5, 'Balanced': 6, 'Growth': 7, 'Aggressive': 8 }[bucket];
  const selectedStocks = suitableCandidates.slice(0, portfolioSize);

  const defaultPortfolio: IndividualPortfolio = {
    holdings: [],
    totalValue: 0,
    expectedReturn: 0,
    volatility: 0,
    sharpeRatio: 0,
  };

  if (selectedStocks.length === 0) {
    return defaultPortfolio;
  }

  const equalWeight = 1 / selectedStocks.length;

  let totalValue = 0;
  const holdings: IndividualStockHolding[] = selectedStocks.map(stock => {
    const stockDetail = MOCK_STOCK_DETAILS[stock.ticker];
    const value = (answers.investmentAmount || 0) * equalWeight;
    const price = stockDetail?.price ?? stock.price;
    const shares = price ? parseFloat((value / price).toFixed(2)) : 0;
    const actualValue = shares * price;
    totalValue += actualValue;

    return {
      ticker: stock.ticker,
      company: stock.company,
      rationale: stock.recommendations[bucket].rationale,
      shares: shares,
      value: actualValue,
      weight: 0,
    };
  });

  const finalHoldings = holdings.map(holding => ({
    ...holding,
    weight: totalValue > 0 ? (holding.value / totalValue) : equalWeight,
  }));

  const portfolioMetrics = {
    Conservative: { expectedReturn: 3.5, volatility: 8.0, sharpeRatio: 0.44 },
    Balanced: { expectedReturn: 7.0, volatility: 12.5, sharpeRatio: 0.56 },
    Growth: { expectedReturn: 10.5, volatility: 18.0, sharpeRatio: 0.58 },
    Aggressive: { expectedReturn: 13.0, volatility: 22.0, sharpeRatio: 0.59 },
  }[bucket];

  return {
    holdings: finalHoldings,
    totalValue: totalValue,
    ...portfolioMetrics,
  };
};
