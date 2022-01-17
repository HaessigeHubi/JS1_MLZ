const app = require('./app');
const request = require('supertest');

describe("POST /stock", () => {
// Nicht zum laufen gebracht
    describe("when passed a new Stock", () => {
      test("should respond with a 200 status code", async () => {
        const response = await request(app).post("/stock").send({ 
            "Company":"Tesla",
            "Stock":"TSLA",
            "Amount":10,
            "Current":1050,
            "Starting":519,
        })
        expect(response.statusCode).toBe(200)
      })
    })
  
  })