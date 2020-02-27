
var express 		= require('express');
var bodyParser 		= require('body-parser');
var ejs 			= require('ejs');
var exSession 		= require('express-session');
var cookieParser 	= require('cookie-parser');
var login 			= require('./controllers/login');
var logout 			= require('./controllers/logout');
var home 			= require('./controllers/home'); 
var homeAD 			= require('./controllers/homead'); 
var homeMem			= require('./controllers/homemem'); 

var registration 	= require('./controllers/registration');
//var exValid 		= require('express-validator');

var app = express();


app.set('view engine', 'ejs');



//app.use('/abc', express.static('xyz'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(exSession({secret: 'my top secret value', saveUninitialized: true, resave: false}));
app.use(cookieParser());
//app.use(exValid());
app.use('/login', login);
app.use('/logout', logout);
app.use('/home', home);
app.use('/homead', homeAD);
app.use('/homemem', homeMem);
app.use('/registration', registration);


//routes
app.get('/', function(req, res){
	res.render('index');
});



//server startup
app.listen(3000, function(){
	console.log('server started at 3000!');
});
