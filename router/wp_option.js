const dbHandler = require('../db/dbHandler');
const { requireParams } = require('../db/validators');

// 安全的参数获取函数
const getQueryParam = (req, param) => req.query[param] || '';
const getBodyParam = (req, param) => req.body[param] || '';

module.exports = {
  // 查询配置项 (修复参数获取方式)
  getOption: dbHandler({
    sql: 'SELECT * FROM wp_options WHERE option_name = ?',
    params: req => [getQueryParam(req, 'name')],
    validate: requireParams('name'),
    transform: results => results[0],
    notFoundMessage: '未找到匹配的配置项'
  }),

  // 更新配置项
  updateOption: dbHandler({
    sql: 'UPDATE wp_options SET option_value = ? WHERE option_name = ?',
    params: req => [getQueryParam(req, 'value'), getQueryParam(req, 'name')],
    validate: requireParams('name', 'value'),
    successCode: 200,
    transform: results => ({ affectedRows: results.affectedRows })
  }),

  // 获取所有配置项 (修复空结果处理)
  getAllOptions: dbHandler({
    sql: 'SELECT option_name, option_value FROM wp_options',
    allowEmpty: true, // 允许空结果
    successCode: 200,
    transform: results => results.map(row => ({
      name: row.option_name,
      value: row.option_value
    }))
  }),

  // 创建配置项 x-www-form-urlencoded/json 参数
  createOption: dbHandler({
    sql: 'INSERT INTO wp_options (option_name, option_value) VALUES (?, ?)',
    params: req => [getBodyParam(req, 'name'), getBodyParam(req, 'value')],
    validate: requireParams('name', 'value'),
    successCode: 201,
    transform: results => ({ id: results.insertId })
  }),

  // 删除配置项
  deleteOption: dbHandler({
    sql: 'DELETE FROM wp_options WHERE option_name = ?',
    params: req => [getQueryParam(req, 'name')],
    validate: requireParams('name'),
    successCode: 200,
    transform:  results => {
        if (results.affectedRows === 0) {
            throw new Error('未找到匹配的配置项');
        }
        return { 
            affectedRows: results.affectedRows,
            message: '删除成功'
        };
    }
  }),
};