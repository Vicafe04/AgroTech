const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const read = async (req, res) => {
    let manutencao = await prisma.manutencao.findMany({
        select: {
            valor: true,
            descricao: true,
            data_inicio: true,
            data_fim: true,
            frotaId: true
        }
    })
    res.status(200).json(manutencao).end();
}

const create = async (req, res) => {
    var info = req.body;

    const manutencao = await prisma.manutencao.create({
        data: info
    });

    res.status(200).json(manutencao).end();
}

const update = async (req, res) => {
    let manutencao = await prisma.manutencao.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
        

    });

    res.status(200).json(manutencao).end();
}


module.exports = {
    create,
    read,
    update
}