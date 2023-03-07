const sequelize = require("../db/Config");
const { DataTypes } = require("sequelize");

const Servico = sequelize.define("Servico", {
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})

module.exports = Servico;