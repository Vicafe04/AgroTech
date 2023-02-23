const express = require('express');

const router = express.Router();

const Middleware = require('../middleware/middleware')

const Frota = require('../controllers/frota');
const Login = require('../controllers/login');

router.post("/frota/create", Frota.create);
router.get("/frota/read", Frota.read);

router.post("/login/validar", Middleware.validaAcesso, Login.login)

module.exports = router;