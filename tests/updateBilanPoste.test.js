const request = require('supertest')

const db = require('./db')
const mockBilans = require('./utils/MockBilans')
const mockEmissions = require('./utils/MockEmissions')
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

describe('Bilan poste', () => {
  it('should display a bilan with no emissions', async () => {
    const newBilan = await Bilan(mockBilans.valid)
    await newBilan.save()
    return request(app)
      .get(`/api/v1/bilans/${newBilan.id}`)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            ...mockBilans.valid,
            id: expect.any(String),
          })
        )
      })
  })
  it('should display a bilan with poste1 initialized', async () => {
    const newBilan = await Bilan(mockBilans.valid)
    await newBilan.save()

    return request(app)
      .post('/api/v1/emissions/')
      .send({
        ...mockEmissions.valid,
        bilan: newBilan.id,
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        return request(app)
          .get(`/api/v1/bilans/${newBilan.id}`)
          .then((response) => {
            expect(response.body).toEqual(
              expect.objectContaining({
                ...mockBilans.valid,
                poste1: 17368,
                id: expect.any(String),
              })
            )
          })
      })
  })
  it('should display a bilan with poste1 initialized with two emissions', async () => {
    const newBilan = await Bilan(mockBilans.valid)
    await newBilan.save()

    return request(app)
      .post('/api/v1/emissions/')
      .send({
        ...mockEmissions.valid,
        bilan: newBilan.id,
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        return request(app)
          .post('/api/v1/emissions/')
          .send({
            ...mockEmissions.valid,
            bilan: newBilan.id,
          })
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
            return request(app)
              .get(`/api/v1/bilans/${newBilan.id}`)
              .then((response) => {
                expect(response.body).toEqual(
                  expect.objectContaining({
                    ...mockBilans.valid,
                    poste1: 17368 * 2,
                    id: expect.any(String),
                  })
                )
              })
          })
      })
  })
  it('should display a bilan with both poste1 and poste2 initialized', async () => {
    const newBilan = await Bilan(mockBilans.valid)
    await newBilan.save()

    return request(app)
      .post('/api/v1/emissions/')
      .send({
        ...mockEmissions.valid,
        bilan: newBilan.id,
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        return request(app)
          .post('/api/v1/emissions/')
          .send({
            ...mockEmissions.valid,
            poste: 2,
            bilan: newBilan.id,
          })
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
            return request(app)
              .get(`/api/v1/bilans/${newBilan.id}`)
              .then((response) => {
                expect(response.body).toEqual(
                  expect.objectContaining({
                    ...mockBilans.valid,
                    poste1: 17368,
                    poste2: 17368,
                    id: expect.any(String),
                  })
                )
              })
          })
      })
  })
})
