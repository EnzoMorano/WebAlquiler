const { Router } = require('express');
const canchasController = require('../controllers/canchas.controller');
const { validarCancha } = require('../middlewares/validarCancha.middleware');
const router = Router();

router.get('/canchas', canchasController.getCanchas);
// Agregar Post

module.exports = router;