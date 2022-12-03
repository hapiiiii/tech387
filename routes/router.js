const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const db = require('../lib/db.js');
const userMiddleware = require('../middleware/users.js');

const userController = require('../controller/userController.js');
const UserController = new userController()
const courseCategoryController = require('../controller/courseCategoryController.js');
const CourseCategoryController = new courseCategoryController()
const courseController = require('../controller/courseController.js');
const CourseController = new courseController()

// user routes

router.post('/register', userMiddleware.validateRegister, (req, res, next) => {
    UserController.register(req, res, next)
});
router.post('/login', (req, res, next) => {
    UserController.login(req, res, next)
});
router.post('/logout', (req, res, next) => {
    UserController.logout(req, res, next)
});


// course category routes

router.get('/courseCategory', (req, res, next) => {
    CourseCategoryController.getAll(req, res, next)
});
router.get('/courseCategory/:name', (req, res, next) => {
    CourseCategoryController.getOne(req, res, next)
});
router.post('/courseCategory', (req, res, next) => {
    CourseCategoryController.insert(req, res, next)
});
router.put('/courseCategory/:oldName', (req, res, next) => {
    CourseCategoryController.update(req, res, next)
});
router.delete('/courseCategory/:name', (req, res, next) => {
    CourseCategoryController.delete(req, res, next)
});

// course routes

router.get('/course', (req, res, next) => {
    CourseController.getAll(req, res, next)
});
router.get('/course/:name', (req, res, next) => {
    CourseController.getOne(req, res, next)
});
router.post('/course', (req, res, next) => {
    CourseController.insert(req, res, next)
});
router.put('/course/:oldName', (req, res, next) => {
    CourseController.update(req, res, next)
});
router.delete('/course/:name', (req, res, next) => {
    CourseController.delete(req, res, next)
});



module.exports = router;