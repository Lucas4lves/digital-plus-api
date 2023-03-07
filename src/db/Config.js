const {Sequelize} = require("sequelize");

const sequelize = new Sequelize("mysql://root:bSqBHwI2cnNmOUQDvb4H@containers-us-west-143.railway.app:6097/railway", {
    logging: true
});

module.exports = sequelize;