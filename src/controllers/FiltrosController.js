const ParceiroModel = require("../models/Parceiro");
const ServicoModel = require("../models/Servico");
const VendaModel = require("../models/Venda");

const { Op } = require("sequelize");

class FiltrosController
{
    static async vendasPorParceiro(req, res)
    {
        let {nome} = req.body;
        nome = nome.toLowerCase();

        console.log(nome);
        let vendas = await VendaModel.findAll({
            where:{
                parceiro: nome
            }
        })

        if(!vendas)
        {
            return res.status(400).json({erro: true, msg: `Vendas pelo parceiro ${nome} não encontradas`});
        }

<<<<<<< HEAD
        return res.status(200).json({result : resultado});
=======
        return res.status(200).json({encontrado: true, vendas: vendas});

>>>>>>> 4ff2b93e17d1d4877e61bd43e6b0cc4fdf43b8a9
    }

    static async vendasPorDia(req, res)
    {
        let {dia, mes, ano} = req.body;

        if(!dia)
        {
            return res.status(400).json({erro: true, msg: "Preencha todos os campos"});
        }

        if(!mes)
        {
            return res.status(400).json({erro: true, msg: "Preencha todos os campos"});
        }

        if(!ano)
        {
            return res.status(400).json({erro: true, msg: "Preencha todos os campos"});
        }

        let resultado = await VendaModel.findAll({
            where:{
                [Op.and]:[
                    {dia_criacao: dia},
                    {mes_criacao: mes},
                    {ano_criacao: ano},
                ]
            }
        })

        if(!resultado)
        {
            return res.status(400).json({erro: true, msg: "Não foram encontradas vendas para o dia de hoje"});
        }

        return res.status(200).json({
            encontrado : true,
            resultados: resultado
        })
    }


    static async vendasPorMes(req, res)
    {
        let { mes } = req.body;

        if(!mes)
        {
            return res.status(400).json({erro: true, msg: "Preencha o campo de mês"});
        }

        let resultado = await VendaModel.findAll({
            where: {
                mes_criacao: mes
            }
        })

        if(!resultado)
        {
            return res.status(400).json({erro: true, msg: "Não foram encontradas vendas para o mês " + mes});
        }

        return res.status(200).json({encontrado: true, resultado: resultado});
    }
    
}

module.exports = FiltrosController;