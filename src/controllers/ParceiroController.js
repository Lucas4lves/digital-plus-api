const ParceiroModel = require("../models/Parceiro");

class ParceiroController
{
    static async cadastro(req, res)
    {
        await ParceiroModel.sync();

        let { nome } = req.body;
        if(!nome)
        {
            return res.status(400).json({error: true});
        }

        let novoParceiro = await ParceiroModel.create({
            nome
        })

        return res.status(201).json({
            created: novoParceiro
        })
    }

    static async getAll(req, res)
    {
        let parceiros = await ParceiroModel.findAll();
        if(!parceiros)
        {
            return res.status(400).json({error: true});
        }

        return res.status(200).json({resultado: parceiros});
    }
}

module.exports = ParceiroController;