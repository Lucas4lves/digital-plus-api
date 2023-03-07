const sequelize = require("../db/Config");
const { DataTypes } = require("sequelize");

const Parceiro = sequelize.define("Parceiro", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})

module.exports = Parceiro;