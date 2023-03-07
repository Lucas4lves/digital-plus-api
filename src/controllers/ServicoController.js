const ServicoModel = require("../models/Servico");

class ServicoController
{
    static async cadastro(req, res)
    {
        await ServicoModel.sync();

        let { tipo } = req.body;

        let servico = await ServicoModel.create({
            tipo
        });

        res.status(201).json({created: servico});
    }


    static async getAll(req, res)
    {
        let servicos = await ServicoModel.findAll();
        if(!servicos)
        {
            return res.status(400).json({error: "Serviços não encontrados"});
        }else{
            return res.status(200).json({resultado: servicos})
        }
    }
}

module.exports = ServicoController;