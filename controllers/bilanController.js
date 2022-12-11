const { body, validationResult } = require('express-validator')

const Bilan = require('../models/bilan')
const Emission = require('../models/emission')

exports.getBilans = function (req, res, next) {
  Bilan.find().exec(function (err, bilans) {
    if (err) {
      return next(err)
    }
    res.json(bilans)
  })
}

exports.createBilan = [
  body('raisonSociale').trim().isLength({ min: 1 }).escape(),
  body('nombreSalaries').trim().isInt({ min: 50, max: 500 }).escape(),
  body('naf').trim().isLength({ min: 1 }).escape(),
  body('region').trim().isLength({ min: 1 }).escape(),
  body('annee').trim().isInt({ min: 2020, max: 2022 }).escape(),
  function (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(errors)
    }

    const bilan = new Bilan({
      raisonSociale: req.body.raisonSociale,
      nombreSalaries: req.body.nombreSalaries,
      siren: req.body.siren,
      naf: req.body.naf,
      region: req.body.region,
      annee: req.body.annee,
    })

    bilan.save((err) => {
      if (err) {
        return next(err)
      }
      res.json(bilan)
    })
  },
]

exports.getBilan = function (req, res, next) {
  Bilan.findById(req.params.id).exec(function (err, bilan) {
    if (err) {
      return next(err)
    }
    res.json(bilan)
  })
}

exports.updateBilan = [
  body('raisonSociale').optional().trim().isLength({ min: 1 }).escape(),
  body('nombreSalaries')
    .optional()
    .trim()
    .isInt({ min: 50, max: 500 })
    .escape(),
  body('naf').optional().trim().isLength({ min: 1 }).escape(),
  body('region').optional().trim().isLength({ min: 1 }).escape(),
  body('annee').optional().trim().isInt({ min: 2020, max: 2022 }).escape(),
  body('mode').optional().trim().isLength({ min: 1 }).escape(),
  body('statut').optional().trim().isLength({ min: 1 }).escape(),
  body('poste1').optional().trim().isFloat().escape(),
  body('poste2').optional().trim().isFloat().escape(),
  function (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(errors)
    }

    Bilan.findById(req.params.id).exec(function (err, prevBilan) {
      const bilan = new Bilan({
        raisonSociale: req.body.raisonSociale || prevBilan.raisonSociale,
        nombreSalaries: req.body.nombreSalaries || prevBilan.nombreSalaries,
        siren: req.body.siren || prevBilan.siren,
        naf: req.body.naf || prevBilan.naf,
        region: req.body.region || prevBilan.region,
        annee: req.body.annee || prevBilan.annee,
        mode: req.body.mode || prevBilan.mode,
        statut: req.body.statut || prevBilan.statut,
        poste1: req.body.manuelPoste1 || prevBilan.poste1,
        poste2: req.body.manuelPoste2 || prevBilan.poste2,
        _id: req.params.id,
      })
      Bilan.findByIdAndUpdate(req.params.id, bilan, {}, (err, newBilan) => {
        if (err) {
          return next(err)
        }
        res.json(newBilan)
      })
    })
  },
]

exports.deleteBilan = function (req, res, next) {
  Bilan.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return next(err)
    }

    res.json({ status: 'deleted' })
  })
}

exports.updateBilanPoste = function (emission, callback) {
  Emission.find({ bilan: emission.bilan, poste: emission.poste }).exec(
    function (err, emissionsOfPoste) {
      if (err) {
        return callback(err, emission)
      }
      const totalOfPoste = emissionsOfPoste.reduce(
        (acc, cur) => (acc += cur.resultat),
        0
      )
      Bilan.findById(emission.bilan)
        .lean()
        .exec(function (err, prevBilan) {
          const bilan = new Bilan({
            ...prevBilan,
            _id: emission.bilan,
            ['poste' + emission.poste]: totalOfPoste,
          })
          Bilan.findByIdAndUpdate(
            emission.bilan,
            bilan,
            { setDefaultsOnInsert: false },
            (err) => {
              return callback(err, emission)
            }
          )
        })
    }
  )
}
