// controllers/options.js
const dbHandler = require('../db/dbHandler');
const { requireParams } = require('../db/validators');

module.exports = {
  // 查询配置项
  getOption: dbHandler({
    sql: 'SELECT * FROM wp_options WHERE option_name = ?',
    params: req => [req.query.name],
    validate: requireParams('name'),
    transform: results => results[0], // 只返回第一条
    notFoundMessage: '未找到匹配的配置项'
  }),

  // 更新配置项
  updateOption: dbHandler({
    sql: 'UPDATE wp_options SET option_value = ? WHERE option_name = ?',
    params: req => [req.body.value, req.body.name],
    validate: requireParams('name', 'value'),
    successCode: 200,
    transform: results => ({ affectedRows: results.affectedRows })
  }),

  // 获取所有配置项
  getAllOptions: dbHandler({
    sql: 'SELECT option_name, option_value FROM wp_options',
    successCode: 200,
    transform: results => results.map(row => ({
      name: row.option_name,
      value: row.option_value
    }))
  }),

  // 创建配置项
  createOption: dbHandler({
    sql: 'INSERT INTO wp_options (option_name, option_value) VALUES (?, ?)',
    params: req => [req.body.name, req.body.value],
    validate: requireParams('name', 'value'),
    successCode: 201, // 创建资源使用201状态码
    transform: results => ({ id: results.insertId })
  }),

  // 删除配置项
  deleteOption: dbHandler({
    sql: 'DELETE FROM wp_options WHERE option_name = ?',
    params: req => [req.query.name],
    validate: requireParams('name'),
    successCode: 204, // 删除资源使用204状态码
    transform: results => ({ affectedRows: results.affectedRows })
  }),

};