const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
  res.send({ title: 'Bilans Climat Très Simplifiés' })
})

module.exports = router
