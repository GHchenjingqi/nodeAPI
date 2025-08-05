const { getUser,  createUser, updateUser,  deleteUser, findUser, isUsernameExists, isEmailExists } = require('./manager/user');


// 统一抛出
module.exports = { 
    getUser,  createUser, updateUser,  deleteUser, findUser, isUsernameExists, isEmailExists 
};