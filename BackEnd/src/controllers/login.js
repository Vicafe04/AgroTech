const jwt = require('jsonwebtoken');
require('dotenv').config();

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


const login = async (req, res) => {
    let usuario = await prisma.usuarios.findMany({
        where: {
            AND: [{
                email: req.body.email
            },
            {
                senha: req.body.senha
            }]
        }
    })
    //CONSULTA AO BANCO PARA VERIFICAR SE O USUARIO ESTA CADASTRADO
    //SELECT * FROM usuarios WHERE email = user.email AND senha = user.senha
    if(usuario.length != 0){
        jwt.sign(usuario[0], process.env.KEY, { expiresIn: '30m' }, function (err, token) {
            if (err == null) {
                usuario[0]["token"] = token;
                res.status(200).json(usuario[0]).end();
            } else {
                res.status(404).json(err).end();
            }
        });
    } else {
        res.status(404).json({"mensagem" : " usuario não encontrado"}).end()
    }
    
}

module.exports = {
    login
}
