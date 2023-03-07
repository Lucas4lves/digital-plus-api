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
    dia_criacao:{
        type: DataTypes.STRING,
    },
    mes_criacao :{
        type: DataTypes.STRING
    },
    ano_criacao : {
        type: DataTypes.STRING
    },
    dia_encerramento:{
        type: DataTypes.STRING,
    },
    mes_encerramento :{
        type: DataTypes.STRING
    },
    ano_encerramento : {
        type: DataTypes.STRING
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
        type: DataTypes.STRING,
        allowNull: false
    },
    custo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lucro: {
        type: DataTypes.STRING,
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