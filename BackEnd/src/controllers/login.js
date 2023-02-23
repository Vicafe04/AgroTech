const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = (req, res) => {
    const user = req.body;

    //CONSULTA AO BANCO PARA VERIFICAR SE O USUARIO ESTA CADASTRADO
    //SELECT * FROM usuarios WHERE email = user.email AND senha = user.senha
    const data = {
        "nome":"Fulano da Silva",
        "senha":"ADMIN"
    };

    jwt.sign(data, process.env.KEY, { expiresIn: '1m' },function(err, token) {
        if(err == null) {
            data["token"] = token;
            res.status(200).json(data).end();
        }else {
            res.status(404).json(err).end();
        }
    });
}

module.exports = {
    login
}
