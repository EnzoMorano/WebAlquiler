const { Router } = require('express');
const reservasController = require('../controllers/reservas.controller');
const { validarReserva } = require('../middlewares/validarReserva.middleware');
const router = Router();

router.get('/reservas/disponibles', reservasController.getReservasDisponibles);
router.post('/reservas', validarReserva ,reservasController.crearReserva)

module.exports = router;