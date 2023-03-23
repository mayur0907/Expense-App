const Sequelize = require('sequelize');

const data_base = new Sequelize("expense", "root", "mayur123@#", {
    dialect: 'mysql',
    host: "localhost"
  });
  
module.exports = data_base;