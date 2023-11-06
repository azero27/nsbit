/*
var createError = require('http-errors');

var express = require('express');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./index');
var usersRouter = require('./routes/users');
*/

/*
var app = express();
*/

//

var createError = require('http-errors');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var indexRouter = require('./index');
/*var indexRouter = require('./index');
var usersRouter = require('./routes/users');
*/
//

//app.js
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const path = require('path');
const ruleRouter = require('./routes/projectRouter');

//key
const crypto = require('crypto');
const apiKey = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"; //key 문자열

app.get('/', (req, res) => {
  const clientApiKey = req.headers['x-api-key'];

  if (clientApiKey === apiKey) {
    // 클라이언트의 API 키가 유효한 경우
    res.json({ message: 'API 키가 유효합니다.' });
  } else {
    // 클라이언트의 API 키가 유효하지 않은 경우
    res.status(401).json({ error: '유효하지 않은 API 키' });
  }
});


app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.query);
  next();
});

app.use('/rules', ruleRouter);



app.listen(port, () => {
  console.log(port, 'Server is listening...');
});

/*
//mariaDB connect
const maria = require('./models/maria');
maria.connect();
*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*
app.use('/', indexRouter);
app.use('/users', usersRouter);

*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
