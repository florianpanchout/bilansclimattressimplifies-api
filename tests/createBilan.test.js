const request = require('supertest')

const db = require('./db')
const mockBilans = require('./utils/MockBilans')
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

describe('Bilan creation', () => {
  it('should add a bilan', async () => {
    return request(app)
      .post('/api/v1/bilans')
      .send(mockBilans.valid)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            ...mockBilans.valid,
            id: expect.any(String),
          })
        )
      })
  })
  it('should not add a bilan with less than 50 employees', async () => {
    return request(app)
      .post('/api/v1/bilans')
      .send(mockBilans.invalid.notEnoughEmployees)
      .expect('Content-Type', /json/)
      .expect(500)
  })
  it('should not add a bilan with more than 500 employees', async () => {
    return request(app)
      .post('/api/v1/bilans')
      .send(mockBilans.invalid.tooManyEmployees)
      .expect('Content-Type', /json/)
      .expect(500)
  })
  it('should not add a bilan without raisonSociale', async () => {
    return request(app)
      .post('/api/v1/bilans')
      .send(mockBilans.invalid.noRaisonSociale)
      .expect('Content-Type', /json/)
      .expect(500)
  })
  it('should not add a bilan without SIREN', async () => {
    return request(app)
      .post('/api/v1/bilans')
      .send(mockBilans.invalid.noSiren)
      .expect('Content-Type', /json/)
      .expect(500)
  })
  it('should not add a bilan without NAF', async () => {
    return request(app)
      .post('/api/v1/bilans')
      .send(mockBilans.invalid.noNaf)
      .expect('Content-Type', /json/)
      .expect(500)
  })
  it('should not add a bilan without NAF', async () => {
    return request(app)
      .post('/api/v1/bilans')
      .send(mockBilans.invalid.noRegion)
      .expect('Content-Type', /json/)
      .expect(500)
  })
  it('should not add a bilan without annee', async () => {
    return request(app)
      .post('/api/v1/bilans')
      .send(mockBilans.invalid.noAnnee)
      .expect('Content-Type', /json/)
      .expect(500)
  })
})
