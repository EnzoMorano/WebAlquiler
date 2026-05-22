const { Router } = require('express');
const autenticacionController = require('../controllers/auth.controller');
const { validarLogin } = require('../middlewares/validarLogin.middleware');
const router = Router();

router.post('/login', validarLogin, autenticacionController.login);

module.exports = router;