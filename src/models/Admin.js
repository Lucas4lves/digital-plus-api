const sequelize = require("../db/Config");
const { DataTypes } = require("sequelize");

const Admin = sequelize.define("Admin", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha:{
      type: DataTypes.STRING,
      allowNull:false,
    }
})

module.exports = Admin;