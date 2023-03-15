const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (req, res) => {
    var info = req.body;

    const motoristas = await prisma.motoristas.create({
        data: info
    });

    res.status(200).json(motoristas).end();
}

const read = async (req, res) => {
    let motoristas = await prisma.motoristas.findMany({
        select: {
            id: true,
            nome: true,
            CPF: true,
            CNH: true,
            servicoId: true
        }
    });

    res.status(200).json(motoristas).end();
}

let update = async (req, res) => {
    const motoristas = await prisma.motoristas.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })

    res.status(200).json(motoristas).end();
}

module.exports = {
    create,
    read,
    update
}