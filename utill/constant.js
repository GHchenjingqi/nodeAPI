const ErrorCode = {
  SUCCESS: 200,
  SUCCESS_ADD: 201,
  SUCCESS_DEL: 202,
  SUCCESS_SOCKET: 101,
  PARAM_ERROR: 400,
  USER_NOT_EXIST: 401,
  NOT_ALLOWED: 403,
  NOT_FOUND: 404,
  SYS_ERROR: 500,
}

const ErrorMessage = { 
   SUCCESS: '成功',
   SUCCESS_ADD: '添加成功',
   SUCCESS_DEL: '删除成功',
   SUCCESS_SOCKET: 'socket连接成功',
   PARAM_ERROR: '参数错误',
   USER_NOT_EXIST: '用户不存在',
   USER_IS_EXIST: '用户已存在',
   NOT_ALLOWED: '无权限',
   NOT_FOUND: '未找到',
   SYS_ERROR: '系统错误',
   PASSWORD_ERROR: '用户账号或密码错误',

}


module.exports = { ErrorCode, ErrorMessage }