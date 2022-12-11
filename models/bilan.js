const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BilanSchema = new Schema({
  siren: { type: Number, required: true },
  raisonSociale: { type: String, required: true },
  naf: { type: String, required: true },
  nombreSalaries: { type: Number, required: true, min: 50, max: 500 },
  region: { type: String, required: true },
  annee: { type: Number, required: true },
  poste1: { type: Number, default: 0 },
  poste2: { type: Number, default: 0 },
  statut: { type: String, default: 'brouillon', required: true },
  mode: { type: String, default: 'auto', required: true },
})

BilanSchema.virtual('id').get(function () {
  return this._id
})

BilanSchema.virtual('total').get(function () {
  return this.poste1 + this.poste2
})

BilanSchema.set('toJSON', { getters: true })

// Export model
module.exports = mongoose.model('Bilan', BilanSchema)
