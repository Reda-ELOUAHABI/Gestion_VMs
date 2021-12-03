const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const mongoose = require("mongoose");

const User = require("../Models/user");

// database name is movies : inside uri
var uri = "mongodb://movie1:movie@cluster0-shard-00-00.c4sms.mongodb.net:27017,cluster0-shard-00-01.c4sms.mongodb.net:27017,cluster0-shard-00-02.c4sms.mongodb.net:27017/movies?ssl=true&replicaSet=atlas-3al5ka-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(uri).then(() => {
    console.log('connected successfuly');
}).catch((err) => {
    console.log("connection failed");
});


const HttpError = require('../Models/http-error');

const users = [
    { id: "1", username: "admin", email: "email1@email.com", password: "admin" },
    { id: "2", username: "user1", email: "email2@email.com", password: "admin" },
    { id: "3", username: "user2", email: "email3@email.com", password: "admin" }
]

const getAllUsers = async (req, res) => {
    let result = await User.find().exec();
    // res.json({ users });
    res.json({ result });
};

const getUserById = async (req, res) => {
    const userId = req.params.uid;
    console.log(userId);
    const user = users.find((user => {
        return user.id === userId;
    }));
    // HANDLING ERRORs
    // handling user does not exist case
    // [asyn/DB : next(error)]
    // [synch] : throw error (current case)
    if (!user) {
        const error = new Error('bro , could not find this user');
        error.code = 404;
        throw error;
    }
    res.json({ user });
}

// Register Sign Up
const signUp = async (req, res) => {
    // check if data is validate first
    // I will disable it for now
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ message: "invalid data " });
    }
    const { username, email, password } = req.body;

    let users2 = await User.find().exec();
    const hasUser = users2.find(user => user.email === email);
    if (hasUser) {
        return res.status(422).json({ message: "User Already Exist" }); //422 : invalid user input
    }

    // const createdUser = {
    //     // id: uuidv4(),
    //     username, //username: username,
    //     email: email,
    //     password: password
    // };
    // // if ()
    // users.push(createdUser)

    const createdUserMongo = new User({
        // id: uuidv4(),
        username, //username: username,
        email: email,
        password: password
    });
    //    using mongoose
    const result = await createdUserMongo.save();

    res.status(201).json({ message: "user registred successfuly", result });
}

//Login
const signIn = async (req, res) => {
    const { email, password } = req.body;
    // Manualy
    /*
    users.forEach(user => {
        if (user.email === email && user.password === password) {
            return res.json({message: "Logged In"})
        }
    })
    res.json("wrong info");
    */
    // Using find()
    let users2 = await User.find().exec(); //users is static
    const identifiesUser = users2.find(user => user.email.toLowerCase() === email.toLowerCase())
    if (!identifiesUser || identifiesUser.password !== password) {
        res.json({
            status: 0,
            message: "informations are wrong"
        }); //401: authentification failed
    }
    res.json({ status: 1, message: "Logged in" })


}




exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.signIn = signIn;
exports.signUp = signUp;