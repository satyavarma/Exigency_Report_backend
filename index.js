const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const logger = require('morgan');
var UsersRouter = require('./routes/usersRoute');
var PeopleRouter = require('./routes/peopleRoute');

const app = express();

const port = 5000;

app.set('port', port);

var server = http.createServer(app);

server.listen(port);

const url = 'mongodb://localhost:27017/ExigencyReport';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('connected to the server perfectly');
}, (err) => {console.log(err); });

app.use(logger('dev'));
app.use(express.json());


app.use('/users', UsersRouter);
app.use('/people', PeopleRouter);
