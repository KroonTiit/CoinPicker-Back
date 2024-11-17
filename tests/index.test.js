const request = require('supertest');
const app = require('../src/index'); 

describe('GET /getCoin', () => {
  it('should return data from the API', async () => {
    const response = await request(app).get('/getCoin');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('body');
  });

  it('should handle API errors gracefully', async () => {
    jest.mock('request', () => ({
      get: jest.fn((options, callback) => {
        callback(null, { statusCode: 500 }, null);
      }),
    }));

    const response = await request(app).get('/getCoin');
    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('error', 'API error');
  });
});