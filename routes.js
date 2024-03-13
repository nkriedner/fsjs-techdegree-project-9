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
        // retrieve the current authenticated user infos from request object
        const currentUser = req.currentUser;
        console.log("currentUser.id:", currentUser.id);
        // Return id, firstName, lastName and emailAddress for current user
        res.status(200).json({
            id: currentUser.id,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            emailAddress: currentUser.emailAddress,
        });
    })
);

// POST request to /api/users
router.post(
    "/users",
    asyncHandler(async (req, res) => {
        try {
            // create new user with data from request body
            await User.create(req.body);
            res.location("/").status(201).end();
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
        // retreive all course data from db (plus chosen user info)
        const courses = await Course.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: { exclude: ["password", "createdAt", "updatedAt"] },
                },
            ],
        });
        res.status(200).json(courses);
    })
);

// GET request to /api/courses/:id
router.get(
    "/courses/:id",
    asyncHandler(async (req, res) => {
        // retreive specific course data with id (plus chosen user info)
        const course = await Course.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: { exclude: ["password", "createdAt", "updatedAt"] },
                },
            ],
        });
        res.status(200).json(course);
    })
);

// POST request to /api/courses
router.post(
    "/courses",
    authenticateUser,
    asyncHandler(async (req, res) => {
        console.log("req.body:", req.body);
        try {
            // create new course with data from request body
            const newCourse = await Course.create(req.body);
            res.location(`/courses/${newCourse.id}`).status(201).end();
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
    authenticateUser,
    asyncHandler(async (req, res) => {
        // retrieve the current authenticated user infos from request object
        const currentUser = req.currentUser;
        // retreive course to update with id from request params
        const courseToUpdate = await Course.findByPk(req.params.id);
        // TODO: Update course data
        console.log("TODO: Update ->", courseToUpdate);
        // res.status(204);

        // check if course-user-id equals currentUser-id
        if (courseToUpdate.userId === currentUser.id) {
            try {
                await courseToUpdate.update(req.body);
                res.status(204).end();
            } catch (error) {
                // console.log("catch...", error.message);
                if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
                    const errors = error.errors.map((err) => err.message);
                    res.status(400).json({ errors });
                } else {
                    throw error;
                }
            }
        } else {
            res.status(403).end();
        }
    })
);

// DELETE request to /api/courses/:id
router.delete(
    "/courses/:id",
    authenticateUser,
    asyncHandler(async (req, res) => {
        // retrieve the current authenticated user infos from request object
        const currentUser = req.currentUser;
        // retreive course to delete with id from request params
        const courseToDelete = await Course.findByPk(req.params.id);

        // check if course-user-id equals currentUser-id
        if (courseToDelete.userId === currentUser.id) {
            await courseToDelete.destroy();
            res.status(204).end();
        } else {
            res.status(403).end();
        }
    })
);

module.exports = router;
