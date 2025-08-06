const { getUser,  createUser, updateUser,  deleteUser, findUser, isUsernameExists, isEmailExists } = require('./manager/user');
const { getMenus } = require('./manager/menus')

// 统一抛出
module.exports = { 
    getUser,  createUser, updateUser,  deleteUser, findUser, isUsernameExists, isEmailExists ,
    getMenus,
};