const VendasModel = require("../models/Venda");

function calcularLucro(valorRecebido, custo)
{
    let lucroCalc = (Number(valorRecebido) - Number(custo)).toFixed(2);

    return lucroCalc;
}

function formatarDatas(data)
{
    let [dia, mes, ano] = data.split("/");

    return {
        dia, mes, ano
    }
}

class VendasController{

    static async cadastro(req, res)
    {
        await VendasModel.sync();

        let {
            data_de_criacao,
            data_de_encerramento,
            nome_cliente,
            nb,
            canal,
            status_pagamento,
            status_pedido,
            valor_recebido,
            custo,
            tipo,
            parceiro
            } = req.body;


        if(!data_de_criacao || data_de_criacao == "")
        {
            return res.status(400).json({error: true, msg: "O campo 'Data de Criação' é obrigatório"});
        }

        if(!nome_cliente || nome_cliente == "")
        {
            return res.status(400).json({error: true, msg: "O campo 'Nome do Cliente' é obrigatório"});
        }

        if(!nb || nb == "")
        {
            return res.status(400).json({error: true, msg: "O campo 'Número do Benefício' é obrigatório"});
        }

        if(!canal || canal == "")
        {
            return res.status(400).json({error: true, msg: "O campo 'Canal' é obrigatório"});
        }

        // if(status_pagamento == "")
        // {
        //     return res.status(400).json({error: true, msg: "O campo 'Status de Pagamento' é obrigatório"});
        // }

        if(!status_pedido || status_pedido == "")
        {
            return res.status(400).json({error: true, msg: "O campo 'Status de Pedido' é obrigatório"});
        }

        if(!valor_recebido)
        {
            return res.status(400).json({error: true, msg: "O campo 'Valor Recebido' é obrigatório"});
        }

        if(!custo)
        {
            return res.status(400).json({error: true, msg: "O campo 'Custo' é obrigatório"});
        }

        // if(!lucro)
        // {
        //     return res.status(400).json({error: true, msg: "O campo 'Lucro' é obrigatório"});
        // }

        if(!tipo || tipo =="")
        {
            return res.status(400).json({error: true, msg: "O campo 'Tipo de Serviço' é obrigatório"});
        }

        if(!parceiro || parceiro == "")
        {
            return res.status(400).json({error: true, msg: "O campo 'Parceiro' é obrigatório"});
        }

        let dataCriacao = formatarDatas(data_de_criacao);
        let dataEncerramento = data_de_encerramento.length > 0 ? formatarDatas(data_de_encerramento) : "";

        let novaVenda = await VendasModel.create({
            data_de_criacao,
            data_de_encerramento,
            dia_criacao : dataCriacao.dia,
            mes_criacao : dataCriacao.mes,
            ano_criacao : dataCriacao.ano,
            dia_encerramento : dataEncerramento.dia || "",
            mes_encerramento : dataEncerramento.mes || "",
            ano_encerramento : dataEncerramento.ano || "",
            nome_cliente,
            nb,
            canal,
            status_pagamento,
            status_pedido,
            valor_recebido,
            custo,
            lucro : calcularLucro(valor_recebido, custo),
            tipo,
            parceiro
        }
    )

        return res.status(201).json({created: novaVenda});

    }
}

module.exports = VendasController;