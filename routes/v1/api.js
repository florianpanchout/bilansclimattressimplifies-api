const express = require('express')
const router = express.Router()

const bilanController = require('../../controllers/bilanController.js')
const emissionController = require('../../controllers/emissionController.js')

router.get('/bilans', bilanController.getBilans)

router.post('/bilans', bilanController.createBilan)

router.get('/bilans/:id', bilanController.getBilan)

router.patch('/bilans/:id', bilanController.updateBilan)

router.delete('/bilans/:id', bilanController.deleteBilan)

router.get('/bilans/:id/emissions', emissionController.getEmissions)

router.post('/emissions', emissionController.createEmission)

router.patch('/emissions/:id', emissionController.updateEmission)

router.delete('/emissions/:id', emissionController.deleteEmission)

router.get('/emissionFactors', emissionController.emissionfactors)

module.exports = router
