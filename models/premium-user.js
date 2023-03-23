const Sequelize = require('sequelize');

const data_base = require('../util/database');

const PremiumUser = data_base.define('premiumUser', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    paymentId: Sequelize.STRING,
    orderId: Sequelize.STRING,
    status: Sequelize.STRING
});

module.exports = PremiumUser;