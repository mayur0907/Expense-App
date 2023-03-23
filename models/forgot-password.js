const Sequelize = require('sequelize');
const data_base = require('../util/database');

//id, name , password, phone number, role

const Forgotpassword = data_base.define('forgotpassword', {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    active: Sequelize.BOOLEAN,
    expiresby: Sequelize.DATE
})

module.exports = Forgotpassword;