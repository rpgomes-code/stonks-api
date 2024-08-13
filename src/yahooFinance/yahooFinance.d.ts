declare module 'yahoo-finance2' {
    export interface HistoricalResult {
      date: string;
      open: number;
      high: number;
      low: number;
      close: number;
      adjClose: number;
      volume: number;
    }
  
    export interface HistoricalOptions {
      period1: string | Date;
      period2: string | Date;
      interval?: '1d' | '1wk' | '1mo';
    }
  
    export interface QuoteResult {
      language: string;
      region: string;
      quoteType: string;
      typeDisp: string;
      quoteSourceName: string;
      triggerable: boolean;
      customPriceAlertConfidence: string;
      currency: string;
      marketState: string;
      tradeable: boolean;
      cryptoTradeable: boolean;
      exchange: string;
      shortName: string;
      longName: string;
      messageBoardId: string;
      exchangeTimezoneName: string;
      exchangeTimezoneShortName: string;
      gmtOffSetMilliseconds: number;
      market: string;
      esgPopulated: boolean;
      regularMarketChangePercent: number;
      regularMarketPrice: number;
      firstTradeDateMilliseconds: string;
      priceHint: number;
      regularMarketChange: number;
      regularMarketTime: string;
      regularMarketDayHigh: number;
      regularMarketDayRange: {
        low: number;
        high: number;
      };
      regularMarketDayLow: number;
      regularMarketVolume: number;
      regularMarketPreviousClose: number;
      bid: number;
      ask: number;
      bidSize: number;
      askSize: number;
      fullExchangeName: string;
      financialCurrency: string;
      regularMarketOpen: number;
      averageDailyVolume3Month: number;
      averageDailyVolume10Day: number;
      fiftyTwoWeekLowChange: number;
      fiftyTwoWeekLowChangePercent: number;
      fiftyTwoWeekRange: {
        low: number;
        high: number;
      };
      fiftyTwoWeekHighChange: number;
      fiftyTwoWeekHighChangePercent: number;
      fiftyTwoWeekLow: number;
      fiftyTwoWeekHigh: number;
      fiftyTwoWeekChangePercent: number;
      dividendDate?: string;
      earningsTimestamp?: string;
      earningsTimestampStart?: string;
      earningsTimestampEnd?: string;
      earningsCallTimestampStart?: number;
      earningsCallTimestampEnd?: number;
      isEarningsDateEstimate?: boolean;
      trailingAnnualDividendRate?: number;
      trailingPE?: number;
      dividendRate?: number;
      trailingAnnualDividendYield?: number;
      dividendYield?: number;
      epsTrailingTwelveMonths?: number;
      epsForward?: number;
      epsCurrentYear?: number;
      priceEpsCurrentYear?: number;
      sharesOutstanding?: number;
      bookValue?: number;
      fiftyDayAverage?: number;
      fiftyDayAverageChange?: number;
      fiftyDayAverageChangePercent?: number;
      twoHundredDayAverage?: number;
      twoHundredDayAverageChange?: number;
      twoHundredDayAverageChangePercent?: number;
      marketCap?: number;
      forwardPE?: number;
      priceToBook?: number;
      sourceInterval?: number;
      exchangeDataDelayedBy?: number;
      averageAnalystRating?: string;
      hasPrePostMarketData?: boolean;
      displayName?: string;
      symbol: string;
    }

    export interface QuoteSummaryResult {
        assetProfile: {
          address1: string;
          city: string;
          state: string;
          zip: string;
          country: string;
          phone: string;
          website: string;
          industry: string;
          industryKey: string;
          industryDisp: string;
          sector: string;
          sectorKey: string;
          sectorDisp: string;
          longBusinessSummary: string;
          fullTimeEmployees: number;
          companyOfficers: Array<{
            maxAge: number;
            name: string;
            age?: number;
            title: string;
            yearBorn?: number;
            fiscalYear?: number;
            totalPay?: number;
            exercisedValue: number;
            unexercisedValue: number;
          }>;
          auditRisk: number;
          boardRisk: number;
          compensationRisk: number;
          shareHolderRightsRisk: number;
          overallRisk: number;
          governanceEpochDate: string;
          compensationAsOfEpochDate: string;
          maxAge: number;
        };
        recommendationTrend: {
          trend: Array<{
            period: string;
            strongBuy: number;
            buy: number;
            hold: number;
            sell: number;
            strongSell: number;
          }>;
          maxAge: number;
        };
        cashflowStatementHistory: {
          cashflowStatements: Array<{
            maxAge: number;
            endDate: string;
            netIncome: number;
          }>;
          maxAge: number;
        };
        indexTrend: {
          maxAge: number;
          symbol: string;
          peRatio: number;
          pegRatio: number;
          estimates: Array<{
            period: string;
            growth: number;
          }>;
        };
        defaultKeyStatistics: {
          maxAge: number;
          priceHint: number;
          enterpriseValue: number;
          forwardPE: number;
          profitMargins: number;
          floatShares: number;
          sharesOutstanding: number;
          sharesShort: number;
          sharesShortPriorMonth: string;
          sharesShortPreviousMonthDate: string;
          dateShortInterest: string;
          sharesPercentSharesOut: number;
          heldPercentInsiders: number;
          heldPercentInstitutions: number;
          shortRatio: number;
          shortPercentOfFloat: number;
          beta: number;
          impliedSharesOutstanding: number;
          bookValue: number;
          priceToBook: number;
          lastFiscalYearEnd: string;
          nextFiscalYearEnd: string;
          mostRecentQuarter: string;
          earningsQuarterlyGrowth: number;
          netIncomeToCommon: number;
          trailingEps: number;
          forwardEps: number;
          pegRatio: number;
          lastSplitFactor: string;
          lastSplitDate: number;
          enterpriseToRevenue: number;
          enterpriseToEbitda: number;
          '52WeekChange': number;
          SandP52WeekChange: number;
          lastDividendValue: number;
          lastDividendDate: string;
        };
        industryTrend: {
          maxAge: number;
          symbol: null;
          estimates: any[];
        };
        quoteType: {
          exchange: string;
          quoteType: string;
          symbol: string;
          underlyingSymbol: string;
          shortName: string;
          longName: string;
          firstTradeDateEpochUtc: string;
          timeZoneFullName: string;
          timeZoneShortName: string;
          uuid: string;
          messageBoardId: string;
          gmtOffSetMilliseconds: number;
          maxAge: number;
        };
        incomeStatementHistory: {
          incomeStatementHistory: Array<{
            maxAge: number;
            endDate: string;
            totalRevenue: number;
            netIncome: number;
          }>;
          maxAge: number;
        };
        fundOwnership: {
          maxAge: number;
          ownershipList: Array<{
            maxAge: number;
            reportDate: string;
            organization: string;
            pctHeld: number;
            position: number;
            value: number;
            pctChange: number;
          }>;
        };
        summaryDetail: {
          maxAge: number;
          priceHint: number;
          previousClose: number;
          open: number;
          dayLow: number;
          dayHigh: number;
          regularMarketPreviousClose: number;
          regularMarketOpen: number;
          regularMarketDayLow: number;
          regularMarketDayHigh: number;
          dividendRate: number;
          dividendYield: number;
          exDividendDate: string;
          payoutRatio: number;
          fiveYearAvgDividendYield: number;
          beta: number;
          trailingPE: number;
          forwardPE: number;
          volume: number;
          regularMarketVolume: number;
          averageVolume: number;
          averageVolume10days: number;
          averageDailyVolume10Day: number;
          bid: number;
          ask: number;
          bidSize: number;
          askSize: number;
          marketCap: number;
          fiftyTwoWeekLow: number;
          fiftyTwoWeekHigh: number;
          priceToSalesTrailing12Months: number;
          fiftyDayAverage: number;
          twoHundredDayAverage: number;
          trailingAnnualDividendRate: number;
          trailingAnnualDividendYield: number;
          currency: string;
          fromCurrency: null;
          toCurrency: null;
          lastMarket: null;
          coinMarketCapLink: null;
          algorithm: null;
          tradeable: boolean;
        };
        insiderHolders: {
          holders: Array<{
            maxAge: number;
            name: string;
            relation: string;
            url: string;
            transactionDescription: string;
            latestTransDate: string;
            positionDirect?: number;
            positionDirectDate?: string;
            positionIndirect?: number;
            positionIndirectDate?: string;
          }>;
          maxAge: number;
        };
        calendarEvents: {
          maxAge: number;
          earnings: {
            earningsDate: string[];
            earningsAverage: number;
            earningsLow: number;
            earningsHigh: number;
            revenueAverage: number;
            revenueLow: number;
            revenueHigh: number;
          };
          exDividendDate: string;
          dividendDate: string;
        };
        upgradeDowngradeHistory: {
          history: Array<{
            epochGradeDate: string;
            firm: string;
            toGrade: string;
            fromGrade: string;
            action: string;
          }>;
          maxAge: number;
        };
        price: {
          maxAge: number;
          preMarketSource: string;
          regularMarketChangePercent: number;
          regularMarketChange: number;
          regularMarketTime: string;
          priceHint: number;
          regularMarketPrice: number;
          regularMarketDayHigh: number;
          regularMarketDayLow: number;
          regularMarketVolume: number;
          averageDailyVolume10Day: number;
          averageDailyVolume3Month: number;
          regularMarketPreviousClose: number;
          regularMarketSource: string;
          regularMarketOpen: number;
          exchange: string;
          exchangeName: string;
          exchangeDataDelayedBy: number;
          marketState: string;
          quoteType: string;
          symbol: string;
          underlyingSymbol: null;
          shortName: string;
          longName: string;
          currency: string;
          quoteSourceName: string;
          currencySymbol: string;
          fromCurrency: null;
          toCurrency: null;
          lastMarket: null;
          marketCap: number;
        };
        balanceSheetHistory: {
          balanceSheetStatements: Array<{
            maxAge: number;
            endDate: string;
          }>;
          maxAge: number;
        };
        earningsTrend: {
          trend: Array<{
            maxAge: number;
            period: string;
            endDate: string;
            growth: number;
            earningsEstimate: {
              avg: number;
              low: number;
              high: number;
              yearAgoEps: number;
              numberOfAnalysts: number;
              growth: number;
            };
            revenueEstimate: {
              avg: number;
              low: number;
              high: number;
              numberOfAnalysts: number;
              yearAgoRevenue: number;
              growth: number;
            };
            epsTrend: {
              current: number;
              '7daysAgo': number;
              '30daysAgo': number;
              '60daysAgo': number;
              '90daysAgo': number;
            };
            epsRevisions: {
              upLast7days: number;
              upLast30days: number;
              downLast30days: number;
            };
          }>;
          maxAge: number;
        };
        majorHoldersBreakdown: {
          maxAge: number;
          insidersPercentHeld: number;
          institutionsPercentHeld: number;
          institutionsFloatPercentHeld: number;
          institutionsCount: number;
        };
        balanceSheetHistoryQuarterly: {
          balanceSheetStatements: Array<{
            maxAge: number;
            endDate: string;
          }>;
          maxAge: number;
        };
        earningsHistory: {
          history: Array<{
            maxAge: number;
            epsActual: number;
            epsEstimate: number;
            epsDifference: number;
            surprisePercent: number;
            quarter: string;
            period: string;
          }>;
          maxAge: number;
        };
        majorDirectHolders: {
          holders: any[];
          maxAge: number;
        };
        summaryProfile: {
          address1: string;
          city: string;
          state: string;
          zip: string;
          country: string;
          phone: string;
          website: string;
          industry: string;
          industryKey: string;
          industryDisp: string;
          sector: string;
          sectorKey: string;
          sectorDisp: string;
          longBusinessSummary: string;
          fullTimeEmployees: number;
          companyOfficers: any[];
          maxAge: number;
        };
        netSharePurchaseActivity: {
          maxAge: number;
          period: string;
          buyInfoCount: number;
          buyInfoShares: number;
          buyPercentInsiderShares: number;
          sellInfoCount: number;
          sellInfoShares: number;
          sellPercentInsiderShares: number;
          netInfoCount: number;
          netInfoShares: number;
          netPercentInsiderShares: number;
          totalInsiderShares: number;
        };
        insiderTransactions: {
          transactions: Array<{
            maxAge: number;
            shares: number;
            value?: number;
            filerUrl: string;
            transactionText: string;
            filerName: string;
            filerRelation: string;
            moneyText: string;
            startDate: string;
            ownership: string;
          }>;
        };
        sectorTrend: {
          maxAge: number;
          symbol: null;
          estimates: any[];
        };
        incomeStatementHistoryQuarterly: {
          incomeStatementHistory: Array<{
            maxAge: number;
            endDate: string;
            totalRevenue: number;
            netIncome: number;
          }>;
          maxAge: number;
        };
        cashflowStatementHistoryQuarterly: {
          cashflowStatements: Array<{
            maxAge: number;
            endDate: string;
            netIncome: number;
          }>;
          maxAge: number;
        };
        earnings: {
          maxAge: number;
          earningsChart: {
            quarterly: Array<{
              date: string;
              actual: number;
              estimate: number;
            }>;
            currentQuarterEstimate: number;
            currentQuarterEstimateDate: string;
            currentQuarterEstimateYear: number;
            earningsDate: string[];
          };
          financialsChart: {
            yearly: Array<{
              date: number;
              revenue: number;
              earnings: number;
            }>;
            quarterly: Array<{
              date: string;
              revenue: number;
              earnings: number;
            }>;
          };
          financialCurrency: string;
        };
        financialData: {
          maxAge: number;
          currentPrice: number;
          targetHighPrice: number;
          targetLowPrice: number;
          targetMeanPrice: number;
          targetMedianPrice: number;
          recommendationMean: number;
          recommendationKey: string;
          numberOfAnalystOpinions: number;
          totalCash: number;
          totalCashPerShare: number;
          ebitda: number;
          totalDebt: number;
          quickRatio: number;
          currentRatio: number;
          totalRevenue: number;
          debtToEquity: number;
          revenuePerShare: number;
          returnOnAssets: number;
          returnOnEquity: number;
          freeCashflow: number;
          operatingCashflow: number;
          earningsGrowth: number;
          revenueGrowth: number;
          grossMargins: number;
          ebitdaMargins: number;
          operatingMargins: number;
          profitMargins: number;
          financialCurrency: string;
        };
      }
  
    export interface QuoteSummaryOptions {
        modules: string | string[];
      }
    
      export interface SearchResult {
        quotes: Array<{
          exchange: string;
          shortname: string;
          quoteType: string;
          symbol: string;
          index: string;
          score: number;
          typeDisp: string;
          longname: string;
          isYahooFinance: boolean;
        }>;
        news: Array<{
          uuid: string;
          title: string;
          publisher: string;
          link: string;
          providerPublishTime: number;
          type: string;
        }>;
        nav: Array<{
          name: string;
          longName: string;
          isYahooFinance: boolean;
        }>;
        lists: Array<{
          name: string;
          longName: string;
          isYahooFinance: boolean;
        }>;
        researchReports: Array<{
          id: string;
          title: string;
          provider: string;
          publishedDate: string;
          url: string;
        }>;
        totalTime: number;
        timeTakenForQuotes: number;
        timeTakenForNews: number;
        timeTakenForAlgowatchlist: number;
        timeTakenForPredefinedScreener: number;
        timeTakenForCrunchbase: number;
        timeTakenForNav: number;
        timeTakenForResearchReports: number;
      }
    
      export interface SearchOptions {
        quotesCount?: number;
        newsCount?: number;
        enableFuzzyQuery?: boolean;
        quotesQueryId?: string;
        multiQuoteQueryId?: string;
        newsQueryId?: string;
        enableCb?: boolean;
        enableNavLinks?: boolean;
        enableEnhancedTrivialQuery?: boolean;
      }
    
      export interface ChartResult {
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
            pre: {
              timezone: string;
              start: number;
              end: number;
              gmtoffset: number;
            };
            regular: {
              timezone: string;
              start: number;
              end: number;
              gmtoffset: number;
            };
            post: {
              timezone: string;
              start: number;
              end: number;
              gmtoffset: number;
            };
          };
          dataGranularity: string;
          range: string;
          validRanges: string[];
        };
        timestamp: number[];
        indicators: {
          quote: Array<{
            high: number[];
            open: number[];
            low: number[];
            close: number[];
            volume: number[];
          }>;
          adjclose?: Array<{
            adjclose: number[];
          }>;
        };
      }
    
      export interface ChartOptions {
        period1: Date | string | number;
        period2: Date | string | number;
        useYfid?: boolean;
        interval?: string;
        includePrePost?: boolean;
        events?: string;
        lang?: string;
        return?: string;
        numberOfPoints?: number;
        formatBy?: string;
        range?: string;
      }

      export interface TrendingSymbolsOptions {
        count?: number;
        lang?: string;
        region?: string;
      }
    
      export interface TrendingSymbolsResult {
        count: number;
        quotes: Array<{
          symbol: string;
        }>;
        jobTimestamp: number;
        startInterval: number;
      }

      export interface RecommendedSymbol {
        symbol: string;
        score: number;
      }
    
      export interface RecommendationResult {
        symbol: string;
        recommendedSymbols: RecommendedSymbol[];
      }

      export interface OptionsQueryOptions {
        lang?: string;
        formatted?: boolean;
        region?: string;
      }
    
      export interface OptionsResult {
        underlyingSymbol: string;
        expirationDates: Date[];
        strikes: number[];
        hasMiniOptions: boolean;
        quote: {
          language: string;
          region: string;
          quoteType: string;
          quoteSourceName: string;
          triggerable: boolean;
          currency: string;
          firstTradeDateMilliseconds: Date;
          exchange: string;
          shortName: string;
          longName: string;
          messageBoardId: string;
          exchangeTimezoneName: string;
          exchangeTimezoneShortName: string;
          gmtOffSetMilliseconds: number;
          market: string;
          esgPopulated: boolean;
          marketState: string;
          regularMarketChangePercent: number;
          regularMarketPrice: number;
          regularMarketTime: number;
          regularMarketChange: number;
          regularMarketOpen: number;
          regularMarketDayHigh: number;
          regularMarketDayLow: number;
          regularMarketVolume: number;
          regularMarketPreviousClose: number;
          bid: number;
          ask: number;
          bidSize: number;
          askSize: number;
          fullExchangeName: string;
          financialCurrency: string;
          regularMarketOpen: number;
          averageDailyVolume3Month: number;
          averageDailyVolume10Day: number;
          fiftyTwoWeekLowChange: number;
          fiftyTwoWeekLowChangePercent: number;
          fiftyTwoWeekRange: { low: number; high: number };
          fiftyTwoWeekHighChange: number;
          fiftyTwoWeekHighChangePercent: number;
          fiftyTwoWeekLow: number;
          fiftyTwoWeekHigh: number;
          earningsTimestamp: Date;
          earningsTimestampStart: Date;
          earningsTimestampEnd: Date;
          trailingAnnualDividendRate?: number;
          trailingPE?: number;
          trailingAnnualDividendYield?: number;
          epsTrailingTwelveMonths?: number;
          epsForward?: number;
          epsCurrentYear?: number;
          priceEpsCurrentYear?: number;
          sharesOutstanding?: number;
          bookValue?: number;
          fiftyDayAverage?: number;
          fiftyDayAverageChange?: number;
          fiftyDayAverageChangePercent?: number;
          twoHundredDayAverage?: number;
          twoHundredDayAverageChange?: number;
          twoHundredDayAverageChangePercent?: number;
          marketCap?: number;
          forwardPE?: number;
          priceToBook?: number;
          sourceInterval?: number;
          exchangeDataDelayedBy?: number;
          pageViews?: {
            shortTermTrend: string;
            midTermTrend: string;
            longTermTrend: string;
            maxAge: number;
          };
          averageAnalystRating?: string;
          tradeable: boolean;
          cryptoTradeable?: boolean;
          symbol: string;
        };
        options: Array<{
          expirationDate: Date;
          hasMiniOptions: boolean;
          calls: Array<{
            contractSymbol: string;
            strike: number;
            currency: string;
            lastPrice: number;
            change: number;
            percentChange: number;
            volume: number;
            openInterest: number;
            bid: number;
            ask: number;
            contractSize: string;
            expiration: Date;
            lastTradeDate: Date;
            impliedVolatility: number;
            inTheMoney: boolean;
          }>;
          puts: Array<{
            contractSymbol: string;
            strike: number;
            currency: string;
            lastPrice: number;
            change: number;
            percentChange: number;
            volume: number;
            openInterest: number;
            bid: number;
            ask: number;
            contractSize: string;
            expiration: Date;
            lastTradeDate: Date;
            impliedVolatility: number;
            inTheMoney: boolean;
          }>;
        }>;
      }

      export interface InsightsQueryOptions {
        lang?: string;
        reportsCount?: number;
        region?: string;
      }
    
      export interface InsightsResult {
        symbol: string;
        instrumentInfo?: {
          technicalEvents?: {
            provider: string;
            sector: string;
            shortTermOutlook: {
              stateDescription: string;
              direction: string;
              score: number;
              scoreDescription: string;
              sectorDirection: string;
              sectorScore: number;
              sectorScoreDescription: string;
              indexDirection: string;
              indexScore: number;
              indexScoreDescription: string;
            };
            intermediateTermOutlook: {
              stateDescription: string;
              direction: string;
              score: number;
              scoreDescription: string;
              sectorDirection: string;
              sectorScore: number;
              sectorScoreDescription: string;
              indexDirection: string;
              indexScore: number;
              indexScoreDescription: string;
            };
            longTermOutlook: {
              stateDescription: string;
              direction: string;
              score: number;
              scoreDescription: string;
              sectorDirection: string;
              sectorScore: number;
              sectorScoreDescription: string;
              indexDirection: string;
              indexScore: number;
              indexScoreDescription: string;
            };
          };
          keyTechnicals?: {
            provider: string;
            support: number;
            resistance: number;
            stopLoss: number;
          };
          valuation?: {
            color: number;
            description: string;
            discount?: string;
            provider: string;
          };
        };
        companySnapshot?: {
          sectorInfo: string;
          company: {
            innovativeness: number;
            hiring: number;
            insiderSentiments: number;
            earningsReports: number;
          };
          sector: {
            innovativeness: number;
            hiring: number;
            sustainability: number;
            insiderSentiments: number;
            earningsReports: number;
            dividends: number;
          };
        };
        recommendation?: {
          targetPrice: number;
          provider: string;
          rating: string;
        };
        events?: Array<{
          eventType: string;
          pricePeriod: string;
          tradingHorizon: string;
          tradeType: string;
          imageUrl: string;
          startDate: Date;
          endDate: Date;
        }>;
        reports?: Array<{
          id: string;
          headHtml: string;
          provider: string;
          reportDate: string;
          reportTitle: string;
          reportType: string;
        }>;
        sigDevs?: Array<{
          headline: string;
          date: Date;
        }>;
      }
    
      export function historical(symbol: string, options: HistoricalOptions): Promise<HistoricalResult[]>;
      export function quote(symbol: string): Promise<QuoteResult>;
      export function quote(symbols: string[]): Promise<QuoteResult[]>;
      export function quoteSummary(symbol: string, options: QuoteSummaryOptions): Promise<QuoteSummaryResult>;
      export function search(query: string, options?: SearchOptions): Promise<SearchResult>;
      export function chart(symbol: string, options?: ChartOptions): Promise<ChartResult>;
      export function trendingSymbols(country: string, options?: TrendingSymbolsOptions): Promise<TrendingSymbolsResult>;
      export function recommendationsBySymbol(symbol: string): Promise<RecommendationResult>;
      export function recommendationsBySymbol(symbols: string[]): Promise<RecommendationResult[]>;
      export function options(symbol: string, options?: OptionsQueryOptions): Promise<OptionsResult>;
      export function insights(symbol: string, options?: InsightsQueryOptions): Promise<InsightsResult>;
      export function quoteCombine(symbol: string): Promise<QuoteResult>;
      export function quoteCombine(symbol: string, options?: { fields: string[] }): Promise<QuoteResult>;
    
      const yahooFinance: {
        historical: typeof historical;
        quote: typeof quote;
        quoteSummary: typeof quoteSummary;
        search: typeof search;
        chart: typeof chart;
        insights: typeof insights;
        recommendationsBySymbol: typeof recommendationsBySymbol;
        trendingSymbols: typeof trendingSymbols;
        quoteCombine: typeof quoteCombine;
        options: typeof options;
      };
    
      export default yahooFinance;
    }