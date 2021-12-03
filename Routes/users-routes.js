const express = require("express")
const router = express.Router();
const { check } = require("express-validator");

const userController = require("../Controller/user-controller")

// 
router.get('/', userController.getAllUsers)
router.get("/:uid", userController.getUserById)

// register
router.post('/signup',
    // Validator
    [
        check('username').not().isEmpty(),
        check('email').isEmail().normalizeEmail(),
        check('password').isLength({ min: 6 })
    ],
    userController.signUp)
// login Sign in
router.post('/signin', userController.signIn)


module.exports = router;