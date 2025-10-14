import { GenerateContentResponse } from "@google/genai";
import { Portfolio, RiskBucket, Stock, StockDetail, RiskAnswers, IndividualPortfolio, IndividualStockHolding, RiskProfile } from '../types';
import { MOCK_STOCKS, MOCK_STOCK_DETAILS } from '../constants';

const MOCK_LATENCY = 800;

const mockGenerateContent = async (prompt: string, riskBucket?: RiskBucket, overrideText?: string): Promise<GenerateContentResponse> => {
  console.log("Mocking Gemini Call with prompt:", prompt);
  await new Promise(resolve => setTimeout(resolve, MOCK_LATENCY));
  
  let text = "";

  if (overrideText) {
    text = overrideText;
  } else if (prompt.includes("explain portfolio")) {
    text = "This portfolio is designed to be well-diversified across major asset classes, including US stocks (VTI), international stocks (VXUS), and bonds (BND). The specific allocation aims to balance growth potential with risk, aligning with your specified risk tolerance. Remember, past performance is not indicative of future results."
  } else if (prompt.includes("explain this individual stock portfolio")) {
    text = "This is a satellite portfolio of individual stocks, constructed based on your unique profile answers. It's designed to complement your core ETF holdings by providing more focused exposure to companies that align with your growth expectations and sector interests. Each stock was chosen for a specific reason, detailed in the holdings breakdown. This part of your portfolio is generally higher risk but offers potential for higher returns."
  } else if (prompt.includes("What if 2008 repeats?")) {
    text = "A severe downturn similar to 2008 would likely cause a significant temporary decline in this portfolio's value, especially in the equity portion. However, the bond allocation (BND) is designed to provide a cushion. Historically, diversified portfolios have recovered from such events, but the timeline can be long. This is a stress test scenario, and not a prediction."
  } else if (prompt.includes("explain these stock rankings")) {
      switch (riskBucket) {
        case 'Conservative':
            text = "For your Conservative profile, rankings prioritize companies with strong balance sheets, stable earnings, and low volatility. 'Highly Recommended' stocks are typically resilient leaders in defensive sectors. High-growth, high-volatility stocks are generally rated lower.";
            break;
        case 'Balanced':
            text = "For your Balanced profile, the rankings weigh both growth potential and financial stability. 'Highly Recommended' stocks often represent a blend of quality and reasonable growth prospects, like established tech leaders or strong consumer brands.";
            break;
        case 'Growth':
            text = "For your Growth profile, rankings favor companies with strong revenue growth, market leadership in innovative sectors, and large addressable markets. Higher valuation and volatility are more acceptable in pursuit of long-term capital appreciation.";
            break;
        case 'Aggressive':
            text = "For your Aggressive profile, rankings emphasize high-growth, disruptive companies with the potential for explosive returns. These stocks often come with higher risk and volatility, but are selected for their significant upside potential.";
            break;
        default:
            text = "The stock rankings are generated based on a combination of fundamental factors like profitability and growth, as well as market sentiment indicators. 'Highly Recommended' stocks typically exhibit strong financial health and positive outlooks. This is for educational purposes and is not a recommendation to buy or sell.";
            break;
      }
  } else if (prompt.toLowerCase().includes("diversification")) {
    text = "That's an excellent question! Diversification is the practice of spreading your investments across various assets to reduce risk. The idea is that if one investment performs poorly, others may do well, smoothing out your returns. Think of it as the old saying: 'Don't put all your eggs in one basket.' This portfolio uses different ETFs (like VTI for US stocks and VXUS for international) to achieve this."
  } else if (prompt.toLowerCase().includes("what is an etf")) {
    text = "Great question. An ETF, or Exchange-Traded Fund, is like a basket that holds many different investments, such as stocks or bonds. When you buy a share of an ETF, you're buying a small piece of all the investments in that basket. It's a popular way to easily diversify your portfolio without having to buy each individual stock yourself."
  } else {
    text = `That's a great topic to explore. For example, if you're asking about a specific strategy, one approach could be to focus on companies with strong, consistent earnings. It's a useful way to think about managing risk and potential returns. Remember, my role here is to be your teacher and help you understand these concepts, not to give direct financial advice. It's always a good idea to continue learning and form your own informed opinions.`
  }


  const mockResponse: GenerateContentResponse = {
    text: text,
    candidates: [],
    usageMetadata: {
      promptTokenCount: 0,
      candidatesTokenCount: 0,
      totalTokenCount: 0
    },
    data: undefined,
    functionCalls: undefined,
    executableCode: undefined,
    codeExecutionResult: undefined,
  };
  return mockResponse;
};

export const explainPortfolio = async (portfolio: Portfolio, riskBucket: RiskBucket): Promise<string> => {
  const prompt = `Explain this portfolio with ${portfolio.expectedReturn}% expected return for a ${riskBucket} investor.`;
  const response = await mockGenerateContent(prompt);
  return response.text;
};

export const explainStockPortfolio = async (portfolio: IndividualPortfolio, riskBucket: RiskBucket): Promise<string> => {
  const prompt = `Explain this individual stock portfolio for a ${riskBucket} investor.`;
  const response = await mockGenerateContent(prompt);
  return response.text;
}

export const getStressTestExplanation = async (): Promise<string> => {
    const prompt = `What if 2008 repeats?`;
    const response = await mockGenerateContent(prompt);
    return response.text;
}

export const getRankedStocks = async (): Promise<Stock[]> => {
    await new Promise(resolve => setTimeout(resolve, MOCK_LATENCY / 2));
    return MOCK_STOCKS;
}

export const getStockDetails = async (ticker: string): Promise<StockDetail | null> => {
    await new Promise(resolve => setTimeout(resolve, MOCK_LATENCY));
    if (MOCK_STOCK_DETAILS[ticker]) {
        return MOCK_STOCK_DETAILS[ticker];
    }
    return null;
}

export const getStockScreenerExplanation = async (riskBucket: RiskBucket): Promise<string> => {
    const prompt = `Briefly explain these stock rankings for a beginner with a ${riskBucket} profile.`;
    const response = await mockGenerateContent(prompt, riskBucket);
    return response.text;
}

export const getChatResponse = async (message: string, history: any[], riskProfile: RiskProfile | null): Promise<string> => {
    const prompt = `User message: "${message}". Respond as a helpful AI investment teacher.`;
    
    const messageUpper = message.toUpperCase();
    let foundStock: Stock | undefined;

    // First, try to match a ticker (e.g., AAPL)
    const tickerMatch = messageUpper.match(/\(?\b([A-Z]{1,5})\b\)?/);
    if (tickerMatch) {
        foundStock = MOCK_STOCKS.find(s => s.ticker === tickerMatch[1]);
    }
    
    // If no ticker found, try to match by company name from a processed message
    if (!foundStock) {
        const commonWords = new Set(['TELL', 'ME', 'ABOUT', 'WHAT', 'IS', 'CAN', 'YOU', 'A', 'THE', 'OF', 'FOR', 'INC', 'CORP', 'CORPORATION', 'COMPANY', 'STOCK']);
        const processedMessage = messageUpper
            .replace(/[.,?]/g, '')
            .split(' ')
            .filter(word => !commonWords.has(word))
            .join(' ');
        
        // Find a stock where the company name includes the core part of the user's message
        if (processedMessage) {
            foundStock = MOCK_STOCKS.find(s => s.company.toUpperCase().includes(processedMessage));
        }
    }

    if (foundStock) {
        const details = MOCK_STOCK_DETAILS[foundStock.ticker];
        let customText = `Absolutely! Let's take a closer look at **${details.company} (${details.ticker})**. I'm happy to help you learn about different companies. Think of me as a friend to help you take your first steps.\n\n`;
        customText += `**What they do:** ${details.profile}\n\n`;
        customText += `**Performance Snapshot:** It's currently priced around **$${details.price.toFixed(2)}**. A key metric investors often look at is the Price-to-Earnings (P/E) Ratio, which is **${details.peRatio}**. This can give you a general sense of how the market values the company relative to its earnings.\n\n`;

        if (riskProfile) {
            const rec = details.recommendations[riskProfile.bucket];
            customText += `**Analysis for Your Profile (${riskProfile.bucket}):** For your investment style, my analysis rates this as a **'${rec.recommendation}'** stock. Here's the thinking behind that: *${rec.rationale}*\n\n`;
        } else {
            customText += `Once you complete your risk profile, I can give you a more personalized analysis of how this stock might fit into your strategy!\n\n`;
        }
        
        customText += `I hope this gives you a great starting point for your research! What other questions do you have?`;
        
        const response = await mockGenerateContent(prompt, riskProfile?.bucket, customText);
        return response.text;
    }

    const response = await mockGenerateContent(prompt);
    return response.text;
}

export const createPersonalizedStockPortfolio = async (answers: RiskAnswers, bucket: RiskBucket): Promise<IndividualPortfolio> => {
    console.log("Creating personalized portfolio with answers:", answers);
    await new Promise(resolve => setTimeout(resolve, MOCK_LATENCY));

    let candidates = MOCK_STOCKS;

    // Filter by sector preference
    if (answers.sectorPreference && answers.sectorPreference !== 'any') {
        candidates = candidates.filter(stock => stock.sector === answers.sectorPreference);
    }
    
    // Filter by ESG
    if (answers.esgFocus === 1) {
        candidates = candidates.filter(stock => MOCK_STOCK_DETAILS[stock.ticker]?.esgRating === 'Leader');
    }

    // Prioritize by recommendation for the user's bucket
    candidates.sort((a, b) => {
        const recA = a.recommendations[bucket].recommendation;
        const recB = b.recommendations[bucket].recommendation;
        const rank = (rec: string) => ["Highly Recommended", "Recommended", "Neutral", "Consider Caution", "Not Recommended"].indexOf(rec);
        return rank(recA) - rank(recB);
    });
    
    // Filter out poorly ranked stocks
    const suitableCandidates = candidates.filter(stock => {
        const rec = stock.recommendations[bucket].recommendation;
        return rec === 'Highly Recommended' || rec === 'Recommended';
    });

    // Select top N stocks (e.g., 5-8)
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

    // Assign weights (simple equal weight for this mock)
    const equalWeight = 1 / selectedStocks.length;

    let totalValue = 0;
    const holdings: IndividualStockHolding[] = selectedStocks.map(stock => {
        const stockDetail = MOCK_STOCK_DETAILS[stock.ticker];
        const value = answers.investmentAmount * equalWeight;
        const shares = parseFloat((value / stockDetail.price).toFixed(2));
        const actualValue = shares * stockDetail.price;
        totalValue += actualValue;

        return {
            ticker: stock.ticker,
            company: stock.company,
            rationale: stock.recommendations[bucket].rationale,
            shares: shares,
            value: actualValue,
            weight: 0, // will be recalculated
        };
    });
    
    // Recalculate weights based on actual value
    const finalHoldings = holdings.map(holding => ({
        ...holding,
        weight: totalValue > 0 ? (holding.value / totalValue) : equalWeight,
    }));

    // Add mock performance metrics
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