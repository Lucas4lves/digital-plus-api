const sequelize = require("../db/Config");
const { DataTypes } = require("sequelize");

const Venda = sequelize.define("Venda", {
    data_de_criacao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    data_de_encerramento:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    nome_cliente:{
        type: DataTypes.STRING,
        allowNull: false
    },
    nb:{
        type: DataTypes.STRING,
        allowNull: false
    },
    canal:{
        type: DataTypes.STRING,
        allowNull: false
    },
    status_pagamento:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    status_pedido:{
        type: DataTypes.STRING,
    },
    valor_recebido: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    custo: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    lucro: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    parceiro:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Venda;