"use strict";

const bcrypt = require("bcrypt");
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class User extends Model {}
    User.init(
        {
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "A first name is required",
                    },
                    notEmpty: {
                        msg: "Please provide your first name",
                    },
                },
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "A last name is required",
                    },
                    notEmpty: {
                        msg: "Please provide your last name",
                    },
                },
            },
            emailAddress: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "An email address is required",
                    },
                    notEmpty: {
                        msg: "Please provide an email address",
                    },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                set(val) {
                    if (val) {
                        const hashedPassword = bcrypt.hashSync(val, 10);
                        this.setDataValue("password", hashedPassword);
                    }
                },
                validate: {
                    notNull: {
                        msg: "A password is required",
                    },
                    notEmpty: {
                        msg: "Please provide a password",
                    },
                },
            },
        },
        { sequelize }
    );

    User.associate = (models) => {
        User.hasMany(models.Course, {
            foreignKey: {
                fieldName: "userId",
                allowNull: false,
            },
        });
    };

    return User;
};
