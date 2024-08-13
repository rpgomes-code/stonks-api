import { Injectable, NotFoundException, InternalServerErrorException, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import https from 'https';
import yahooFinance from 'yahoo-finance2';
import type {
  HistoricalResult,
  InsightsResult,
  QuoteResult,
  QuoteSummaryResult,
  SearchResult,
  ChartResult,
  TrendingSymbolsResult,
  RecommendationResult,
  OptionsResult,
  HistoricalOptions,
  SearchOptions,
  ChartOptions,
  TrendingSymbolsOptions,
  OptionsQueryOptions,
  InsightsQueryOptions,
} from 'yahoo-finance2';

@Injectable()
export class YahooFinanceService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  private async getCachedData<T>(key: string): Promise<T | null> {
    return await this.cacheManager.get<T>(key);
  }

  private async setCachedData(key: string, value: any, ttl: number): Promise<void> {
    await this.cacheManager.set(key, value, ttl);
  }

  async getHistoricalData(symbol: string, from: Date, to: Date, interval?: '1d' | '1wk' | '1mo'): Promise<HistoricalResult[]> {
    const cacheKey = `historical_${symbol}_${from.toISOString()}_${to.toISOString()}_${interval || ''}`;
    const cachedData = await this.getCachedData<HistoricalResult[]>(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    try {
      const options: HistoricalOptions = { period1: from, period2: to, interval };
      const result = await yahooFinance.historical(symbol, options);
      if (!result || result.length === 0) {
        throw new NotFoundException(`Historical data for symbol ${symbol} not found`);
      }
      await this.setCachedData(cacheKey, result, 60 * 60 * 1000); // Cache for 1 hour
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`Failed to fetch historical data: ${error.message}`);
    }
  }

  async getInsights(symbol: string, reportsCount?: number): Promise<InsightsResult> {
    const cacheKey = `insights_${symbol}_${reportsCount || ''}`;
    const cachedData = await this.getCachedData<InsightsResult>(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    try {
      const options: InsightsQueryOptions = { reportsCount };
      const result = await yahooFinance.insights(symbol, options);
      if (!result) {
        throw new NotFoundException(`Insights for symbol ${symbol} not found`);
      }
      await this.setCachedData(cacheKey, result, 30 * 60 * 1000); // Cache for 30 minutes
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`Failed to fetch insights: ${error.message}`);
    }
  }

  async getQuote(symbol: string): Promise<QuoteResult> {
    const cacheKey = `quote_${symbol}`;
    const cachedData = await this.getCachedData<QuoteResult>(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    try {
      const result = await yahooFinance.quote(symbol);
      if (!result) {
        throw new NotFoundException(`Quote for symbol ${symbol} not found`);
      }
      await this.setCachedData(cacheKey, result, 5 * 60 * 1000); // Cache for 5 minutes
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`Failed to fetch quote: ${error.message}`);
    }
  }

  async getQuoteSummary(symbol: string, modules: string[]): Promise<QuoteSummaryResult> {
    const cacheKey = `quote_summary_${symbol}_${modules.join('_')}`;
    const cachedData = await this.getCachedData<QuoteSummaryResult>(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    try {
      const result = await yahooFinance.quoteSummary(symbol, { modules });
      if (!result) {
        throw new NotFoundException(`Quote summary for symbol ${symbol} not found`);
      }
      await this.setCachedData(cacheKey, result, 15 * 60 * 1000); // Cache for 15 minutes
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`Failed to fetch quote summary: ${error.message}`);
    }
  }

  async search(query: string, options?: SearchOptions): Promise<SearchResult> {
    const cacheKey = `search_${query}_${JSON.stringify(options)}`;
    const cachedData = await this.getCachedData<SearchResult>(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    try {
      const result = await yahooFinance.search(query, options);
      if (!result) {
        throw new NotFoundException(`Search results for query ${query} not found`);
      }
      await this.setCachedData(cacheKey, result, 10 * 60 * 1000); // Cache for 10 minutes
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`Failed to perform search: ${error.message}`);
    }
  }

  async getChart(symbol: string, from: Date, to: Date, interval?: string): Promise<ChartResult> {
    const cacheKey = `chart_${symbol}_${from.toISOString()}_${to.toISOString()}_${interval || ''}`;
    const cachedData = await this.getCachedData<ChartResult>(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    try {
      const options: ChartOptions = { period1: from, period2: to, interval };
      const result = await yahooFinance.chart(symbol, options);
      if (!result) {
        throw new NotFoundException(`Chart data for symbol ${symbol} not found`);
      }
      await this.setCachedData(cacheKey, result, 30 * 60 * 1000); // Cache for 30 minutes
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`Failed to fetch chart data: ${error.message}`);
    }
  }

  async getTrendingSymbols(country: string, count?: number): Promise<TrendingSymbolsResult> {
    const cacheKey = `trending_symbols_${country}_${count || ''}`;
    const cachedData = await this.getCachedData<TrendingSymbolsResult>(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    try {
      const options: TrendingSymbolsOptions = { count };
      const result = await yahooFinance.trendingSymbols(country, options);
      if (!result) {
        throw new NotFoundException(`Trending symbols for country ${country} not found`);
      }
      await this.setCachedData(cacheKey, result, 15 * 60 * 1000); // Cache for 15 minutes
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`Failed to fetch trending symbols: ${error.message}`);
    }
  }

  async getRecommendationsBySymbol(symbol: string): Promise<RecommendationResult> {
    const cacheKey = `recommendations_${symbol}`;
    const cachedData = await this.getCachedData<RecommendationResult>(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    try {
      const result = await yahooFinance.recommendationsBySymbol(symbol);
      if (!result) {
        throw new NotFoundException(`Recommendations for symbol ${symbol} not found`);
      }
      await this.setCachedData(cacheKey, result, 60 * 60 * 1000); // Cache for 1 hour
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`Failed to fetch recommendations: ${error.message}`);
    }
  }

  async getOptions(symbol: string): Promise<OptionsResult> {
    const cacheKey = `options_${symbol}`;
    const cachedData = await this.getCachedData<OptionsResult>(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    try {
      const result = await yahooFinance.options(symbol);
      if (!result) {
        throw new NotFoundException(`Options data for symbol ${symbol} not found`);
      }
      await this.setCachedData(cacheKey, result, 30 * 60 * 1000); // Cache for 30 minutes
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`Failed to fetch options data: ${error.message}`);
    }
  }

  async getStockImage(symbol: string): Promise<{ imageUrl: string | null }> {
    const cacheKey = `stock_image_${symbol}`;
    const cachedData = await this.getCachedData<string>(cacheKey);

    if (cachedData) {
      return { imageUrl: cachedData };
    }

    try {
      const imageUrl = await this.validateImageUrl(symbol);
      await this.setCachedData(cacheKey, imageUrl, 24 * 60 * 60 * 1000); // Cache for 24 hours
      return { imageUrl };
    } catch (error) {
      throw new InternalServerErrorException(`Failed to fetch stock image: ${error.message}`);
    }
  }

  private validateImageUrl(symbol: string): Promise<string | null> {
    const urls = [
      `https://financialmodelingprep.com/image-stock/${symbol}.png`,
      `https://storage.googleapis.com/iex/api/logos/${symbol}.png`,
      `https://eodhistoricaldata.com/img/logos/US/${symbol.toLowerCase()}.png`,
      `https://storage.googleapis.com/iexcloud-hl37opg/api/logos/${symbol}.png`,
      `https://static.stocktitan.net/company-logo/${symbol.toLowerCase()}.png`,
      `https://companiesmarketcap.com/img/company-logos/256/${symbol}.png`,
      `https://assets-netstorage.groww.in/intl-stocks/logos/${symbol}.png`,
    ];

    return new Promise((resolve) => {
      const checkUrl = (index: number) => {
        if (index >= urls.length) {
          resolve(null);
          return;
        }

        const url = urls[index];
        https.get(url, (res) => {
          if (res.statusCode === 200) {
            resolve(url);
          } else {
            checkUrl(index + 1);
          }
        }).on('error', () => {
          checkUrl(index + 1);
        });
      };

      checkUrl(0);
    });
  }
}