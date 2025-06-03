// utils/dbHandler.js
const db = require('./dblink'); // 确保路径正确

/**
 * 统一数据库操作处理器
 * @param {Object} config - 配置选项
 * @param {string} config.sql - SQL语句
 * @param {Array|function} [config.params=[]] - SQL参数或参数获取函数
 * @param {function} [config.validate] - 参数验证函数
 * @param {function} [config.transform] - 结果转换函数
 * @param {number} [config.successCode=200] - 成功状态码
 * @param {string} [config.notFoundMessage='未找到数据'] - 404消息
 * @param {boolean} [config.allowEmpty=false] - 是否允许空结果
 */
const dbHandler = (config) => {
  return async (req, res) => {
    try {
      // 提取配置项
      const {
        sql,
        params = [],
        validate,
        transform = data => data,
        successCode = 200,
        notFoundMessage = '未找到数据',
        allowEmpty = false
      } = config;

      // 1. 参数验证
      if (validate) {
        const validation = validate(req);
        if (validation !== true) {
          return res.status(400).json({
            code: 400,
            message: validation,
            data: null
          });
        }
      }

      // 2. 获取参数（支持函数形式）
      const queryParams = typeof params === 'function'
        ? params(req)
        : params;

      // 3. 执行查询
      const results = await db(sql, queryParams);

      // 4. 处理空结果
      if (!allowEmpty && results.length === 0) {
        return res.status(404).json({
          code: 404,
          message: notFoundMessage,
          data: null
        });
      }

      // 5. 转换结果
      let transformed;
      try {
        transformed = transform(results);
      } catch (error) {
        // 转换函数中抛出的错误（如自定义的404）
        if (error.message === '未找到匹配的配置项') {
          return res.status(404).json({
            code: 404,
            message: notFoundMessage,
            data: null
          });
        }
        throw error;
      }

      // 6. 处理204响应
      if (successCode === 204) {
        // 204 状态码不返回任何内容
        return res.status(204).end();
      }


      // 6. 返回成功响应
      res.status(successCode).json({
        code: successCode,
        message: '操作成功',
        data: transformed
      });

    } catch (error) {
      // 7. 统一错误处理
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