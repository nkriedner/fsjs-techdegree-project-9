"use strict";

const auth = require("basic-auth");
const { User } = require("../models");

exports.authenticateUser = async (req, res, next) => {
    // parse the user's credentials from the Auhorization header
    const credentials = auth(req);

    console.log("authenticateUser middleware running - credentials:", credentials);

    if (credentials) {
        const user = await User.findOne({ where: { emailAddress: credentials.name } });
        console.log("user:", user);
    }

    next();
};
