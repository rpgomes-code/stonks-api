import { Controller, Get, Query } from '@nestjs/common';
import { YahooFinanceService } from './yahooFinance.service';
import { ParseDatePipe } from '../parseDate.pipe';

@Controller('yahoo-finance')
export class YahooFinanceController {
  constructor(private readonly yahooFinanceService: YahooFinanceService) {}

  @Get('historical')
  async getHistoricalData(
    @Query('symbol') symbol: string,
    @Query('from', ParseDatePipe) from: Date,
    @Query('to', ParseDatePipe) to: Date,
    @Query('interval') interval?: '1d' | '1wk' | '1mo',
  ) {
    return this.yahooFinanceService.getHistoricalData(symbol, from, to, interval);
  }

  @Get('insights')
  async getInsights(
    @Query('symbol') symbol: string,
    @Query('reportsCount') reportsCount?: number,
  ) {
    return this.yahooFinanceService.getInsights(symbol, reportsCount);
  }

  @Get('quote')
  async getQuote(@Query('symbol') symbol: string) {
    return this.yahooFinanceService.getQuote(symbol);
  }

  @Get('quote-summary')
  async getQuoteSummary(
    @Query('symbol') symbol: string,
    @Query('modules') modules: string,
  ) {
    return this.yahooFinanceService.getQuoteSummary(symbol, modules.split(','));
  }

  @Get('search')
  async search(
    @Query('query') query: string,
    @Query('quotesCount') quotesCount?: number,
    @Query('newsCount') newsCount?: number,
  ) {
    return this.yahooFinanceService.search(query, { quotesCount, newsCount });
  }

  @Get('chart')
  async getChart(
    @Query('symbol') symbol: string,
    @Query('from', ParseDatePipe) from: Date,
    @Query('to', ParseDatePipe) to: Date,
    @Query('interval') interval?: string,
  ) {
    return this.yahooFinanceService.getChart(symbol, from, to, interval);
  }

  @Get('trending-symbols')
  async getTrendingSymbols(
    @Query('country') country: string,
    @Query('count') count?: number,
  ) {
    return this.yahooFinanceService.getTrendingSymbols(country, count);
  }

  @Get('recommendations')
  async getRecommendations(@Query('symbol') symbol: string) {
    return this.yahooFinanceService.getRecommendationsBySymbol(symbol);
  }

  @Get('options')
  async getOptions(@Query('symbol') symbol: string) {
    return this.yahooFinanceService.getOptions(symbol);
  }

  @Get('stock-image')
  async getStockImage(@Query('symbol') symbol: string) {
    return this.yahooFinanceService.getStockImage(symbol);
  }
}