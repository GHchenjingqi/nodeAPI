let mysql = require('mysql');
let Config = require("../config");
let config = {
	host: Config.database.host,
	user: Config.database.user,
	password: Config.database.password,
	port: '3306',
	database: Config.database.database
};

// 执行连接操作
connection.connect();
/*
mysql增删改查封装
sql:语句
type:query,insert,delete,update 
params:参数
*/
module.exports = function (sql, type, params) {
	return new Promise((resolve, reject) => {
		// 一、新建一个连接池
		let pool = mysql.createPool(config)
		// 二、连接
		if (type == '' || type == undefined) {
			type = 'query';
		}
		switch (type) {
			case 'query':
				pool.getConnection((error, connection) => {
					if (error) {
						reject(error)
					} else {
						connection.query(sql, (err, rows) => {
							if (err) {
								reject(err)
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
					} else {
						connection.query(sql, (err, rows) => {
							if (err) {
								reject(err)
							} else {
								resolve(rows)
								connection.end()
							}
						})
					}
				})
				break;
			case 'delete':
				pool.getConnection((error, connection) => {
					if (error) {
						reject(error)
					} else {
						connection.query(sql, (err, rows) => {
							if (err) {
								reject(err)
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
					} else {
						connection.query(sql, (err, rows) => {
							if (err) {
								reject(err)
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
