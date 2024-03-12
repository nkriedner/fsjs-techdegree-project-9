"use strict";

const express = require("express");
const { asyncHandler } = require("./middleware/async-handler");
const { User, Course } = require("./models");
const { authenticateUser } = require("./middleware/auth-user");

// Create a router instance
const router = express.Router();

// GET request to /api/users
router.get(
    "/users",
    authenticateUser,
    asyncHandler(async (req, res) => {
        // retreive all users from db
        const users = await User.findAll();
        res.status(200).json(users);
    })
);

// POST request to /api/users
router.post(
    "/users",
    asyncHandler(async (req, res) => {
        try {
            // create new user with data from request body
            await User.create(req.body);
            res.status(201).json({ message: "User account successfully created." });
        } catch (error) {
            if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
                const errors = error.errors.map((err) => err.message);
                res.status(400).json({ errors });
            } else {
                throw error;
            }
        }
    })
);

// GET request to /api/courses
router.get(
    "/courses",
    asyncHandler(async (req, res) => {
        // retreive all course data from db
        const courses = await Course.findAll();
        res.status(200).json(courses);
    })
);

// GET request to /api/courses/:id
router.get(
    "/courses/:id",
    asyncHandler(async (req, res) => {
        // retreive specific course data with id
        const course = await Course.findByPk(req.params.id);
        res.status(200).json(course);
    })
);

// POST request to /api/courses
router.post(
    "/courses",
    asyncHandler(async (req, res) => {
        console.log("req.body:", req.body);
        try {
            // create new course with data from request body
            await Course.create(req.body);
            res.status(201).json({ message: "Course successfully created" });
        } catch (error) {
            console.log("catch...", error.message);
            if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
                const errors = error.errors.map((err) => err.message);
                res.status(400).json({ errors });
            } else {
                throw error;
            }
        }
    })
);

// PUT request to /api/courses/:id
router.put(
    "/courses/:id",
    asyncHandler(async (req, res) => {
        // retreive course to update with id
        const courseToUpdate = await Course.findByPk(req.params.id);
        // TODO: Update course data
        console.log("TODO: Update ->", courseToUpdate);
        // res.status(204);
        res.json({ msg: "PUT request to /api/courses/:id route" });
    })
);

// DELETE request to /api/courses/:id
router.delete(
    "/courses/:id",
    asyncHandler(async (req, res) => {
        // retreive course to delete with id
        const courseToDelete = await Course.findByPk(req.params.id);
        // TODO: Delete course
        console.log("TODO: Delete ->", courseToDelete);
        // res.status(204);
        res.json({ msg: "DELETE request to /api/courses/:id route" });
    })
);

module.exports = router;
