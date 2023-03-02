const express = require('express');

const router = express.Router();

const Middleware = require('../middleware/middleware');

const Frota = require('../controllers/frota');
const Login = require('../controllers/login');
const Manutencao = require('../controllers/manutencao');
const Motorista = require('../controllers/motoristas');
const Servico = require('../controllers/servicos');

router.post("/frota/create", Frota.create);
router.get("/frota/read", Frota.read);

router.post("/login/validar", Login.login)
router.get("/login/readId/:id", Login.readId)

router.post("/manutencao/create", Manutencao.create);
router.get("/manutencao/read", Manutencao.read);
router.put("/manutencao/update/:id", Manutencao.update);

router.get("/motorista/read", Motorista.read);
router.post("/motorista/create", Motorista.create);

router.post("/servico/create", Servico.create);
router.get("/servico/read", Servico.read);
router.post("/servico/update/:id", Servico.update);

module.exports = router;