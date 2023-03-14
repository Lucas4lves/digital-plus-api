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

        return res.status(200).json({encontrado: true, vendas: vendas});

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

        let criadas = await VendaModel.findAll({
            where:{
                [Op.and]:[
                    {dia_criacao: dia},
                    {mes_criacao: mes},
                    {ano_criacao: ano},
                ]
            }
        })

        let encerradas = await VendaModel.findAll({
            where:{
                [Op.and]:[
                    {dia_encerramento: dia},
                    {mes_encerramento: mes},
                    {ano_encerramento: ano},
                ]
            }
        })

        if(!criadas || !encerradas)
        {
            return res.status(400).json({erro: true, msg: "Não foram encontradas vendas para o dia de hoje"});
        }

        return res.status(200).json({
            encontrado : true,
            criadas: criadas,
            encerradas: encerradas
        })
    }

    static async totalDeVendasDia(req, res)
    {
        let {count, rows} = await VendaModel.findAndCountAll({
            where: {
            [Op.and] :[
                {dia_encerramento : new Date().getDate() < 10?  "0" + new Date().getDate() : (new Date().getDate()).toString()},
                {mes_encerramento : new Date().getMonth() < 10?  "0" + (new Date().getMonth() + 1).toString() : (new Date().getMonth() + 1).toString()},
                {ano_encerramento : (new Date().getFullYear()).toString()}
            ] 
            }
        });
        if(!count)
        {
            return res.status(400).json({erro: true, msg: "Não foram encontradas vendas para o dia de hoje"});
        }

        if(!rows)
        {
            return res.status(400).json({erro: true, msg: "Não foram encontrados vendas para o dia de hoje"});
        }

        return res.status(200).json({encontrado: true, total: count});
    }

    static async totalDeVendasMes(req, res)
    {
        let {count, rows} = await VendaModel.findAndCountAll({
            where: {
            [Op.and] :[
                {mes_encerramento : new Date().getMonth() < 10?  "0" + (new Date().getMonth() + 1).toString() : (new Date().getMonth() + 1).toString()},
                {ano_encerramento : (new Date().getFullYear()).toString()}
            ] 
            }
        });
        if(!count)
        {
            return res.status(400).json({erro: true, msg: "Não foram encontradas vendas para este mês"});
        }

        if(!rows)
        {
            return res.status(400).json({erro: true, msg: "Não foram encontrados objetos para este mês"});
        }

        return res.status(200).json({encontrado: true, total: count});
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
    
    static async montarDashboard(req, res)
    {
        const dia = await VendaModel.findAll({
            where:{
                [Op.and] :[
                    {dia_encerramento : new Date().getDate() < 10?  "0" + new Date().getDate() : (new Date().getDate()).toString()},
                    {mes_encerramento : new Date().getMonth() < 10?  "0" + (new Date().getMonth() + 1).toString() : (new Date().getMonth() + 1).toString()},
                    {ano_encerramento : (new Date().getFullYear()).toString()}
                ] 
            }
        })

        if(!dia || dia.length == 0)
        {
            return res.status(400).json({erro: true, msg: "Lucro diário não encontrado"})
        }
        const calcularLucro = vendas => pegarStatus(vendas, "em andamento").map(venda => venda.lucro).reduce((a, b) => (Number(a) + Number(b)).toFixed(2));
        const pegarStatus = (vendas, filtro) => vendas.filter(venda => venda.status_pedido === filtro);
        const vendaPorProduto = vendas => vendas.map(venda => 
            {
                return {
                    id: venda.id,
                    servico: venda.tipo,
                    lucro: venda.lucro
                }
            });

        const mes = await VendaModel.findAll({
            where:{
                [Op.and] :[
                    {mes_encerramento : new Date().getMonth() < 10?  "0" + (new Date().getMonth() + 1).toString() : (new Date().getMonth() + 1).toString()},
                    {ano_encerramento : (new Date().getFullYear()).toString()}
                ] 
            }
        })

        if(!mes || mes.length == 0)
        {
            return res.status(400).json({erro: true, msg: "Lucro diário não encontrado"})
        }

        return res.status(200).json({
            lucro_dia: calcularLucro(dia), 
            lucro_mes: calcularLucro(mes),
            por_produto_dia: vendaPorProduto(dia),
            status_dia: pegarStatus(dia, "em andamento"),
            status_mes: pegarStatus(mes, "em andamento")
        });
    }

    static async teste(req, res)
    {
        let query = await VendaModel.findAll({
            where: {
                ano_encerramento: {
                    [Op.between] : ["2022", "2023"]
                }
            }
        })

        const retornarChaves = arr => arr.map(item => {
            return {m: item.mes_encerramento, a: item.ano_encerramento}
        });

        let novoArray = retornarChaves(query);
        let arrayGPT = removeObjetosDuplicados(novoArray);

        function removeObjetosDuplicados(array) {
            const novoArray = [];
          
            // Verifica cada objeto no array original
            array.forEach(objeto => {
              // Verifica se o objeto já existe no novo array
              if (!novoArray.some(item => JSON.stringify(item) === JSON.stringify(objeto))) {
                novoArray.push(objeto);
              }
            });
          
            return novoArray;
        }
        const pegaPorMes = (query, mes, ano) => query.filter(venda => venda.mes_encerramento === mes && venda.ano_encerramento === ano);
        let lucros = [];
        for(let i = 0; i < arrayGPT.length; i++)
        {
            let temp = pegaPorMes(query, arrayGPT[i].m, arrayGPT[i].a);
            let lucro_temp = 0;
            temp.forEach(item => lucro_temp += Number(item.lucro));
            lucros.push({mes: arrayGPT[i].m, ano: arrayGPT[i].a, lucro: lucro_temp.toString()});
        }

        res.json({resultado: lucros.sort((a, b) => a.mes < b.mes ? -1 : a.mes > b.mes? 1 : 0)});
    }

}

module.exports = FiltrosController;

/**
 * let query = await VendaModel.findAll(
 * {
 *      where:{
 *              mes_encerramento:{
 *                    [Op.between]:[]
 *              }
 *            }
 * }) 
 */