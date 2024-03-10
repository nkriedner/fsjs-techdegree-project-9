"use strict";

const Sequelize = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
    class User extends Sequelize.Model {}
    User.init(
        {
            firstName: {
                type: Sequelize.STRING,
            },
            lastName: {
                type: Sequelize.STRING,
            },
            emailAddress: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
        },
        { sequelize }
    );

    User.associate = (models) => {
        // -> Add associations
    };

    return User;
};
