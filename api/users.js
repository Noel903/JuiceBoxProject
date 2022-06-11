// api/users.js
const express = require('express');
const usersRouter = express.Router();

const { getAllUsers, getUserById, getUserByUsername, createUser } = require('../db'); // db/index

const jwt = require('jsonwebtoken');
const token = jwt.sign({ id: 1, username: 'albert'}, process.env.JWT_SECRET, { expiresIn: '5h' })

usersRouter.use(async (req, res, next) => {
    console.log("A request is being made to /users");
    next();
});

usersRouter.get('/', async (req, res) => {
    try{
        const users = await getAllUsers();
        res.send({
            users
        });
    }catch(error){
        next(error)
    }
    
});

usersRouter.post('/login', async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        next({
            name: "MissingCredentialsError",
            message: "Please supply both a username and password"
        });
    }

    try{
        const user = await getUserByUsername(username);

        if (user && user.password == password) {
            let token = jwt.sign(user, process.env.JWT_SECRET);

            res.send({ message: "you're logged in!", token });
        } else {
            next({ 
                name: 'IncorrectCredentialsError', 
                message: 'Username or password is incorrect'
            });
        } 
    } catch(error) {
        next(error);
    }
});

usersRouter.post('/register', async (req, res, next) => {
    const {username, password, name, location} = req.body;

    try {
        const _user = await getUserByUsername(username);

        if (_user) {
            next({
                name: 'UserExistsError',
                message: 'A user by that name already exists'
            });
        }

        const user = await createUser({
            username,
            password,
            name,
            location,
        });

        const token = jwt.sign({
            id: user.id,
            username
        }, process.env.JWT_SECRET, {
            expiresIn: '1w'
        });

        res.send({
            message: "thank you for signing up",
            token
        });
    } catch ({ name, message}) {
        next({ name, message })
    }
});

module.exports = usersRouter;