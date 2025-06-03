// utils/validators.js

/**
 * 必需参数验证器
 * @param {...string} fields - 必需字段名
 * @returns {function} 验证函数
 */
exports.requireParams = (...fields) => {
  return (req) => {
    const missing = fields.filter(field => 
      !req.query[field] && !req.body[field]
    );
    
    if (missing.length > 0) {
      return `缺少必需参数: ${missing.join(', ')}`;
    }
    return true;
  };
};

/**
 * 数字类型验证器
 * @param {...string} fields - 数字字段名
 * @returns {function} 验证函数
 */
exports.requireNumbers = (...fields) => {
  return (req) => {
    const invalid = fields.filter(field => {
      const value = req.query[field] || req.body[field];
      return value && isNaN(Number(value));
    });
    
    if (invalid.length > 0) {
      return `参数类型错误: ${invalid.join(', ')} 应为数字`;
    }
    return true;
  };
};