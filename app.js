const express 		= require('express');
const logger 	    = require('morgan');
const bodyParser 	= require('body-parser');
const passport      = require('passport');
const pe            = require('parse-error');
const cors          = require('cors');

const routes    = require('./routes/routes');
const app   = express();

const CONFIG = require('./config/config');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

//Passport
app.use(passport.initialize());

//Log Env
console.log("Environment:", CONFIG)
//DATABASE
const models = require("./models");
models.sequelize.authenticate().then(() => {
    console.log('Connected to SQL database:', CONFIG.db_name);
})
.catch(err => {
    console.error('Unable to connect to SQL database:',CONFIG.db_name, err);
});
if(CONFIG.app==='dev'){
    models.sequelize.sync({force:true}
      );//creates table if they do not already exist
   
}
// CORS
app.use(cors());

app.use('/api', routes);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.status(500).json({success:false,message:'Doesnt have taht page ):'});
});

module.exports = app;

//This is here to handle all the uncaught promise rejections
process.on('unhandledRejection', error => {
    console.error('Uncaught Error', pe(error));
});