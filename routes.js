"use strict";

const express = require("express");
const { asyncHandler } = require("./middleware/async-handler");

// Create a router instance
const router = express.Router();

// GET request to /api/users
router.get(
    "/users",
    asyncHandler(async (req, res) => {
        res.status(200).json({ msg: "GET request to /api/users route" });
    })
);

// POST request to /api/users
router.post(
    "/users",
    asyncHandler(async (req, res) => {
        res.status(200).json({ msg: "POST request to /api/users route" });
    })
);

// GET request to /api/courses
router.get(
    "/courses",
    asyncHandler(async (req, res) => {
        res.status(200).json({ msg: "GET request to /api/courses route" });
    })
);

// GET request to /api/courses/:id
router.get(
    "/courses/:id",
    asyncHandler(async (req, res) => {
        res.status(200).json({ msg: "GET request to /api/courses/:id route" });
    })
);

// POST request to /api/courses
router.post(
    "/courses",
    asyncHandler(async (req, res) => {
        res.status(201).json({ msg: "POST request to /api/courses route" });
    })
);

// PUT request to /api/courses/:id
router.put(
    "/courses/:id",
    asyncHandler(async (req, res) => {
        // res.status(204);
        res.json({ msg: "PUT request to /api/courses/:id route" });
    })
);

// DELETE request to /api/courses/:id
router.delete(
    "/courses/:id",
    asyncHandler(async (req, res) => {
        // res.status(204);
        res.json({ msg: "DELETE request to /api/courses/:id route" });
    })
);

module.exports = router;
