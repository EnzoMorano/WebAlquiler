const { Router } = require('express');
const { validarToken } = require('../middlewares/validarToken.middleware');
const { validarCancha, validarActualizarCancha } = require('../middlewares/validarCancha.middleware');
const { validarActualizarReserva } = require('../middlewares/validarReserva.middleware');
const { validarHorario, validarActualizarHorario } = require('../middlewares/validarHorario.middleware');
const canchaController = require('../controllers/canchas.controller');
const reservasController = require('../controllers/reservas.controller');
const horariosController = require('../controllers/horarios.controller');
const router = Router();

router.post('/canchas', validarToken, validarCancha, canchaController.crearCancha);
router.put('/canchas/:id', validarToken, validarActualizarCancha, canchaController.actualizarCancha);
router.delete('/canchas/:id', validarToken, canchaController.eliminarCancha);
router.get('/reservas', validarToken, reservasController.getReservas);
router.put('/reservas/:id', validarToken, validarActualizarReserva, reservasController.actualizarReserva);
router.delete('/reservas/:id', validarToken, reservasController.eliminarReserva);
router.get('/horarios', validarToken, horariosController.getHorarios);
router.get('/horarios/:id', validarToken, horariosController.getHorarioById);
router.post('/horarios', validarToken, validarHorario, horariosController.crearHorario);
router.put('/horarios/:id', validarToken, validarActualizarHorario, horariosController.actualizarHorario);
router.delete('/horarios/:id', validarToken, horariosController.eliminarHorario);

module.exports = router;