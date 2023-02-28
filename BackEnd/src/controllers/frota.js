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

module.exports = {
    create,
    read
}