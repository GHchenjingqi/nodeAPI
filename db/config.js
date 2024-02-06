let mysql = require('mysql');
let Config = require("../config");
let config = {
	host: Config.database.host,
	user: Config.database.user,
	password: Config.database.password,
	database: Config.database.database
};


/*
mysql增删改查封装
sql:语句
type:query,insert,delete,update 
params:参数
*/
let pool = ""
module.exports = function (sql, type, params) {
	// 一、新建一个连接池
	if (!pool) {
		pool = mysql.createPool(config)
	}
	return new Promise((resolve, reject) => {
		// 二、连接
		if (type == '' || type == undefined) {
			type = 'query';
		}
		switch (type) {
			case 'query':
				pool.getConnection((error, connection) => {
					if (error) {
						reject(error)
						connection.release()
					} else {
						connection.query(sql, (err, rows) => {
							if (err) {
								reject(err)
								connection.release()
							} else {
								resolve(rows)
								connection.release()
							}
						})
					}
				})
				break;
			case 'insert':
				pool.getConnection((error, connection) => {
					if (error) {
						reject(error)
						connection.release()
					} else {
						connection.query(sql, (err, rows) => {
							if (err) {
								reject(err)
								connection.release()
							} else {
								resolve(rows)
								connection.release()
							}
						})
					}
				})
				break;
			case 'delete':
				pool.getConnection((error, connection) => {
					if (error) {
						reject(error)
						connection.release()
					} else {
						connection.query(sql, (err, rows) => {
							if (err) {
								reject(err)
								connection.release()
							} else {
								resolve(rows)
								connection.release()
							}
						})
					}
				})
				break;
			case 'update':
				pool.getConnection((error, connection) => {
					if (error) {
						reject(error)
						connection.release()
					} else {
						connection.query(sql, (err, rows) => {
							if (err) {
								reject(err)
								connection.release()
							} else {
								resolve(rows)
								connection.release()
							}
						})
					}
				})
				break;
		}

	})
}
