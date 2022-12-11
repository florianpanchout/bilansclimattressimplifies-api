const async = require('async')
const { body, validationResult } = require('express-validator')

const emissionFactors = require('../public/emission-factors.json')
const Emission = require('../models/emission')
const bilanController = require('../controllers/bilanController.js')

exports.getEmissions = function (req, res, next) {
  Emission.find({ bilan: req.params.id }).exec(function (err, emissions) {
    if (err) {
      return next(err)
    }
    res.json(emissions)
  })
}

exports.createEmission = [
  body('poste').trim().isInt({ min: 1, max: 2 }).escape(),
  body('type').trim().isLength({ min: 1 }),
  body('bilan').trim().isLength({ min: 1 }).escape(),
  body('localisation').trim().isLength({ min: 1 }),
  body('valeur').trim().isFloat().escape(),
  body('unite').trim().isLength({ min: 1 }).escape(),
  body('note')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 1 })
    .escape(),
  function (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(errors)
    }

    const resultat =
      Number(req.body.valeur) *
      emissionFactors[req.body.type].facteurs[req.body.localisation][
        'kgCO2e/' + req.body.unite
      ]
    const emission = new Emission({
      poste: req.body.poste,
      type: req.body.type,
      bilan: req.body.bilan,
      localisation: req.body.localisation,
      valeur: req.body.valeur,
      unite: req.body.unite,
      note: req.body.note,
      resultat,
    })
    async.waterfall(
      [
        function (callback) {
          emission.save((err) => callback(err, emission))
        },
        bilanController.updateBilanPoste,
      ],
      function (err, emission) {
        if (err) {
          return next(err)
        }
        res.json(emission)
      }
    )
  },
]

exports.updateEmission = [
  body('poste').optional().trim().isInt({ min: 1, max: 2 }).escape(),
  body('type').optional().trim().isLength({ min: 1 }).escape(),
  body('bilan').optional().trim().isLength({ min: 1 }).escape(),
  body('localisation').optional().trim().isLength({ min: 1 }).escape(),
  body('valeur').optional().trim().isFloat().escape(),
  body('unite').optional().trim().isLength({ min: 1 }).escape(),
  body('note')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 1 })
    .escape(),
  function (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(errors)
    }

    const resultat =
      Number(req.body.valeur) *
      emissionFactors[req.body.type].facteurs[req.body.localisation][
        'kgCO2e/' + req.body.unite
      ]

    const emission = new Emission({
      type: req.body.type,
      localisation: req.body.localisation,
      valeur: req.body.valeur,
      unite: req.body.unite,
      note: req.body.note,
      resultat,
      _id: req.params.id,
    })

    async.waterfall(
      [
        function (callback) {
          Emission.findByIdAndUpdate(
            req.params.id,
            emission,
            {},
            (err, newEmission) => callback(err, newEmission)
          )
        },
        bilanController.updateBilanPoste,
      ],
      function (err, newEmission) {
        if (err) {
          return next(err)
        }
        res.json(newEmission)
      }
    )
  },
]

exports.deleteEmission = function (req, res, next) {
  async.waterfall(
    [
      function (callback) {
        Emission.findById(req.params.id, (err, emission) =>
          callback(err, emission)
        )
      },
      function (emission, callback) {
        Emission.findByIdAndRemove(req.params.id, (err) =>
          callback(err, emission)
        )
      },
      bilanController.updateBilanPoste,
    ],
    function (err) {
      if (err) {
        return next(err)
      }
      res.json({ status: 'deleted' })
    }
  )
}

exports.emissionfactors = function (req, res, next) {
  res.json(emissionFactors)
}
