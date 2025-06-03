const mysql = require('mysql');
const Config = require("../config");

// 全局单例连接池
const pool = mysql.createPool({
  host: Config.database.host,
  user: Config.database.user,
  password: Config.database.password,
  database: Config.database.database,
  connectionLimit: 10 // 建议明确设置连接数上限
});

module.exports = (sql, params = []) => { // 移除type参数，统一处理
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) return reject(err); // 不要尝试释放不存在的连接
      
      connection.query(sql, params, (queryErr, results) => {
        connection.release(); // 始终释放连接
        
        queryErr ? reject(queryErr) : resolve(results);
      });
    });
  });
};