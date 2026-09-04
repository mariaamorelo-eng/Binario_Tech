const express = require('express');
const router = express.Router();

const scaniaController = require('../controllers/scaniaController');
const validaVin = require('../middlewares/validaVin');

router.post('/', validaVin, scaniaController.adicionarCaminhao);

module.exports = router;
