import { IndustrySector, RiskBucket } from '../types';

export const INDUSTRY_SECTORS: IndustrySector[] = [
  {
    sector: 'Information Technology',
    industries: [
      { 
        name: 'Software & Services', 
        description: 'Companies that develop and provide software, IT services, and data processing.', 
        recommendations: {
          Conservative: { recommendation: 'Recommended', rationale: 'Many established software companies have strong recurring revenue models, providing stability and cash flow.' },
          Balanced: { recommendation: 'Highly Recommended', rationale: 'Offers a mix of stable, mature companies and high-growth cloud players, fitting well in a balanced approach.' },
          Growth: { recommendation: 'Highly Recommended', rationale: 'Secular growth from cloud computing, AI, and digital transformation continues to drive high-margin, recurring revenue streams.' },
          Aggressive: { recommendation: 'Highly Recommended', rationale: 'A primary area for finding high-growth, disruptive companies that can deliver significant long-term returns.' },
        }
      },
      { 
        name: 'Semiconductors & Semiconductor Equipment', 
        description: 'Producers of semiconductors and the equipment used to manufacture them.', 
        recommendations: {
          Conservative: { recommendation: 'Neutral', rationale: 'While essential, this industry is highly cyclical and volatile, making it less suitable for a primary focus in conservative strategies.' },
          Balanced: { recommendation: 'Recommended', rationale: 'Provides exposure to a key technology growth driver. Its cyclical nature should be balanced within a diversified portfolio.' },
          Growth: { recommendation: 'Recommended', rationale: 'A core component for technology exposure, benefiting from long-term demand in AI, automotive, and IoT.' },
          Aggressive: { recommendation: 'Highly Recommended', rationale: 'Offers high growth potential tied to major secular trends. Cyclical downturns can be viewed as buying opportunities.' },
        }
      },
      { 
        name: 'Technology Hardware & Equipment', 
        description: 'Manufacturers of personal computers, networking equipment, and electronic components.',
        recommendations: {
          Conservative: { recommendation: 'Neutral', rationale: 'Mature markets and cyclical demand make this less stable than other tech sub-sectors like enterprise software.' },
          Balanced: { recommendation: 'Neutral', rationale: 'Can be subject to intense competition and margin pressure. Brand strength is a key factor.' },
          Growth: { recommendation: 'Neutral', rationale: 'Innovation cycles can create opportunities, but market saturation in areas like PCs limits overall growth.' },
          Aggressive: { recommendation: 'Consider Caution', rationale: 'Often lower-margin and more capital-intensive than software, offering less attractive risk/reward for aggressive growth.' },
        }
      },
      { 
        name: 'Cybersecurity', 
        description: 'Companies focused on providing security for computer systems and networks.',
        recommendations: {
          Conservative: { recommendation: 'Recommended', rationale: 'Cybersecurity spending is becoming non-discretionary, providing a defensive quality within the tech sector.' },
          Balanced: { recommendation: 'Highly Recommended', rationale: 'Benefits from a strong, undeniable secular growth trend as cyber threats increase in sophistication.' },
          Growth: { recommendation: 'Highly Recommended', rationale: 'A high-growth area of IT spending. Leading firms are poised for significant expansion.' },
          Aggressive: { recommendation: 'Highly Recommended', rationale: 'Offers exposure to a fast-growing industry with constant innovation and potential for market share disruption.' },
        }
      },
    ],
  },
  {
    sector: 'Health Care',
    industries: [
      { 
        name: 'Pharmaceuticals, Biotechnology & Life Sciences', 
        description: 'Companies involved in the research, development, and production of pharmaceuticals and biotech products.',
        recommendations: {
          Conservative: { recommendation: 'Recommended', rationale: 'Large pharmaceutical companies offer stable demand and dividends, forming a defensive bedrock.' },
          Balanced: { recommendation: 'Recommended', rationale: 'A mix of stable pharma and growth-oriented biotech provides a good balance for this profile.' },
          Growth: { recommendation: 'Highly Recommended', rationale: 'Innovation in biotech and life sciences presents significant long-term growth opportunities.' },
          Aggressive: { recommendation: 'Highly Recommended', rationale: 'Biotechnology in particular offers high-risk, high-reward opportunities based on clinical trial outcomes.' },
        }
      },
      { 
        name: 'Health Care Equipment & Services', 
        description: 'Manufacturers of medical devices and providers of health care services.',
        recommendations: {
          Conservative: { recommendation: 'Highly Recommended', rationale: 'Demand for healthcare is non-cyclical, making this a very stable and defensive sector.' },
          Balanced: { recommendation: 'Highly Recommended', rationale: 'Benefits from demographic tailwinds (aging populations) and consistent demand, offering reliable growth.' },
          Growth: { recommendation: 'Recommended', rationale: 'Provides steady, consistent growth, though perhaps less explosive than successful biotech.' },
          Aggressive: { recommendation: 'Neutral', rationale: 'The growth profile, while steady, may be too slow for an aggressive strategy seeking maximum returns.' },
        }
      },
      { 
        name: 'Health Information Technology', 
        description: 'Companies providing IT solutions for the healthcare industry, including electronic health records and analytics.',
        recommendations: {
          Conservative: { recommendation: 'Neutral', rationale: 'An emerging industry that is less proven than traditional healthcare, introducing more risk.' },
          Balanced: { recommendation: 'Recommended', rationale: 'A growth-oriented segment within a defensive sector, offering a compelling blend of themes.' },
          Growth: { recommendation: 'Highly Recommended', rationale: 'Growing demand for efficiency and data-driven insights in healthcare creates a long-term growth runway.' },
          Aggressive: { recommendation: 'Recommended', rationale: 'A solid growth industry, but may be outpaced by more disruptive tech fields.' },
        }
      },
    ],
  },
  {
    sector: 'Financials',
    industries: [
      { 
        name: 'Financial Technology (FinTech)', 
        description: 'Companies combining financial services with innovative technology.',
        recommendations: {
          Conservative: { recommendation: 'Consider Caution', rationale: 'A disruptive and high-growth area that comes with higher volatility and regulatory risk than traditional financials.' },
          Balanced: { recommendation: 'Recommended', rationale: 'Offers exposure to innovation in a large, established sector. Best represented by profitable, leading companies.' },
          Growth: { recommendation: 'Highly Recommended', rationale: 'High growth potential by disrupting traditional finance. A key area for growth-focused investors.' },
          Aggressive: { recommendation: 'Highly Recommended', rationale: 'An area ripe for finding disruptive companies that are fundamentally changing a massive industry.' },
        }
      },
      { 
        name: 'Banks', 
        description: 'Commercial banks providing a range of financial services.',
        recommendations: {
          Conservative: { recommendation: 'Recommended', rationale: 'Large, well-capitalized banks can provide stability and dividend income, though they are sensitive to the economy.' },
          Balanced: { recommendation: 'Neutral', rationale: 'Performance is closely tied to the economic cycle and interest rates, which can create volatility.' },
          Growth: { recommendation: 'Consider Caution', rationale: 'Generally a mature, slower-growth industry compared to technology or healthcare.' },
          Aggressive: { recommendation: 'Not Recommended', rationale: 'The slow growth and cyclical nature of banking make it a poor fit for an aggressive strategy.' },
        }
      },
    ],
  },
  {
    sector: 'Consumer Discretionary',
    industries: [
        { 
            name: 'Retailing', 
            description: 'Specialty, multiline, and internet-based retailers.',
            recommendations: {
              Conservative: { recommendation: 'Consider Caution', rationale: 'Intensely competitive landscape with low margins and high sensitivity to the economy.' },
              Balanced: { recommendation: 'Neutral', rationale: 'Highly dependent on consumer confidence. Best approached through dominant market leaders.' },
              Growth: { recommendation: 'Recommended', rationale: 'E-commerce leaders continue to have a long runway for growth as retail shifts online.' },
              Aggressive: { recommendation: 'Recommended', rationale: 'Opportunity to find high-growth e-commerce players or turnaround stories in traditional retail.' },
            }
        },
    ]
  },
  {
      sector: 'Consumer Staples',
      industries: [
          {
              name: 'Food, Beverage & Tobacco',
              description: 'Producers of food, drinks, and tobacco products.',
              recommendations: {
                  Conservative: { recommendation: 'Highly Recommended', rationale: 'A classic defensive industry with consistent demand regardless of the economic climate. Provides stability.' },
                  Balanced: { recommendation: 'Recommended', rationale: 'Forms a stable, defensive core for a portfolio, balancing out more cyclical holdings.' },
                  Growth: { recommendation: 'Neutral', rationale: 'Growth is typically slow and steady, which may not meet the objectives of a growth-focused strategy.' },
                  Aggressive: { recommendation: 'Not Recommended', rationale: 'The low-growth, defensive nature of this industry can be a drag on a portfolio seeking high returns.' },
              }
          }
      ]
  },
  {
      sector: 'Utilities',
      industries: [
          {
              name: 'Electric Utilities',
              description: 'Companies that generate and distribute electricity.',
              recommendations: {
                  Conservative: { recommendation: 'Highly Recommended', rationale: 'A classic defensive sector with regulated returns and stable dividends, ideal for capital preservation and income.' },
                  Balanced: { recommendation: 'Recommended', rationale: 'Provides a low-volatility anchor and reliable income stream to a balanced portfolio.' },
                  Growth: { recommendation: 'Consider Caution', rationale: 'The regulated, slow-growth nature of utilities is generally not aligned with growth objectives.' },
                  Aggressive: { recommendation: 'Not Recommended', rationale: 'This sector is among the least likely to produce the high growth sought by aggressive investors.' },
              }
          },
          {
              name: 'Renewable Energy',
              description: 'Companies focused on alternative energy sources like solar and wind.',
              recommendations: {
                  Conservative: { recommendation: 'Neutral', rationale: 'While a growth area, many companies are not yet consistently profitable and can be volatile.' },
                  Balanced: { recommendation: 'Recommended', rationale: 'A way to add a growth theme to a portfolio, positioned to benefit from global decarbonization efforts.' },
                  Growth: { recommendation: 'Highly Recommended', rationale: 'A secular growth industry supported by government incentives and falling costs.' },
                  Aggressive: { recommendation: 'Highly Recommended', rationale: 'Offers high-growth potential, particularly in companies with breakthrough technology or strong project pipelines.' },
              }
          }
      ]
  }
];