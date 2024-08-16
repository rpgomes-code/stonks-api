import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('YahooFinanceController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/yahoo-finance/historical (GET)', () => {
    return request(app.getHttpServer())
      .get('/yahoo-finance/historical')
      .query({ symbol: 'AAPL', from: '2023-01-01', to: '2023-12-31' })
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]).toHaveProperty('date');
        expect(res.body[0]).toHaveProperty('open');
        expect(res.body[0]).toHaveProperty('high');
        expect(res.body[0]).toHaveProperty('low');
        expect(res.body[0]).toHaveProperty('close');
      });
  });

  it('/yahoo-finance/insights (GET)', () => {
    return request(app.getHttpServer())
      .get('/yahoo-finance/insights')
      .query({ symbol: 'AAPL' })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('symbol', 'AAPL');
        expect(res.body).toHaveProperty('instrumentInfo');
        expect(res.body).toHaveProperty('companySnapshot');
      });
  });

  it('/yahoo-finance/quote (GET)', () => {
    return request(app.getHttpServer())
      .get('/yahoo-finance/quote')
      .query({ symbol: 'AAPL' })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('symbol', 'AAPL');
        expect(res.body).toHaveProperty('regularMarketPrice');
        expect(res.body).toHaveProperty('regularMarketChange');
      });
  });

  it('/yahoo-finance/quote-summary (GET)', () => {
    return request(app.getHttpServer())
      .get('/yahoo-finance/quote-summary')
      .query({ symbol: 'AAPL', modules: 'assetProfile,financialData' })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('assetProfile');
        expect(res.body).toHaveProperty('financialData');
      });
  });

  it('/yahoo-finance/search (GET)', () => {
    return request(app.getHttpServer())
      .get('/yahoo-finance/search')
      .query({ query: 'Apple' })
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body.quotes)).toBeTruthy();
        expect(res.body.quotes.length).toBeGreaterThan(0);
        expect(res.body.quotes[0]).toHaveProperty('symbol');
        expect(res.body.quotes[0]).toHaveProperty('longname');
      });
  });

  it('/yahoo-finance/chart (GET)', () => {
    return request(app.getHttpServer())
      .get('/yahoo-finance/chart')
      .query({ symbol: 'AAPL', from: '2023-01-01', to: '2023-12-31', interval: '1d' })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('chart');
        expect(res.body.chart).toHaveProperty('result');
        expect(Array.isArray(res.body.chart.result)).toBeTruthy();
        expect(res.body.chart.result[0]).toHaveProperty('meta');
        expect(res.body.chart.result[0]).toHaveProperty('timestamp');
      });
  });

  it('/yahoo-finance/trending-symbols (GET)', () => {
    return request(app.getHttpServer())
      .get('/yahoo-finance/trending-symbols')
      .query({ country: 'US' })
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body.quotes)).toBeTruthy();
        expect(res.body.quotes.length).toBeGreaterThan(0);
        expect(res.body.quotes[0]).toHaveProperty('symbol');
      });
  });

  it('/yahoo-finance/recommendations (GET)', () => {
    return request(app.getHttpServer())
      .get('/yahoo-finance/recommendations')
      .query({ symbol: 'AAPL' })
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body.finance)).toBeTruthy();
        expect(res.body.finance.length).toBeGreaterThan(0);
        expect(res.body.finance[0]).toHaveProperty('symbol');
      });
  });

  it('/yahoo-finance/options (GET)', () => {
    return request(app.getHttpServer())
      .get('/yahoo-finance/options')
      .query({ symbol: 'AAPL' })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('options');
        expect(Array.isArray(res.body.options)).toBeTruthy();
        expect(res.body.options[0]).toHaveProperty('expirationDate');
        expect(res.body.options[0]).toHaveProperty('calls');
        expect(res.body.options[0]).toHaveProperty('puts');
      });
  });

  it('/yahoo-finance/stock-image (GET)', () => {
    return request(app.getHttpServer())
      .get('/yahoo-finance/stock-image')
      .query({ symbol: 'AAPL' })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('imageUrl');
        expect(typeof res.body.imageUrl === 'string' || res.body.imageUrl === null).toBeTruthy();
      });
  });
});