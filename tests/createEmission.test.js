const request = require('supertest')

const db = require('./db')
const mockBilans = require('./utils/MockBilans')
const mockEmissions = require('./utils/mockEmissions')
const Bilan = require('../models/bilan')
const app = require('../app')

let newBilan = null

beforeAll(async () => {
  await db.connectDB()
  newBilan = await Bilan(mockBilans.valid)
  await newBilan.save()
})

afterAll(async () => {
  await db.dropDB()
})

afterEach(async () => {
  await db.dropCollections()
})

describe('emission creation', () => {
  it('should add a emission', async () => {
    return request(app)
      .post('/api/v1/emissions')
      .send({
        ...mockEmissions.valid,
        bilan: newBilan.id,
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            ...mockEmissions.valid,
            id: expect.any(String),
          })
        )
      })
  })
  it('should not add an emission without poste', async () => {
    return request(app)
      .post('/api/v1/bilans')
      .send(mockEmissions.invalid.noPoste)
      .expect('Content-Type', /json/)
      .expect(500)
  })
  it('should not add an emission without type', async () => {
    return request(app)
      .post('/api/v1/bilans')
      .send(mockEmissions.invalid.noType)
      .expect('Content-Type', /json/)
      .expect(500)
  })
  it('should not add an emission without localisation', async () => {
    return request(app)
      .post('/api/v1/bilans')
      .send(mockEmissions.invalid.noLocalisation)
      .expect('Content-Type', /json/)
      .expect(500)
  })
  it('should not add an emission without valeur', async () => {
    return request(app)
      .post('/api/v1/bilans')
      .send(mockEmissions.invalid.noValeur)
      .expect('Content-Type', /json/)
      .expect(500)
  })
  it('should not add an emission with an incorrect valeur', async () => {
    return request(app)
      .post('/api/v1/bilans')
      .send(mockEmissions.invalid.incorrectValeur)
      .expect('Content-Type', /json/)
      .expect(500)
  })
  it('should not add an emission without unite', async () => {
    return request(app)
      .post('/api/v1/bilans')
      .send(mockEmissions.invalid.noUnite)
      .expect('Content-Type', /json/)
      .expect(500)
  })
})
