var express 	= require('express');
var router 		= express.Router();
var employeeModel	= require.main.require('./models/employee-model');

router.get('/', function(req, res){
	console.log('registration page requested!');
	res.render('registration/index');
});

router.post('/', function(req, res){
		
		var user ={
			username: req.body.uname,
			password: req.body.password
		};

		employeeModel.insert(user, function(status){
			if(status){
				//res.cookie('username', req.body.uname);
				res.redirect('/login');
			}else{
				res.redirect('/login');
			}
		});
});

module.exports = router;

