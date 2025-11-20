import { RiskQuestion, RiskBucket, Stock, StockDetail, RecommendationCategory, AssetDescription, StockSuggestion } from './types';

export const RISK_QUESTIONS: RiskQuestion[] = [
  {
    id: 'investmentAmount',
    text: 'What is the approximate amount you plan to invest?',
    type: 'text',
    options: [{ text: 'e.g., 10000', value: '10000' }],
  },
  {
    id: 'horizon',
    text: 'What is your investment horizon?',
    type: 'radio',
    options: [
      { text: '< 2 years', value: 0 },
      { text: '2-5 years', value: 15 },
      { text: '5-10 years', value: 30 },
      { text: '> 10 years', value: 40 },
    ],
  },
  {
    id: 'drawdownTolerance',
    text: 'What is the maximum temporary loss you can accept?',
    type: 'radio',
    options: [
      { text: '5%', value: 0 },
      { text: '10%', value: 10 },
      { text: '20%', value: 25 },
      { text: '35%+', value: 40 },
    ],
  },
  {
    id: 'incomeStability',
    text: 'How stable is your current income?',
    type: 'radio',
    options: [
      { text: 'Low stability', value: 0 },
      { text: 'Medium stability', value: 10 },
      { text: 'High stability', value: 20 },
    ],
  },
  {
    id: 'experience',
    text: 'What is your investment experience?',
    type: 'radio',
    options: [
      { text: 'None', value: 0 },
      { text: 'Basic', value: 10 },
      { text: 'Advanced', value: 20 },
    ],
  },
  {
    id: 'goals',
    text: 'What is your primary goal for this investment?',
    type: 'radio',
    options: [
      { text: 'Capital Preservation (minimize loss)', value: 0 },
      { text: 'Generating regular income', value: 10 },
      { text: 'A balance of growth and income', value: 20 },
      { text: 'Long-term wealth growth', value: 30 },
    ],
  },
  {
    id: 'volatilityReaction',
    text: 'When the market drops 20%, you are most likely to:',
    type: 'radio',
    options: [
      { text: 'Sell to avoid further losses', value: 0 },
      { text: 'Feel anxious, but do nothing', value: 10 },
      { text: 'Hold and wait for recovery', value: 15 },
      { text: 'See it as an opportunity to buy more', value: 25 },
    ],
  },
  {
    id: 'liquidity',
    text: 'How likely are you to need to withdraw a significant portion (>25%) of these funds in the next 3 years?',
    type: 'radio',
    options: [
      { text: 'Very Likely', value: 0 },
      { text: 'Somewhat Likely', value: 10 },
      { text: 'Unlikely', value: 20 },
    ],
  },
  {
    id: 'sectorPreference',
    text: 'Which sectors are you most interested in?',
    type: 'select',
    options: [
      { text: 'Any / No Preference', value: 'any' },
      { text: 'Technology', value: 'Technology' },
      { text: 'Healthcare', value: 'Healthcare' },
      { text: 'Financials', value: 'Financials' },
      { text: 'Consumer Discretionary', value: 'Consumer Discretionary' },
      { text: 'Industrials', value: 'Industrials' },
    ],
  },
  {
    id: 'dividendPreference',
    text: 'How important are regular dividend payments to you?',
    type: 'radio',
    options: [
      { text: 'Not important', value: 0 },
      { text: 'Somewhat important', value: 10 },
      { text: 'Very important', value: 20 },
    ],
  },
  {
    id: 'esgFocus',
    text: 'Do you have an interest in companies with high ESG (Environmental, Social, Governance) ratings?',
    type: 'radio',
    options: [
      { text: 'Yes', value: 1 },
      { text: 'No', value: 0 },
    ],
  }
];

export const TARGET_ALLOCATIONS: Record<RiskBucket, Record<string, number>> = {
  Conservative: { VTI: 0.20, VXUS: 0.15, BND: 0.45, TIPS: 0.10, VNQ: 0.05, SGOV: 0.05 },
  Balanced: { VTI: 0.35, VXUS: 0.20, BND: 0.30, GLD: 0.03, VNQ: 0.07, SGOV: 0.05 },
  Growth: { VTI: 0.50, VXUS: 0.25, BND: 0.15, GLD: 0.03, VNQ: 0.07, SGOV: 0.00 },
  Aggressive: { VTI: 0.60, VXUS: 0.30, BND: 0.05, GLD: 0.02, VNQ: 0.03, SGOV: 0.00 },
};

export const MOCK_ASSET_DESCRIPTIONS: Record<string, AssetDescription> = {
  VTI: {
    ticker: 'VTI',
    name: 'Vanguard Total Stock Market ETF',
    description: 'Provides exposure to the entire U.S. equity market, including small-, mid-, and large-cap growth and value stocks. It is a highly diversified and low-cost option for capturing the U.S. stock market.',
    category: 'US Equities',
    rationale: 'Serves as the core U.S. equity holding, providing broad diversification across thousands of stocks. It is the primary engine for long-term growth in most portfolios.'
  },
  VXUS: {
    ticker: 'VXUS',
    name: 'Vanguard Total International Stock ETF',
    description: 'Offers broad exposure across developed and emerging non-U.S. equity markets. It is a convenient way to diversify internationally in a single fund.',
    category: 'International Equities',
    rationale: 'Adds geographic diversification, reducing home-country bias and providing exposure to growth opportunities in markets outside the United States.'
  },
  BND: {
    ticker: 'BND',
    name: 'Vanguard Total Bond Market ETF',
    description: 'Covers the entire U.S. investment-grade bond market, including government, corporate, and mortgage-backed securities. It is used to provide income and reduce portfolio volatility.',
    category: 'Bonds',
    rationale: 'Acts as a stabilizing force in the portfolio. Bonds typically have lower volatility than stocks and can provide a cushion during equity market downturns.'
  },
  TIPS: {
    ticker: 'TIPS',
    name: 'Treasury Inflation-Protected Securities',
    description: 'These are U.S. government bonds whose principal value adjusts with inflation. They are designed to protect investors from the negative effects of rising prices.',
    category: 'Bonds',
    rationale: 'Specifically included to hedge against inflation risk. The value of TIPS increases as inflation rises, preserving the real return of this portion of the portfolio.'
  },
  VNQ: {
    ticker: 'VNQ',
    name: 'Vanguard Real Estate ETF',
    description: 'Invests in REITs (Real Estate Investment Trusts) that purchase office buildings, hotels, and other real estate property. Offers exposure to the U.S. real estate market.',
    category: 'Alternatives',
    rationale: 'Provides diversification into real assets. Real estate can offer returns that are not perfectly correlated with stocks or bonds, and can also be an inflation hedge.'
  },
  SGOV: {
    ticker: 'SGOV',
    name: 'iShares 0-3 Month Treasury Bond ETF',
    description: 'Invests in very short-term U.S. Treasury bonds with remaining maturities of less than three months. It is considered a cash equivalent, offering high liquidity and minimal risk.',
    category: 'Cash & Equivalents',
    rationale: 'Represents the most liquid and least risky part of the portfolio. It provides stability and ensures funds are readily available for opportunities or withdrawals.'
  },
  GLD: {
    ticker: 'GLD',
    name: 'SPDR Gold Shares',
    description: 'An exchange-traded fund that tracks the price of gold. It is often used as a hedge against inflation and currency devaluation.',
    category: 'Alternatives',
    rationale: 'Included as a non-correlated alternative asset. Gold often performs differently from stocks and bonds, especially during times of market stress or high inflation.'
  }
};

export const MOCK_STOCK_SUGGESTIONS: Record<RiskBucket, StockSuggestion[]> = {
  Conservative: [
    { ticker: 'JNJ', company: 'Johnson & Johnson', rationale: 'A defensive healthcare giant with a long history of stable earnings and reliable dividends, suitable for capital preservation.' },
    { ticker: 'PG', company: 'Procter & Gamble Co.', rationale: 'A leading consumer staples company with strong brand loyalty, offering resilience during economic downturns.' },
  ],
  Balanced: [
    { ticker: 'MSFT', company: 'Microsoft Corp.', rationale: 'Combines stable, profitable enterprise software with high-growth cloud computing (Azure), offering a balance of growth and stability.' },
    { ticker: 'V', company: 'Visa Inc.', rationale: 'A global payments technology leader that benefits from the secular shift to digital payments, offering consistent growth.' },
  ],
  Growth: [
    { ticker: 'AAPL', company: 'Apple Inc.', rationale: 'Dominant tech leader with a powerful ecosystem, strong brand loyalty, and consistent innovation driving long-term growth.' },
    { ticker: 'AMZN', company: 'Amazon.com, Inc.', rationale: 'Leader in two high-growth sectors: e-commerce and cloud computing (AWS). Continuously invests in new ventures.' },
  ],
  Aggressive: [
    { ticker: 'NVDA', company: 'NVIDIA Corporation', rationale: 'Leader in accelerated computing, powering the AI revolution. High growth potential comes with higher volatility.' },
    { ticker: 'TSLA', company: 'Tesla, Inc.', rationale: 'A higher-risk, high-reward play on the future of transportation and energy. Volatility is expected.' },
  ],
};

const generateHistoricalData = (startPrice: number, months: number, volatility: number, trend: number) => {
    const data = [];
    let price = startPrice;
    for (let i = months; i > 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        price += price * (trend + (Math.random() - 0.5) * volatility);
        // BUG FIX: Ensure the price never drops below a minimum value (e.g., $0.01).
        // This prevents the price from being rounded to zero, which would flat-line the chart data.
        price = Math.max(0.01, price);
        data.push({ name: date.toLocaleString('default', { month: 'short', year: '2-digit' }), price: parseFloat(price.toFixed(2)) });
    }
    return data;
};

const generateForecastData = (historicalData: { name: string; price: number }[], trend: number, volatility: number) => {
    const lastPrice = historicalData[historicalData.length - 1].price;
    const forecast = historicalData.map(d => ({ ...d, forecast: null as number | null }));
    let price = lastPrice;
    for (let i = 1; i <= 12; i++) {
        const date = new Date();
        date.setMonth(date.getMonth() + i);
        price += price * (trend + (Math.random() - 0.5) * volatility * 0.5); // reduced volatility for forecast
        forecast.push({ name: date.toLocaleString('default', { month: 'short', 'year': '2-digit' }), price: null as any, forecast: parseFloat(price.toFixed(2)) });
    }
    return forecast;
};

const MOCK_STOCK_DETAILS_DATA: Omit<StockDetail, 'historicalData' | 'forecastData'>[] = [
    { 
        ticker: 'AAPL', company: 'Apple Inc.', sector: 'Technology', price: 172.25, change: 1.5, dividendYield: 0.5, esgRating: 'Average',
        recommendations: {
            Conservative: { recommendation: 'Recommended', rationale: 'Strong financials and a loyal customer base provide stability, making it a suitable core holding even for conservative investors.' },
            Balanced: { recommendation: 'Highly Recommended', rationale: 'A blend of stability from its ecosystem and growth from its services division makes it an ideal holding.' },
            Growth: { recommendation: 'Highly Recommended', rationale: 'Dominant tech leader with consistent innovation and a powerful, high-margin ecosystem driving long-term growth.' },
            Aggressive: { recommendation: 'Recommended', rationale: 'A core holding for growth, though its large size may temper the explosive growth potential sought by aggressive investors.' },
        },
        profile: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.', marketCap: '2.8T', peRatio: 28.5, eps: 6.04, beta: 1.2, news: [{title: "Apple Unveils New Vision Pro Headset", source: "TechCrunch", date: "2 days ago"}], forecastRationale: "Based on strong brand loyalty and continued innovation in high-margin products, our model projects steady growth, though potential regulatory scrutiny presents a risk." 
    },
    { 
        ticker: 'MSFT', company: 'Microsoft Corp.', sector: 'Technology', price: 305.41, change: -0.2, dividendYield: 0.9, esgRating: 'Leader',
        recommendations: {
            Conservative: { recommendation: 'Recommended', rationale: 'Dominant in enterprise software with recurring revenue streams, offering defensive characteristics for a tech stock.' },
            Balanced: { recommendation: 'Highly Recommended', rationale: 'Combines a stable, profitable software business with the high-growth cloud (Azure), offering an excellent balance of risk and reward.' },
            Growth: { recommendation: 'Highly Recommended', rationale: 'A key player in two major growth areas: cloud computing and AI. Azure\'s continued expansion is a significant catalyst.' },
            Aggressive: { recommendation: 'Recommended', rationale: 'Provides strong, stable growth, but may not have the hyper-growth potential of smaller, more focused tech companies.' },
        },
        profile: 'Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide.', marketCap: '2.5T', peRatio: 35.2, eps: 8.68, beta: 0.9, news: [{title: "Microsoft's AI Investments Paying Off", source: "Bloomberg", date: "1 day ago"}], forecastRationale: "Continued cloud adoption and leadership in enterprise AI are expected to drive earnings. The model anticipates robust growth, assuming macroeconomic stability." 
    },
    { 
        ticker: 'NVDA', company: 'NVIDIA Corporation', sector: 'Technology', price: 455.10, change: 3.1, dividendYield: 0.03, esgRating: 'Average',
        recommendations: {
            Conservative: { recommendation: 'Consider Caution', rationale: 'Extreme volatility and a very high valuation are inconsistent with capital preservation goals, despite its strong market position.' },
            Balanced: { recommendation: 'Recommended', rationale: 'Offers significant growth exposure to the AI trend, but should be a smaller position due to its high volatility.' },
            Growth: { recommendation: 'Highly Recommended', rationale: 'Unquestioned leader in GPUs, the core hardware powering the AI revolution. A key holding for growth-oriented portfolios.' },
            Aggressive: { recommendation: 'Highly Recommended', rationale: 'A primary driver of portfolio growth. Its leadership in the secular AI trend presents a compelling, albeit high-risk, opportunity.' },
        },
        profile: 'NVIDIA Corporation provides graphics, and compute and networking solutions in the United States, Taiwan, China, and internationally.', marketCap: '1.1T', peRatio: 65.7, eps: 6.92, beta: 1.7, news: [{title: "NVIDIA Shatters Earnings Expectations on AI Chip Demand", source: "Reuters", date: "3 days ago"}], forecastRationale: "The forecast is exceptionally strong, driven by the AI secular trend. However, its high valuation and potential for new competition create significant volatility risk." 
    },
    { 
        ticker: 'CRM', company: 'Salesforce, Inc.', sector: 'Technology', price: 212.80, change: 1.8, dividendYield: 0, esgRating: 'Leader',
        recommendations: {
            Conservative: { recommendation: 'Neutral', rationale: 'Growth-focused valuation may not be suitable. Prefer companies with more stable earnings and dividends.'},
            Balanced: { recommendation: 'Recommended', rationale: 'Leader in the CRM space with strong recurring revenue, providing a good balance of growth and stability.'},
            Growth: { recommendation: 'Highly Recommended', rationale: 'Dominant market position and expansion into new cloud services provide a long runway for growth.'},
            Aggressive: { recommendation: 'Recommended', rationale: 'A core growth holding, but may not be as disruptive as newer, smaller cloud companies.' },
        },
        profile: 'Salesforce, Inc. provides Customer Relationship Management (CRM) technology that brings companies and customers together worldwide.', marketCap: '205B', peRatio: 110.2, eps: 1.93, beta: 1.1, news: [{title: "Salesforce Beats Earnings Estimates", source: "CNBC", date: "4 days ago"}], forecastRationale: "Continued adoption of cloud-based business solutions is a primary growth driver. The forecast is positive, assuming the company maintains its market leadership." 
    },
    { 
        ticker: 'ADBE', company: 'Adobe Inc.', sector: 'Technology', price: 520.45, change: -0.5, dividendYield: 0, esgRating: 'Leader',
        recommendations: {
            Conservative: { recommendation: 'Recommended', rationale: 'Strong moat in creative software with a subscription model provides stable, predictable revenue.'},
            Balanced: { recommendation: 'Highly Recommended', rationale: 'A high-quality company with dominant products, offering a blend of stability and long-term growth.'},
            Growth: { recommendation: 'Highly Recommended', rationale: 'Leader in digital media and marketing software, benefiting from the growth of digital content creation.'},
            Aggressive: { recommendation: 'Recommended', rationale: 'A stellar long-term compounder, but its mature status may mean slower growth than emerging tech.' },
        },
        profile: 'Adobe Inc. operates as a diversified software company worldwide. It operates through three segments: Digital Media, Digital Experience, and Publishing and Advertising.', marketCap: '235B', peRatio: 45.1, eps: 11.54, beta: 1.3, news: [{title: "Adobe Launches New AI-Powered Features", source: "TechCrunch", date: "1 week ago"}], forecastRationale: "The model anticipates continued strong performance driven by its subscription model and leadership in creative software. AI integration is a key future catalyst." 
    },
    { 
        ticker: 'AMZN', company: 'Amazon.com, Inc.', sector: 'Consumer Discretionary', price: 134.25, change: 2.1, dividendYield: 0, esgRating: 'Laggard',
        recommendations: {
            Conservative: { recommendation: 'Consider Caution', rationale: 'High valuation and focus on growth over profits make it less suitable for investors prioritizing capital preservation.' },
            Balanced: { recommendation: 'Recommended', rationale: 'Leadership in e-commerce and cloud (AWS) offers diversified growth, justifying its place in a balanced portfolio.' },
            Growth: { recommendation: 'Highly Recommended', rationale: 'Dominance in two high-growth sectors, e-commerce and cloud computing, with continuous investment in new ventures.' },
            Aggressive: { recommendation: 'Highly Recommended', rationale: 'Represents a core holding for an aggressive strategy, with AWS providing a platform for continued high-growth and innovation.' },
        },
        profile: 'Amazon.com, Inc. engages in the retail sale of consumer products and subscriptions in North America and internationally.', marketCap: '1.4T', peRatio: 60.5, eps: 2.22, beta: 1.3, news: [{title: "Amazon's AWS Announces New AI Services", source: "The Verge", date: "Yesterday"}], forecastRationale: "Growth is predicated on the continued expansion of AWS and recovery in e-commerce. The model is positive but notes that high valuation may limit short-term upside." 
    },
    { 
        ticker: 'TSLA', company: 'Tesla, Inc.', sector: 'Consumer Discretionary', price: 250.10, change: -2.5, dividendYield: 0, esgRating: 'Average',
        recommendations: {
            Conservative: { recommendation: 'Not Recommended', rationale: 'Extremely high volatility and valuation driven by sentiment make it unsuitable for capital preservation.'},
            Balanced: { recommendation: 'Consider Caution', rationale: 'While a leader in EVs, its volatility is too high for a core position in a balanced portfolio.'},
            Growth: { recommendation: 'Recommended', rationale: 'A leader in a major secular growth trend (EVs), but high valuation and competition require careful position sizing.'},
            Aggressive: { recommendation: 'Highly Recommended', rationale: 'A high-risk, high-reward play on the future of transportation and energy. Volatility is expected.' },
        },
        profile: 'Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems.', marketCap: '780B', peRatio: 75.3, eps: 3.32, beta: 2.0, news: [{title: "Tesla Announces Price Cuts to Boost Demand", source: "Reuters", date: "2 days ago"}], forecastRationale: "Forecast is highly dependent on execution of production ramps and maintaining market share. The wide range of outcomes reflects its high volatility and sentiment-driven nature." 
    },
    { 
        ticker: 'UNH', company: 'UnitedHealth Group', sector: 'Healthcare', price: 502.50, change: 0.7, dividendYield: 1.5, esgRating: 'Average',
        recommendations: {
            Conservative: { recommendation: 'Highly Recommended', rationale: 'A leader in the stable health insurance industry with a track record of consistent growth and dividend increases.'},
            Balanced: { recommendation: 'Highly Recommended', rationale: 'Offers a blend of defensive healthcare exposure with strong, consistent earnings growth from its Optum division.'},
            Growth: { recommendation: 'Recommended', rationale: 'A reliable compounder that provides stability to a growth portfolio, though not a hyper-growth stock.'},
            Aggressive: { recommendation: 'Neutral', rationale: 'While a great company, its growth rate may be too moderate for a portfolio focused on maximum capital appreciation.' },
        },
        profile: 'UnitedHealth Group Incorporated operates as a diversified health care company in the United States.',
        marketCap: '460B', 
        peRatio: 22.5, 
        eps: 22.30, 
        beta: 0.75, 
        news: [{title: "UnitedHealth Beats Earnings on Strong Optum Growth", source: "MarketWatch", date: "5 days ago"}], 
        forecastRationale: "The forecast is positive, driven by consistent growth in the Optum division and stable demand in the insurance segment. Demographic tailwinds from an aging population provide long-term support."
    },
    {
        ticker: 'JNJ', company: 'Johnson & Johnson', sector: 'Healthcare', price: 165.50, change: 0.3, dividendYield: 2.9, esgRating: 'Leader',
        recommendations: {
            Conservative: { recommendation: 'Highly Recommended', rationale: 'A defensive healthcare giant with a long history of stable earnings and reliable dividends, ideal for capital preservation.' },
            Balanced: { recommendation: 'Recommended', rationale: 'Provides a stable anchor to a portfolio with reliable dividends and lower volatility.' },
            Growth: { recommendation: 'Neutral', rationale: 'Mature company with slower growth prospects compared to biotech or medical device innovators.' },
            Aggressive: { recommendation: 'Not Recommended', rationale: 'Low growth profile is not suitable for an aggressive strategy seeking high capital appreciation.' },
        },
        profile: 'Johnson & Johnson researches, develops, manufactures, and sells various products in the healthcare field worldwide.', marketCap: '430B', peRatio: 24.8, eps: 6.67, beta: 0.5, news: [{title: "J&J spins off consumer health unit", source: "Associated Press", date: "1 week ago"}], forecastRationale: "Forecast anticipates steady but slow growth, driven by its pharmaceutical and medical devices segments. Its defensive nature makes it resilient in downturns."
    },
    {
        ticker: 'V', company: 'Visa Inc.', sector: 'Financials', price: 235.10, change: 1.1, dividendYield: 0.8, esgRating: 'Leader',
        recommendations: {
            Conservative: { recommendation: 'Recommended', rationale: 'Dominant market position and strong financials offer stability, though its valuation is growth-oriented.' },
            Balanced: { recommendation: 'Highly Recommended', rationale: 'A global payments leader that benefits from the secular shift to digital payments, offering consistent, high-margin growth.' },
            Growth: { recommendation: 'Highly Recommended', rationale: 'Capital-light business model with a powerful network effect drives strong, consistent earnings growth.' },
            Aggressive: { recommendation: 'Recommended', rationale: 'A core growth holding, but its large size may prevent the hyper-growth seen in smaller fintech disruptors.' },
        },
        profile: 'Visa Inc. operates as a payments technology company worldwide.', marketCap: '480B', peRatio: 30.1, eps: 7.81, beta: 0.95, news: [{title: "Visa sees continued growth in travel spending", source: "Reuters", date: "4 days ago"}], forecastRationale: "Positive outlook based on the ongoing global shift from cash to digital payments and the recovery in cross-border travel. Resilient business model."
    },
    {
        ticker: 'PG', company: 'Procter & Gamble', sector: 'Consumer Staples', price: 152.40, change: 0.1, dividendYield: 2.4, esgRating: 'Average',
        recommendations: {
            Conservative: { recommendation: 'Highly Recommended', rationale: 'A leading consumer staples company with strong brand loyalty, offering resilience during economic downturns and reliable dividends.' },
            Balanced: { recommendation: 'Recommended', rationale: 'Provides a defensive foundation to a portfolio, ensuring stability when more cyclical stocks may falter.' },
            Growth: { recommendation: 'Not Recommended', rationale: 'Very slow growth profile is not aligned with the goals of a growth-oriented investor.' },
            Aggressive: { recommendation: 'Not Recommended', rationale: 'The defensive and low-growth nature of this stock makes it unsuitable for an aggressive portfolio.' },
        },
        profile: 'The Procter & Gamble Company provides branded consumer packaged goods to consumers in North and Latin America, Europe, Asia Pacific, India, the Middle East, and Africa.', marketCap: '360B', peRatio: 25.5, eps: 5.98, beta: 0.4, news: [{title: "P&G raises sales forecast on price hikes", source: "Bloomberg", date: "6 days ago"}], forecastRationale: "Model predicts slow and steady growth, driven by brand power and pricing ability. It is considered a defensive holding that should perform well in a recession."
    },
    {
        ticker: 'JPM', company: 'JPMorgan Chase & Co.', sector: 'Financials', price: 140.80, change: -0.8, dividendYield: 2.8, esgRating: 'Average',
        recommendations: {
            Conservative: { recommendation: 'Recommended', rationale: 'A well-managed, diversified financial powerhouse that offers stability and a solid dividend yield for income-focused investors.' },
            Balanced: { recommendation: 'Recommended', rationale: 'Offers a reasonable blend of income and value, but its performance is highly tied to the economic cycle.' },
            Growth: { recommendation: 'Neutral', rationale: 'As a mature company, its growth is limited compared to other sectors. Better growth opportunities exist elsewhere.' },
            Aggressive: { recommendation: 'Consider Caution', rationale: 'The banking sector\'s cyclicality and low growth profile make it a poor fit for aggressive growth strategies.' },
        },
        profile: 'JPMorgan Chase & Co. is a financial holding company that provides financial and investment banking services.', marketCap: '410B', peRatio: 10.2, eps: 13.80, beta: 1.1, news: [{title: "JPMorgan CEO warns of economic headwinds", source: "CNBC", date: "2 days ago"}], forecastRationale: "Forecast is neutral, reflecting the balance between a strong market position and macroeconomic uncertainty. Performance will be heavily influenced by interest rate policy."
    },
    {
        ticker: 'XOM', company: 'Exxon Mobil Corp.', sector: 'Energy', price: 115.60, change: 1.2, dividendYield: 3.1, esgRating: 'Laggard',
        recommendations: {
            Conservative: { recommendation: 'Neutral', rationale: 'While it offers a high dividend, the energy sector is extremely volatile and subject to commodity price swings.' },
            Balanced: { recommendation: 'Recommended', rationale: 'Provides a hedge against inflation and exposure to the energy sector, but should be position-sized carefully due to volatility.' },
            Growth: { recommendation: 'Consider Caution', rationale: 'A cyclical industry that is not aligned with long-term secular growth trends like technology or healthcare.' },
            Aggressive: { recommendation: 'Consider Caution', rationale: 'More of a value/cyclical play than a high-growth investment. Unfavorable for long-term aggressive growth.' },
        },
        profile: 'Exxon Mobil Corporation engages in the exploration and production of crude oil and natural gas, and manufacture of petroleum products.', marketCap: '470B', peRatio: 8.5, eps: 13.60, beta: 0.8, news: [{title: "Oil prices rise on supply cut concerns", source: "Reuters", date: "1 day ago"}], forecastRationale: "The forecast is highly dependent on global oil prices. While currently profitable, the long-term outlook is clouded by the transition to renewable energy."
    },
    {
        ticker: 'CVX', company: 'Chevron Corp.', sector: 'Energy', price: 162.30, change: 1.5, dividendYield: 3.7, esgRating: 'Laggard',
        recommendations: {
            Conservative: { recommendation: 'Neutral', rationale: 'Similar to XOM, the high dividend is attractive but comes with significant commodity-driven volatility.' },
            Balanced: { recommendation: 'Recommended', rationale: 'Offers strong cash flows and dividends, acting as a portfolio diversifier, but is subject to cyclical risk.' },
            Growth: { recommendation: 'Not Recommended', rationale: 'A mature, cyclical business that does not fit a growth-oriented investment thesis.' },
            Aggressive: { recommendation: 'Not Recommended', rationale: 'Poor fit for an aggressive strategy due to its cyclical nature and lack of secular growth drivers.' },
        },
        profile: 'Chevron Corporation engages in integrated energy and chemicals operations worldwide.', marketCap: '310B', peRatio: 9.8, eps: 16.56, beta: 0.9, news: [{title: "Chevron boosts dividend and share buybacks", source: "Wall Street Journal", date: "3 days ago"}], forecastRationale: "The outlook is tied to energy prices and global economic demand. The company\'s focus on shareholder returns is a positive, but cyclical risks remain high."
    },
    {
        ticker: 'CAT', company: 'Caterpillar Inc.', sector: 'Industrials', price: 255.40, change: 2.1, dividendYield: 2.0, esgRating: 'Average',
        recommendations: {
            Conservative: { recommendation: 'Consider Caution', rationale: 'A highly cyclical business that is very sensitive to the global economic outlook. Not ideal for capital preservation.' },
            Balanced: { recommendation: 'Recommended', rationale: 'A global leader that serves as a good barometer for economic activity. Best bought early in an economic cycle.' },
            Growth: { recommendation: 'Neutral', rationale: 'Growth is cyclical, not secular. Not as reliable for long-term growth as other sectors.' },
            Aggressive: { recommendation: 'Neutral', rationale: 'While it can perform well in an expansion, it lacks the disruptive potential sought by aggressive investors.' },
        },
        profile: 'Caterpillar Inc. manufactures and sells construction and mining equipment, diesel and natural gas engines, industrial gas turbines, and diesel-electric locomotives worldwide.', marketCap: '130B', peRatio: 15.2, eps: 16.80, beta: 1.0, news: [{title: "Caterpillar reports strong demand from construction sector", source: "Bloomberg", date: "4 days ago"}], forecastRationale: "Forecast is positive but cautious, reflecting strong current demand but acknowledging high sensitivity to a potential economic slowdown. A classic cyclical stock."
    },
    {
        ticker: 'BA', company: 'The Boeing Company', sector: 'Industrials', price: 210.90, change: -1.2, dividendYield: 0, esgRating: 'Laggard',
        recommendations: {
            Conservative: { recommendation: 'Not Recommended', rationale: 'High debt load, operational issues, and cyclicality make this stock far too risky for a conservative portfolio.' },
            Balanced: { recommendation: 'Consider Caution', rationale: 'A high-risk turnaround play. Potential upside is significant but depends on resolving production and safety concerns.' },
            Growth: { recommendation: 'Recommended', rationale: 'A duopoly in a massive industry. If it can overcome its current challenges, the long-term growth could be substantial.' },
            Aggressive: { recommendation: 'Highly Recommended', rationale: 'A high-risk, high-reward investment. A successful turnaround could lead to massive returns, which fits an aggressive profile.' },
        },
        profile: 'The Boeing Company designs, manufactures, and sells commercial airplanes, defense, space, and security systems worldwide.', marketCap: '125B', peRatio: 'N/A', eps: -8.30, beta: 1.5, news: [{title: "Boeing faces new questions over 737 MAX production", source: "Reuters", date: "1 day ago"}], forecastRationale: "The forecast has a very wide range of outcomes. A successful resolution of its production issues could lead to significant upside, but continued problems present a major risk."
    },
    {
        ticker: 'DIS', company: 'The Walt Disney Company', sector: 'Communication Services', price: 85.50, change: 0.5, dividendYield: 0, esgRating: 'Leader',
        recommendations: {
            Conservative: { recommendation: 'Neutral', rationale: 'The company is in a turnaround phase and faces challenges in its streaming business, reducing its defensive appeal.' },
            Balanced: { recommendation: 'Recommended', rationale: 'Iconic brands and assets provide a solid foundation, but the transition to streaming profitability is a key variable.' },
            Growth: { recommendation: 'Recommended', rationale: 'A bet on the power of its content and brand to win in the streaming wars and drive parks attendance.' },
            Aggressive: { recommendation: 'Recommended', rationale: 'A turnaround story with potential for significant upside if streaming becomes profitable and parks growth continues.' },
        },
        profile: 'The Walt Disney Company operates as an entertainment company worldwide.', marketCap: '155B', peRatio: 35.1, eps: 2.44, beta: 1.2, news: [{title: "Disney+ to crack down on password sharing", source: "Variety", date: "3 days ago"}], forecastRationale: "The forecast is cautiously optimistic, assuming a path to profitability for its streaming segment and continued strength in its Parks division. The stock\'s performance hinges on execution."
    },
    {
        ticker: 'NFLX', company: 'Netflix, Inc.', sector: 'Communication Services', price: 410.20, change: -1.8, dividendYield: 0, esgRating: 'Average',
        recommendations: {
            Conservative: { recommendation: 'Not Recommended', rationale: 'A high-growth, high-volatility stock in a competitive industry. Unsuitable for capital preservation.' },
            Balanced: { recommendation: 'Consider Caution', rationale: 'While a market leader, the "streaming wars" create significant uncertainty and risk.' },
            Growth: { recommendation: 'Recommended', rationale: 'A pioneer and leader in a global secular growth industry. Its focus on original content is a key differentiator.' },
            Aggressive: { recommendation: 'Highly Recommended', rationale: 'Despite competition, it remains the leader in streaming with significant pricing power and global scale.' },
        },
        profile: 'Netflix, Inc. provides entertainment services. It offers TV series, documentaries, feature films, and mobile games across a wide variety of genres and languages.', marketCap: '180B', peRatio: 32.5, eps: 12.62, beta: 1.3, news: [{title: "Netflix ad-supported tier gains traction", source: "The Hollywood Reporter", date: "1 week ago"}], forecastRationale: "The forecast is positive, based on continued subscriber growth, particularly in international markets, and the success of its ad-supported tier. Competition remains a key risk."
    },
    {
        ticker: 'PLD', company: 'Prologis, Inc.', sector: 'Real Estate', price: 118.40, change: 0.9, dividendYield: 2.9, esgRating: 'Leader',
        recommendations: {
            Conservative: { recommendation: 'Recommended', rationale: 'A high-quality real estate investment trust (REIT) providing stable, dividend-based income.' },
            Balanced: { recommendation: 'Highly Recommended', rationale: 'A leader in a critical part of the e-commerce supply chain (logistics warehouses), offering a blend of income and growth.' },
            Growth: { recommendation: 'Recommended', rationale: 'Benefits from the secular growth of e-commerce, which drives demand for its warehouse properties.' },
            Aggressive: { recommendation: 'Neutral', rationale: 'While a great company, REITs are generally not suited for aggressive growth strategies due to their moderate growth profiles.' },
        },
        profile: 'Prologis, Inc. is the global leader in logistics real estate with a focus on high-barrier, high-growth markets.', marketCap: '110B', peRatio: 30.2, eps: 3.92, beta: 0.9, news: [{title: "E-commerce growth continues to fuel warehouse demand", source: "Real Estate Weekly", date: "5 days ago"}], forecastRationale: "The forecast is positive, driven by the long-term secular trend of e-commerce. The company\'s global scale and quality portfolio provide a competitive advantage."
    },
    {
        ticker: 'LIN', company: 'Linde plc', sector: 'Materials', price: 395.70, change: 0.6, dividendYield: 1.3, esgRating: 'Leader',
        recommendations: {
            Conservative: { recommendation: 'Recommended', rationale: 'A defensive industrial company with a wide moat and stable, recurring revenues from long-term contracts.' },
            Balanced: { recommendation: 'Highly Recommended', rationale: 'Offers a unique combination of defensive stability and exposure to long-term growth themes like hydrogen energy.' },
            Growth: { recommendation: 'Recommended', rationale: 'A high-quality compounder that provides steady growth, though less explosive than technology stocks.' },
            Aggressive: { recommendation: 'Neutral', rationale: 'A great business, but its growth rate is likely too moderate for an aggressive investment strategy.' },
        },
        profile: 'Linde plc operates as an industrial gas and engineering company in North and South America, Europe, the Middle East, Africa, and Asia Pacific.', marketCap: '190B', peRatio: 33.1, eps: 11.95, beta: 0.8, news: [{title: "Linde announces new green hydrogen project", source: "Chemical & Engineering News", date: "1 week ago"}], forecastRationale: "The forecast is positive, based on its stable business model and growth opportunities in healthcare and clean energy. It\'s considered a high-quality, lower-risk industrial holding."
    },
];

export const MOCK_STOCKS: Stock[] = MOCK_STOCK_DETAILS_DATA.map(({ ticker, company, sector, price, change, recommendations }) => ({
    ticker,
    company,
    sector,
    price,
    change,
    recommendations
}));

export const MOCK_STOCK_DETAILS: Record<string, StockDetail> = MOCK_STOCK_DETAILS_DATA.reduce((acc, stockData) => {
    const trend = (stockData.ticker.charCodeAt(0) % 5) * 0.005 - 0.01; 
    const volatility = 0.02 + (stockData.ticker.charCodeAt(1) % 5) * 0.01; 

    const historicalData = generateHistoricalData(stockData.price, 12, volatility, trend);
    const forecastData = generateForecastData(historicalData, trend, volatility);
    
    acc[stockData.ticker] = {
        ...stockData,
        historicalData,
        forecastData,
    };
    return acc;
}, {} as Record<string, StockDetail>);