var express 						= require('express');
var router 							= express.Router();
var userModel						= require.main.require('./models/user-model');
var memberModel						= require.main.require('./models/member-model');
var adminModel						= require.main.require('./models/admin-model');


router.get('/', function(req, res){
	console.log('registration page requested!');
	res.render('registration/index');
});

router.post('/', function(req, res){
		
		
		var member ={
			type:     req.body.type,
			name: 	  req.body.name, 
			username: req.body.uname,
			gender:   req.body.gender,
			contact:  req.body.contact,
			mail:     req.body.mail,
 			password: req.body.password,
 			cpassword: req.body.cpassword
		};
		console.log(member);

		if(member.type=='member')
		{
			memberModel.insert(member, function(status){
			userModel.insert(member, function(status){
		
		if(status){
			res.redirect('/login');
		}else{
			res.redirect('/registration');
		}
	});
		});
		}
		else{
			adminModel.insert(member, function(status){
			userModel.insert(member, function(status){
		
		if(status){
			res.redirect('/login');
		}else{
			res.redirect('/registration');
		}
	});
		});

		}

		

});

module.exports = router;

