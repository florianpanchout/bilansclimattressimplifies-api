const mongoose = require('mongoose')

const Schema = mongoose.Schema

const EmissionSchema = new Schema({
  poste: { type: Number, required: true },
  type: { type: String, required: true },
  bilan: { type: Schema.Types.ObjectId, ref: 'Bilan', required: true },
  localisation: { type: String, required: true },
  valeur: { type: Number, required: true },
  resultat: { type: Number, required: true },
  unite: { type: String, required: true },
  note: { type: String },
})

EmissionSchema.virtual('id').get(function () {
  return this._id
})

EmissionSchema.set('toJSON', { getters: true })

// Export model
module.exports = mongoose.model('Emission', EmissionSchema)
