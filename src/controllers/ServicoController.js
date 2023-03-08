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


    static async editar(req, res)
    {
        let { query, value } = req.body;
        
        if(!query) {
            return res.status(400).json({erro: true, msg: "Serviço não encontrado"});
        }

        if(!value)
        {
            return res.status(400).json({erro: true, msg: "O campo de edição precisa ser preenchido"});
        }

        try{
            let servico = await ServicoModel.findAll({
                where: {
                    tipo: query
                }
            })
        }catch(erro){
            return res.status(400).json({erro: true, msg: erro.msg});
        }

    }

    static async deletar(req, res){
        let { query } = req.params;

        if(!query)
        {
            return res.status(400).json({erro: true, msg: "Erro ao deletar serviço"});
        }


            let servico = await ServicoModel.findAll({
                where: {
                    id:     query
                }
            })

            await ServicoModel.destroy({
                where:{
                    id: query
                }
            });

            return res.status(200).json({deletado: true, servico: servico});

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