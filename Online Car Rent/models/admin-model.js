var db = require('./db');

module.exports ={
	getById: function(id, callback){
		var sql = "select * from admin where id=?";
		db.getResult(sql, [id], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	getByUname: function(uname, callback){
		var sql = "select * from admin where adminname=?";
		db.getResult(sql, [uname], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	validate: function(admin, callback){
		var sql = "select * from admin where adminname=? and password=?";
		db.getResult(sql, [admin.adminname, admin.password], function(result){
			if(result.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getAll:function(callback){
		var sql = "select * from admin";
		db.getResult(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	insert: function(admin, callback){
		var sql = "insert into admin values(?,?,?,?,?,?,?,?)";
		db.execute(sql, [null, admin.name, admin.username, admin.gender, admin.contact, admin.mail, admin.password, admin.cpassword], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(id, callback){
		var sql = "delete from admin where id=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	update: function(admin, callback){
		var sql = "update admin set adminname=?, password=?, type=? where id=?";
		db.execute(sql, [admin.adminname, admin.password, admin.type, admin.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}