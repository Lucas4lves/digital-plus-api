const VendasModel = require("../models/Venda");

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
            lucro,
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

        if(!valor_recebido || typeof valor_recebido != "number")
        {
            return res.status(400).json({error: true, msg: "O campo 'Valor Recebido' é obrigatório"});
        }

        if(!custo || typeof custo != "number")
        {
            return res.status(400).json({error: true, msg: "O campo 'Custo' é obrigatório"});
        }

        if(!lucro || typeof lucro != "number")
        {
            return res.status(400).json({error: true, msg: "O campo 'Lucro' é obrigatório"});
        }

        if(!tipo || tipo =="")
        {
            return res.status(400).json({error: true, msg: "O campo 'Tipo de Serviço' é obrigatório"});
        }

        if(!parceiro || parceiro == "")
        {
            return res.status(400).json({error: true, msg: "O campo 'Parceiro' é obrigatório"});
        }

        let novaVenda = await VendasModel.create({
            data_de_criacao,
            data_de_encerramento,
            nome_cliente,
            nb,
            canal,
            status_pagamento,
            status_pedido,
            valor_recebido,
            custo,
            lucro,
            tipo,
            parceiro
        }
    )

        return res.status(201).json({created: novaVenda});

    }
}

module.exports = VendasController;