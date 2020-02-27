var db = require('./db');

module.exports ={
	getById: function(id, callback){
		var sql = "select * from car where cid=?";
		db.getResult(sql, [id], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	getByUname: function(uname, callback){
		var sql = "select * from car where brand=?";
		db.getResult(sql, [uname], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	
	getAll:function(callback){
		var sql = "select * from car";
		db.getResult(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	insert: function(car, callback){
		var sql = "insert into car values(?,?,?,?)";
		db.execute(sql, [null, car.brand, car.model, car.category], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(id, callback){
		var sql = "delete from car where cid=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	update: function(car, callback){
		var sql = "update car set brand=?, model=?, category=? where cid=?";
		db.execute(sql, [car.brand,car.model, car.category,car.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}