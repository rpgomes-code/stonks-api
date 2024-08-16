import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse, ApiOkResponse } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { ParseDatePipe } from '../parseDate.pipe';
import { YahooFinanceService } from './yahooFinance.service';
import { 
  HistoricalDataDTO, 
  InsightsDTO, 
  QuoteDTO, 
  QuoteSummaryDTO, 
  SearchResultDTO, 
  ChartResultDTO, 
  TrendingSymbolsDTO, 
  RecommendationDTO, 
  OptionsDTO,
  StockImageDTO 
} from './yahooFinance.dtos';

@ApiTags('Yahoo Finance')
@Controller('yahoo-finance')
export class YahooFinanceController {
  constructor(private readonly yahooFinanceService: YahooFinanceService) {}

  @ApiOperation({ summary: 'Get historical data for a symbol', description: 'Retrieves historical price and volume data for a given stock symbol' })
  @ApiQuery({ name: 'symbol', type: String, description: 'Stock symbol (e.g., AAPL for Apple Inc.)', example: 'AAPL' })
  @ApiQuery({ name: 'from', type: String, description: 'Start date (YYYY-MM-DD)', example: '2023-01-01' })
  @ApiQuery({ name: 'to', type: String, description: 'End date (YYYY-MM-DD)', example: '2023-12-31' })
  @ApiQuery({ name: 'interval', enum: ['1d', '1wk', '1mo'], required: false, description: 'Data interval' })
  @ApiOkResponse({ description: 'Historical data retrieved successfully', type: [HistoricalDataDTO] })
  @ApiResponse({ status: 404, description: 'Historical data not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
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

  @ApiOperation({ summary: 'Get insights for a symbol', description: 'Retrieves insights and analysis for a given stock symbol' })
  @ApiQuery({ name: 'symbol', type: String, description: 'Stock symbol (e.g., AAPL for Apple Inc.)', example: 'AAPL' })
  @ApiQuery({ name: 'reportsCount', type: Number, required: false, description: 'Number of reports to retrieve' })
  @ApiOkResponse({ description: 'Insights retrieved successfully', type: InsightsDTO })
  @ApiResponse({ status: 404, description: 'Insights not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Throttle({ short: { limit: 10, ttl: 60000 } })
  @Get('insights')
  async getInsights(
    @Query('symbol') symbol: string,
    @Query('reportsCount') reportsCount?: number,
  ) {
    return this.yahooFinanceService.getInsights(symbol, reportsCount);
  }

  @ApiOperation({ summary: 'Get quote for a symbol', description: 'Retrieves current market data for a given stock symbol' })
  @ApiQuery({ name: 'symbol', type: String, description: 'Stock symbol (e.g., AAPL for Apple Inc.)', example: 'AAPL' })
  @ApiOkResponse({ description: 'Quote retrieved successfully', type: QuoteDTO })
  @ApiResponse({ status: 404, description: 'Quote not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Throttle({ default: { limit: 25, ttl: 60000 } })
  @Get('quote')
  async getQuote(@Query('symbol') symbol: string) {
    return this.yahooFinanceService.getQuote(symbol);
  }

  @ApiOperation({ summary: 'Get quote summary for a symbol', description: 'Retrieves a comprehensive summary of data for a given stock symbol' })
  @ApiQuery({ name: 'symbol', type: String, description: 'Stock symbol (e.g., AAPL for Apple Inc.)', example: 'AAPL' })
  @ApiQuery({ name: 'modules', type: String, description: 'Comma-separated list of data modules to retrieve', example: 'assetProfile,financialData' })
  @ApiOkResponse({ description: 'Quote summary retrieved successfully', type: QuoteSummaryDTO })
  @ApiResponse({ status: 404, description: 'Quote summary not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Throttle({ short: { limit: 10, ttl: 60000 } })
  @Get('quote-summary')
  async getQuoteSummary(
    @Query('symbol') symbol: string,
    @Query('modules') modules: string,
  ) {
    return this.yahooFinanceService.getQuoteSummary(symbol, modules.split(','));
  }

  @ApiOperation({ summary: 'Search for symbols', description: 'Searches for stock symbols based on a query string' })
  @ApiQuery({ name: 'query', type: String, description: 'Search query', example: 'Apple' })
  @ApiQuery({ name: 'quotesCount', type: Number, required: false, description: 'Number of quotes to retrieve' })
  @ApiQuery({ name: 'newsCount', type: Number, required: false, description: 'Number of news items to retrieve' })
  @ApiOkResponse({ description: 'Search results retrieved successfully', type: SearchResultDTO })
  @ApiResponse({ status: 404, description: 'No results found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Throttle({ longer: { limit: 70, ttl: 60000 } })
  @Get('search')
  async search(
    @Query('query') query: string,
    @Query('quotesCount') quotesCount?: number,
    @Query('newsCount') newsCount?: number,
  ) {
    return this.yahooFinanceService.search(query, { quotesCount, newsCount });
  }

  @ApiOperation({ summary: 'Get chart data for a symbol', description: 'Retrieves chart data for a given stock symbol' })
  @ApiQuery({ name: 'symbol', type: String, description: 'Stock symbol (e.g., AAPL for Apple Inc.)', example: 'AAPL' })
  @ApiQuery({ name: 'from', type: String, description: 'Start date (YYYY-MM-DD)', example: '2023-01-01' })
  @ApiQuery({ name: 'to', type: String, description: 'End date (YYYY-MM-DD)', example: '2023-12-31' })
  @ApiQuery({ name: 'interval', type: String, required: false, description: 'Data interval' })
  @ApiOkResponse({ description: 'Chart data retrieved successfully', type: ChartResultDTO })
  @ApiResponse({ status: 404, description: 'Chart data not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
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

  @ApiOperation({ summary: 'Get trending symbols', description: 'Retrieves trending stock symbols for a given country' })
  @ApiQuery({ name: 'country', type: String, description: 'Country code (e.g., US for United States)', example: 'US' })
  @ApiQuery({ name: 'count', type: Number, required: false, description: 'Number of trending symbols to retrieve' })
  @ApiOkResponse({ description: 'Trending symbols retrieved successfully', type: TrendingSymbolsDTO })
  @ApiResponse({ status: 404, description: 'Trending symbols not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Throttle({ default: { limit: 25, ttl: 60000 } })
  @Get('trending-symbols')
  async getTrendingSymbols(
    @Query('country') country: string,
    @Query('count') count?: number,
  ) {
    return this.yahooFinanceService.getTrendingSymbols(country, count);
  }

  @ApiOperation({ summary: 'Get recommendations for a symbol', description: 'Retrieves stock recommendations based on a given symbol' })
  @ApiQuery({ name: 'symbol', type: String, description: 'Stock symbol (e.g., AAPL for Apple Inc.)', example: 'AAPL' })
  @ApiOkResponse({ description: 'Recommendations retrieved successfully', type: RecommendationDTO })
  @ApiResponse({ status: 404, description: 'Recommendations not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Throttle({ default: { limit: 25, ttl: 60000 } })
  @Get('recommendations')
  async getRecommendations(@Query('symbol') symbol: string) {
    return this.yahooFinanceService.getRecommendationsBySymbol(symbol);
  }

  @ApiOperation({ summary: 'Get options data for a symbol', description: 'Retrieves options data for a given stock symbol' })
  @ApiQuery({ name: 'symbol', type: String, description: 'Stock symbol (e.g., AAPL for Apple Inc.)', example: 'AAPL' })
  @ApiOkResponse({ description: 'Options data retrieved successfully', type: OptionsDTO })
  @ApiResponse({ status: 404, description: 'Options data not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Throttle({ short: { limit: 10, ttl: 60000 } })
  @Get('options')
  async getOptions(@Query('symbol') symbol: string) {
    return this.yahooFinanceService.getOptions(symbol);
  }

  @ApiOperation({ summary: 'Get stock image for a symbol', description: 'Retrieves the stock image URL for a given stock symbol' })
  @ApiQuery({ name: 'symbol', type: String, description: 'Stock symbol (e.g., AAPL for Apple Inc.)', example: 'AAPL' })
  @ApiOkResponse({ description: 'Stock image URL retrieved successfully', type: StockImageDTO })
  @ApiResponse({ status: 404, description: 'Stock image not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Throttle({ longer: { limit: 70, ttl: 60000 } })
  @Get('stock-image')
  async getStockImage(@Query('symbol') symbol: string) {
    return this.yahooFinanceService.getStockImage(symbol);
  }
}