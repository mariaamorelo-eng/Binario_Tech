const express = require('express');
const router = express.Router();

const mercedesController = require('../controllers/mercedesController');
const validaVin = require('../middlewares/validaVin');

router.get('/', mercedesController.listarFrota);
router.post('/', validaVin, mercedesController.adicionarCaminhao);
router.get('/:id', mercedesController.buscarPorId);

module.exports = router;
