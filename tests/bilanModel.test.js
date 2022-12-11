const db = require('./db')
const mongoose = require('mongoose')

const Bilan = require('../models/bilan')

beforeAll(async () => {
  await db.connectDB()
})

afterAll(async () => {
  await db.dropDB()
})

afterEach(async () => {
  await db.dropCollections()
})

describe('Bilan Model', () => {
  it('should create a bilan successfully', async () => {
    let validBilan = {
      raisonSociale: 'Raison sociale',
      nombreSalaries: 100,
      siren: 12,
      naf: 90,
      region: 4,
      annee: 2021,
    }
    const newBilan = await Bilan(validBilan)
    await newBilan.save()
    expect(newBilan._id).toBeDefined()
    expect(newBilan.raisonSociale).toBe(validBilan.raisonSociale)
    expect(newBilan.nombreSalaries).toBe(validBilan.nombreSalaries)
  })
  it('should fail to create a bilan without a SIREN', async () => {
    let invalidBilan = {
      raisonSociale: 'Raison sociale',
      nombreSalaries: 100,
      naf: 90,
      region: 4,
      annee: 2021,
    }
    const newBilan = await Bilan(invalidBilan)
    try {
      const newBilan = new Bilan(invalidBilan)
      await newBilan.save()
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
    }
  })
  it('should fail to create a bilan without nombreSalaries as a Number', async () => {
    let invalidBilan = {
      raisonSociale: 'Raison sociale',
      nombreSalaries: 'gsqgsesefes',
      naf: 90,
      region: 4,
      annee: 2021,
    }
    const newBilan = await Bilan(invalidBilan)
    try {
      const newBilan = new Bilan(invalidBilan)
      await newBilan.save()
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
    }
  })
  it('should fail to create a bilan with nombreSalaries under 50', async () => {
    let invalidBilan = {
      raisonSociale: 'Raison sociale',
      nombreSalaries: 17,
      naf: 90,
      region: 4,
      annee: 2021,
    }
    const newBilan = await Bilan(invalidBilan)
    try {
      const newBilan = new Bilan(invalidBilan)
      await newBilan.save()
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
    }
  })
})
/*
describe('Listing all bilans', () => {
  it('should list all bilans', () => {
    expect(bilanController.getBilans()).toBe(Array)
  })
})

describe('First Group Of Tests', () => {
  it('First Test', async (done) => {
    const result = await numberFunc(10)
    expect(result.word).toBe('ten')
    expect(result.number).toBeGreaterThan(10)
    done()
  })
  it('Second Test', async (done) => {
    const result = await numberFunc()
    expect(result).toBeNull()
    done()
  })
})
*/
