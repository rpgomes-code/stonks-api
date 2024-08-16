import { ApiProperty } from '@nestjs/swagger';

export class HistoricalDataDTO {
  @ApiProperty({ description: 'The date of the data point', example: '2023-01-01' })
  date: string;

  @ApiProperty({ description: 'The opening price', example: 150.23 })
  open: number;

  @ApiProperty({ description: 'The highest price of the day', example: 152.85 })
  high: number;

  @ApiProperty({ description: 'The lowest price of the day', example: 149.56 })
  low: number;

  @ApiProperty({ description: 'The closing price', example: 151.73 })
  close: number;

  @ApiProperty({ description: 'The adjusted closing price', example: 151.73 })
  adjClose: number;

  @ApiProperty({ description: 'The trading volume', example: 1000000 })
  volume: number;
}

export class InsightsDTO {
  @ApiProperty({ description: 'The stock symbol', example: 'AAPL' })
  symbol: string;

  @ApiProperty({ description: 'Technical analysis insights' })
  instrumentInfo: {
    technicalEvents: {
      shortTerm: string;
      midTerm: string;
      longTerm: string;
    };
    keyTechnicals: {
      support: number;
      resistance: number;
    };
    valuation: {
      color: number;
      description: string;
      discount: string;
    };
  };

  @ApiProperty({ description: 'Company snapshot information' })
  companySnapshot: {
    sectorInfo: string;
    company: {
      innovativeness: number;
      hiring: number;
      sustainability: number;
      insiderSentiments: number;
      earningsReports: number;
      dividends: number;
    };
  };

  @ApiProperty({ description: 'Analyst recommendations' })
  recommendation: {
    targetPrice: number;
    provider: string;
    rating: string;
  };
}

export class QuoteDTO {
  @ApiProperty({ description: 'The stock symbol', example: 'AAPL' })
  symbol: string;

  @ApiProperty({ description: 'The current market price', example: 150.25 })
  regularMarketPrice: number;

  @ApiProperty({ description: 'The price change', example: 2.5 })
  regularMarketChange: number;

  @ApiProperty({ description: 'The price change percentage', example: 1.69 })
  regularMarketChangePercent: number;

  @ApiProperty({ description: 'The market cap', example: 2500000000000 })
  marketCap: number;

  @ApiProperty({ description: 'The trading volume', example: 100000000 })
  regularMarketVolume: number;

  @ApiProperty({ description: 'The 52-week high', example: 180.5 })
  fiftyTwoWeekHigh: number;

  @ApiProperty({ description: 'The 52-week low', example: 120.75 })
  fiftyTwoWeekLow: number;
}

export class QuoteSummaryDTO {
  @ApiProperty({ description: 'Company profile information' })
  assetProfile: {
    address1: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
    website: string;
    industry: string;
    sector: string;
    longBusinessSummary: string;
    fullTimeEmployees: number;
    companyOfficers: Array<{
      name: string;
      title: string;
      yearBorn: number;
    }>;
  };

  @ApiProperty({ description: 'Financial data' })
  financialData: {
    currentPrice: number;
    targetHighPrice: number;
    targetLowPrice: number;
    targetMeanPrice: number;
    recommendationMean: number;
    recommendationKey: string;
    numberOfAnalystOpinions: number;
    totalCash: number;
    totalDebt: number;
    totalRevenue: number;
    totalCashPerShare: number;
    revenuePerShare: number;
    returnOnAssets: number;
    returnOnEquity: number;
    grossProfits: number;
    freeCashflow: number;
    operatingCashflow: number;
    earningsGrowth: number;
    revenueGrowth: number;
    grossMargins: number;
    ebitdaMargins: number;
    operatingMargins: number;
    profitMargins: number;
  };
}

export class SearchResultDTO {
  @ApiProperty({ description: 'List of matching quotes', type: [QuoteDTO] })
  quotes: QuoteDTO[];

  @ApiProperty({ description: 'List of related news items' })
  news: Array<{
    uuid: string;
    title: string;
    publisher: string;
    link: string;
    providerPublishTime: number;
    type: string;
  }>;
}

export class ChartResultDTO {
  @ApiProperty({ description: 'Meta information about the chart' })
  meta: {
    currency: string;
    symbol: string;
    exchangeName: string;
    instrumentType: string;
    firstTradeDate: number;
    regularMarketTime: number;
    gmtoffset: number;
    timezone: string;
    exchangeTimezoneName: string;
    regularMarketPrice: number;
    chartPreviousClose: number;
    priceHint: number;
    currentTradingPeriod: {
      pre: { timezone: string; start: number; end: number; gmtoffset: number };
      regular: { timezone: string; start: number; end: number; gmtoffset: number };
      post: { timezone: string; start: number; end: number; gmtoffset: number };
    };
    dataGranularity: string;
    range: string;
    validRanges: string[];
  };

  @ApiProperty({ description: 'Timestamp array for the chart data points', type: [Number] })
  timestamp: number[];

  @ApiProperty({ description: 'Indicators data for the chart' })
  indicators: {
    quote: Array<{
      high: number[];
      open: number[];
      low: number[];
      close: number[];
      volume: number[];
    }>;
  };
}

export class TrendingSymbolsDTO {
  @ApiProperty({ description: 'Count of trending symbols', example: 5 })
  count: number;

  @ApiProperty({ description: 'List of trending symbols', type: [String] })
  quotes: string[];

  @ApiProperty({ description: 'Timestamp of the job', example: 1625097600000 })
  jobTimestamp: number;

  @ApiProperty({ description: 'Start interval', example: 1625097600000 })
  startInterval: number;
}

export class RecommendationDTO {
  @ApiProperty({ description: 'The stock symbol', example: 'AAPL' })
  symbol: string;

  @ApiProperty({ description: 'List of recommended symbols' })
  recommendedSymbols: Array<{
    symbol: string;
    score: number;
  }>;
}

export class OptionDTO {
  @ApiProperty({ description: 'The contract symbol', example: 'AAPL230917C00150000' })
  contractSymbol: string;

  @ApiProperty({ description: 'The strike price', example: 150 })
  strike: number;

  @ApiProperty({ description: 'The currency', example: 'USD' })
  currency: string;

  @ApiProperty({ description: 'The last price', example: 5.65 })
  lastPrice: number;

  @ApiProperty({ description: 'The change in price', example: 0.15 })
  change: number;

  @ApiProperty({ description: 'The percent change', example: 2.73 })
  percentChange: number;

  @ApiProperty({ description: 'The volume', example: 1000 })
  volume: number;

  @ApiProperty({ description: 'The open interest', example: 5000 })
  openInterest: number;

  @ApiProperty({ description: 'The bid price', example: 5.60 })
  bid: number;

  @ApiProperty({ description: 'The ask price', example: 5.70 })
  ask: number;

  @ApiProperty({ description: 'The contract size', example: 'REGULAR' })
  contractSize: string;

  @ApiProperty({ description: 'The expiration date', example: '2023-09-17' })
  expiration: Date;

  @ApiProperty({ description: 'The last trade date', example: '2023-06-16' })
  lastTradeDate: Date;

  @ApiProperty({ description: 'The implied volatility', example: 0.3 })
  impliedVolatility: number;

  @ApiProperty({ description: 'Whether the option is in the money', example: true })
  inTheMoney: boolean;
}

export class OptionsDTO {
  @ApiProperty({ description: 'The underlying stock symbol', example: 'AAPL' })
  underlyingSymbol: string;

  @ApiProperty({ description: 'List of expiration dates', type: [Date] })
  expirationDates: Date[];

  @ApiProperty({ description: 'List of available strikes', type: [Number] })
  strikes: number[];

  @ApiProperty({ description: 'Whether the stock has mini options', example: false })
  hasMiniOptions: boolean;

  @ApiProperty({ description: 'Quote data for the underlying stock' })
  quote: QuoteDTO;

  @ApiProperty({ description: 'List of options data' })
  options: Array<{
    expirationDate: Date;
    hasMiniOptions: boolean;
    calls: OptionDTO[];
    puts: OptionDTO[];
  }>;
}

export class StockImageDTO {
  @ApiProperty({ description: 'URL of the stock image', example: 'https://example.com/stock-images/AAPL.png' })
  imageUrl: string | null;
}