const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const read = async (req, res) => {
    let servicos = await prisma.servicos.findMany({
        select: {
            id: true,
            data_saida: true,
            retorno: true,
            descricao: true,
            motorista: {
                select: {
                    id: true,
                    nome: true,
                    CNH: true,
                    CPF: true
                }
            },
            Frota: {
                select: {
                    id: true,
                    modelo: true,
                    marca: true,
                    placa: true
                }
            }
        }
    })
    res.status(200).json(servicos).end();
}

const create = async (req, res) => {
    var info = req.body;

    info.data_saida = new Date(info.data_saida);
    info.retorno = new Date(info.retorno);

    const servicos = await prisma.servicos.create({
        data: info
    });

    res.status(200).json(servicos).end();
}

let update = async (req, res) => {
    const servicos = await prisma.servicos.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })

    res.status(200).json(servicos).end();
}

module.exports = {
    create,
    read,
    update
}