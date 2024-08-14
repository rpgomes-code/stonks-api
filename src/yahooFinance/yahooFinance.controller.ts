import { Controller, Get, Query } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ParseDatePipe } from '../parseDate.pipe';
import { YahooFinanceService } from './yahooFinance.service';

@Controller('yahoo-finance')
export class YahooFinanceController {
  constructor(private readonly yahooFinanceService: YahooFinanceService) {}

  @Throttle({ default: { limit: 25, ttl: 60000 } })
  @Get('historical')
  async getHistoricalData(
    @Query('symbol') symbol: string,
    @Query('from', ParseDatePipe) from: Date,
    @Query('to', ParseDatePipe) to: Date,
    @Query('interval') interval?: '1d' | '1wk' | '1mo',
  ) {
    return this.yahooFinanceService.getHistoricalData(symbol, from, to, interval);
  }

  @Throttle({ short: { limit: 10, ttl: 60000 } })
  @Get('insights')
  async getInsights(
    @Query('symbol') symbol: string,
    @Query('reportsCount') reportsCount?: number,
  ) {
    return this.yahooFinanceService.getInsights(symbol, reportsCount);
  }

  @Throttle({ default: { limit: 25, ttl: 60000 } })
  @Get('quote')
  async getQuote(@Query('symbol') symbol: string) {
    return this.yahooFinanceService.getQuote(symbol);
  }

  @Throttle({ short: { limit: 10, ttl: 60000 } })
  @Get('quote-summary')
  async getQuoteSummary(
    @Query('symbol') symbol: string,
    @Query('modules') modules: string,
  ) {
    return this.yahooFinanceService.getQuoteSummary(symbol, modules.split(','));
  }

  @Throttle({ longer: { limit: 70, ttl: 60000 } })
  @Get('search')
  async search(
    @Query('query') query: string,
    @Query('quotesCount') quotesCount?: number,
    @Query('newsCount') newsCount?: number,
  ) {
    return this.yahooFinanceService.search(query, { quotesCount, newsCount });
  }

  @Throttle({ short: { limit: 10, ttl: 60000 } })
  @Get('chart')
  async getChart(
    @Query('symbol') symbol: string,
    @Query('from', ParseDatePipe) from: Date,
    @Query('to', ParseDatePipe) to: Date,
    @Query('interval') interval?: string,
  ) {
    return this.yahooFinanceService.getChart(symbol, from, to, interval);
  }

  @Throttle({ default: { limit: 25, ttl: 60000 } })
  @Get('trending-symbols')
  async getTrendingSymbols(
    @Query('country') country: string,
    @Query('count') count?: number,
  ) {
    return this.yahooFinanceService.getTrendingSymbols(country, count);
  }

  @Throttle({ default: { limit: 25, ttl: 60000 } })
  @Get('recommendations')
  async getRecommendations(@Query('symbol') symbol: string) {
    return this.yahooFinanceService.getRecommendationsBySymbol(symbol);
  }

  @Throttle({ short: { limit: 10, ttl: 60000 } })
  @Get('options')
  async getOptions(@Query('symbol') symbol: string) {
    return this.yahooFinanceService.getOptions(symbol);
  }

  @Throttle({ longer: { limit: 70, ttl: 60000 } })
  @Get('stock-image')
  async getStockImage(@Query('symbol') symbol: string) {
    return this.yahooFinanceService.getStockImage(symbol);
  }
}