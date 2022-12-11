const request = require('supertest')

const db = require('./db')
const mockBilans = require('./utils/MockBilans')
const Bilan = require('../models/bilan')
const app = require('../app')

beforeAll(async () => {
  await db.connectDB()
})

afterAll(async () => {
  await db.dropDB()
})

afterEach(async () => {
  await db.dropCollections()
})

describe('Bilan listing', () => {
  it('should display an empty array', async () => {
    return request(app)
      .get('/api/v1/bilans')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual([])
      })
  })
  it('should display an array with one bilan', async () => {
    const newBilan = await Bilan(mockBilans.valid)
    await newBilan.save()

    return request(app)
      .get('/api/v1/bilans')
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              ...mockBilans.valid,
              id: expect.any(String),
            }),
          ])
        )
      })
  })
})
