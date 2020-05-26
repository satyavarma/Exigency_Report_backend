var express = require('express');
var usersRoute = express.Router();

var users = require('../models/users');

const bodyParser = require('body-parser');
usersRoute.use(bodyParser.json());

const cors = require('./cors');

usersRoute.route('/signup')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions, (req, res, next) => { 
    console.log('signup');
    console.log(req.body.username);
    users.findOne({username: req.body.username})
    .then((user) => {
        console.log(user)
        if(user != null){
            console.log('!=null');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            var err = new Error('Username Already Exists');
            res.json({info:'Username already exists', success: false, error:err});
        }
        else{
            console.log('=null')
            users.create({
                username: req.body.username,
                password: req.body.password
            })
            .then((user) => {
                console.log('entering then user');
                res.statusCode = 200;
                res.setHeader('content-Type', 'apllication/json');
                res.json({info:'Registered', success:true, user: user});
            })
        }
    })
    .catch((err) => {
        console.log('catch signup');
        res.statusCode=403;
        res.setHeader('Content-Type', 'application/json');
        res.json({info:'something went wrong', success: false, error:err});
    })
});

usersRoute.route('/login')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions, (req, res, next) => { 
    console.log('login');
    console.log(req.body.username);
    users.findOne({username: req.body.username})
    .then((user) => {
        console.log(user);
        if (user === null) {
            console.log('===null');
            res.statusCode=200;
            res.setHeader('Content-Type', 'application/json');
            var err = new Error('User Not Found');
            res.json({info:'user not found', success: false, error:err});
        }
        else if (user.password !== req.body.password) {
            console.log('!=password')
            res.statusCode=200;
            res.setHeader('Content-Type', 'application/json');
            var err = new Error('Wrong Password');
            res.json({info:'wrong Password', success: false, error:err});
        }
        else if (user.username === req.body.username && user.password === req.body.password) {
            console.log('= = ')
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({info:'login sucess', success: true, error:null, user: user});
        }
    })
    .catch((err) => {
        console.log('catch login');
        res.statusCode=403;
        res.setHeader('Content-Type', 'application/json');
        res.json({status:'cannot login', success: false, error:err});
    });
});

module.exports = usersRoute;