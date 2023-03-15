const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (req, res) => {
    var info = req.body;

    const frotas = await prisma.frotas.create({
        data: info
    });

    res.status(200).json(frotas).end();
}

const read = async (req, res) => {
    let frotas = await prisma.frotas.findMany({
        select: {
            id: true,
            modelo: true,
            marca: true,
            placa: true,
            manutencao: {
                select: {
                    valor: true,
                    descricao: true,
                    data_inicio: true,
                    data_fim: true
                }
            }
        }
    });

    res.status(200).json(frotas).end();
}

const remove = async (req, res) => {
    let frota = await prisma.frotas.delete({
        where: {
            id: Number(req.params.id)
        }
    });

    res.status(200).json(frota).end();
}

const update = async (req, res) => {
    const frotas = await prisma.frotas.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })
    res.status(200).json(frotas).end();
}

module.exports = {
    create,
    read,
    remove,
    update
}