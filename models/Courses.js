"use strict";

const Sequelize = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
    class Course extends Sequelize.Model {}
    Course.init(
        {
            title: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.TEXT,
            },
            estimatedTime: {
                type: Sequelize.STRING,
            },
            materialsNeeded: {
                type: Sequelize.STRING,
            },
        },
        { sequelize }
    );

    Course.associate = (models) => {
        // -> Add associations
    };

    return Course;
};
