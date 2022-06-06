const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mysql = require('mysql2');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const documentsRouter = require('./routes/documents');

const app = express();


app.locals.con = mysql.createConnection({
    host:'localhost',
    port: '8889',
    user: 'dev',
    password: 'hallon',
    database: 'notes'
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/documents', documentsRouter);

module.exports = app;
