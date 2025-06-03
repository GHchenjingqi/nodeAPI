
// utils/dbHandler.js
const db = require('./dblink'); // 确保路径正确

/**
 * 统一数据库操作处理器
 * @param {Object} options - 配置选项
 * @param {string} options.sql - SQL语句
 * @param {Array} [options.params=[]] - SQL参数
 * @param {function} [options.validate] - 参数验证函数
 * @param {function} [options.transform] - 结果转换函数
 * @param {number} [options.successCode=200] - 成功状态码
 * @param {string} [options.notFoundMessage='未找到数据'] - 404消息
 */
const dbHandler = ({
  sql,
  params = [],
  validate = () => true,
  transform = data => data,
  successCode = 200,
  notFoundMessage = '未找到数据'
}) => {
  return async (req, res) => {
    console.log(`[DB] ${sql}`);
    try {
      // 1. 参数验证
      const validation = validate(req);
      if (validation !== true) {
        return res.status(400).json({
          code: 400,
          message: validation,
          data: null
        });
      }

      // 2. 执行查询
      const results = await db(sql, params);
      
      // 3. 处理空结果
      if (results.length === 0) {
        return res.status(404).json({
          code: 404,
          message: notFoundMessage,
          data: null
        });
      }

      // 4. 转换结果
      const transformed = transform(results);

      // 5. 返回成功响应
      res.status(successCode).json({
        code: successCode,
        message: '操作成功',
        data: transformed
      });

    } catch (error) {
      // 6. 统一错误处理
      console.error(`[DB ERROR] ${sql}:`, error);
      res.status(500).json({
        code: 500,
        message: '数据库操作失败',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  };
};

module.exports = dbHandler;