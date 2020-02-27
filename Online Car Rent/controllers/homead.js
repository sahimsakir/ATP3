var express 	= require('express');
var router 		= express.Router();
var userModel   = require.main.require('./models/user-model');
var memberModel   = require.main.require('./models/member-model');
var carModel   = require.main.require('./models/car-model');

router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', function(req, res){	
	if(req.cookies['username'] != null){
		userModel.getByUname(req.cookies['username'], function(result){
			if(result.type=="admin"){
			res.render('home/homead/index', {user: result});
		}
		});
	}else{
		res.redirect('/logout');
	}
});

router.get('/alluser', function(req, res){
	memberModel.getAll(function(results){
		if(results.length > 0){
			res.render('home/homead/alluser', {member: results});
		}else{
			res.send('invalid username/password');
		}
	});
});

router.get('/add', function(req, res){
			res.render('home/homead/add');
	
});

router.post('/add', function(req, res){
	
	var car = {
		brand: req.body.brand,
		model: req.body.model,
		category: req.body.categories
	};
	
	console.log(car);
	
	carModel.insert(car, function(status){
		
		if(status){
			res.redirect('/homead');
		}else{
			res.redirect('home/homead/add/');
		}
	
});
	});
	
	

router.get('/edit', function(req, res){
	memberModel.getAll(function(results){
		if(results.length > 0){
			res.render('home/homead/edit', {member: results});
		}else{
			res.send('invalid username/password');
		}
	});
});


router.get('/edit/:id', function(req, res){
	
	memberModel.getById(req.params.id, function(result){
		res.render('home/homead/edit', {member: result});
	});
})

router.post('/edit/:id', function(req, res){
	
	var member = {
		name: req.body.ename,
		username: req.body.username,
		password: req.body.password,
		type: req.body.type,
		id: req.params.id,
		contact: req.body.contact
	};
	console.log(member);
	memberModel.update(member, function(status){
		if(status){
			res.redirect('home/homead/alluser');
		}else{
			res.redirect('home/homead/edit/'+req.params.id);
		}
	});
	userModel.update(member, function(status){
		if(status){
			res.redirect('home/homead/alluser');
		}else{
			res.redirect('home/homead/edit/'+req.params.id);
		}
	});
});


router.get('/delete/:id', function(req, res){
	
	memberModel.getById(req.params.id, function(result){
		res.render('home/homead/delete', {member: result});
	});
});

router.post('/delete/:id', function(req, res){
	
	memberModel.delete(req.params.id, function(status){
		if(status){
			res.redirect('homead/alluser');
		}else{
			res.redirect('homead/delete/'+req.params.id);
		}
	});
})

module.exports = router;

