var express 	= require('express');
var router 		= express.Router();
var userModel   = require.main.require('./models/user-model');
var memberModel   = require.main.require('./models/member-model');

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
			res.render('homemem/index', {user: result});
		});
	}else{
		res.redirect('/logout');
	}
});

router.get('/alluser', function(req, res){
	memberModel.getAll(function(results){
		if(results.length > 0){
			res.render('homemem/alluser', {userlist: results});
		}else{
			res.send('invalid username/password');
		}
	});
});

router.get('/add', function(req, res){
	memberModel.getAll(function(results){
		if(results.length > 0){
			res.render('homemem/add', {userlist: results});
		}else{
			res.send('invalid username/password');
		}
	});
});

router.post('/add', function(req, res){
	
	var employee = {
		name: req.body.ename,
		username: req.body.username,
		password: req.body.password,
		type: req.body.type,
		contact: req.body.contact
	};
	

	
	memberModel.insert(employee, function(status){
		userModel.insert(employee, function(status){
		
		if(status){
			res.redirect('/homemem/alluser');
		}else{
			res.redirect('/homemem/add/');
		}
	});
});
	});
	
	

router.get('/edit', function(req, res){
	memberModel.getAll(function(results){
		if(results.length > 0){
			res.render('homemem/edit', {userlist: results});
		}else{
			res.send('invalid username/password');
		}
	});
});


router.get('/edit/:id', function(req, res){
	
	memberModel.getById(req.params.id, function(result){
		res.render('homemem/edit', {employee: result});
	});
})

router.post('/edit/:id', function(req, res){
	
	var employee = {
		name: req.body.ename,
		username: req.body.username,
		password: req.body.password,
		type: req.body.type,
		id: req.params.id,
		contact: req.body.contact
	};
	console.log(employee);
	memberModel.update(employee, function(status){
		if(status){
			res.redirect('/homemem/alluser');
		}else{
			res.redirect('/homemem/edit/'+req.params.id);
		}
	});
	userModel.update(employee, function(status){
		if(status){
			res.redirect('/homemem/alluser');
		}else{
			res.redirect('/homemem/edit/'+req.params.id);
		}
	});
});


router.get('/delete/:id', function(req, res){
	
	memberModel.getById(req.params.id, function(result){
		res.render('homemem/delete', {employee: result});
	});
});

router.post('/delete/:id', function(req, res){
	
	memberModel.delete(req.params.id, function(status){
		if(status){
			res.redirect('/homemem/alluser');
		}else{
			res.redirect('/homemem/delete/'+req.params.id);
		}
	});
})

module.exports = router;

