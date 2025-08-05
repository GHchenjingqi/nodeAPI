// userManager.js

const { readData, writeData } = require('../lib/index');

/**
 * 根据 id 查找用户
 * @param {string|number} username - 用户的唯一标识,暂时使用用户名
 * @returns {Object|undefined} 找到的用户对象，未找到返回 undefined
 */
async function getUser(username) {
    const data = await readData('user');
    // 如果 users 不存在或不是数组，返回 undefined
    if (!Array.isArray(data.users)) return undefined;
    return data.users.find(user => user.username === username);
}

/**
 * 创建新用户
 * @param {Object} user - 用户对象，必须包含 id 字段
 * @returns {string|number} 返回创建的用户的 id
 */
async function createUser(user) {
    const data = await readData('user');
    
    // 确保 data.users 是一个数组
    if (!Array.isArray(data.users)) {
        data.users = [];
    }

    // 检查用户是否已存在（可选，根据需求决定）
    const existingUser = data.users.find(u => u.id === user.id);
    if (existingUser) {
        throw new Error(`User with id ${user.id} already exists.`);
    }

    // 将新用户推入数组
    data.users.push(user);
    
    // 写入文件
    await writeData('user', data);
    
    return user.id; // 返回用户的 id
}

/**
 * 更新用户信息
 * @param {string|number} userId - 用户的唯一标识
 * @param {Object} updates - 要更新的字段
 * @returns {boolean} 是否更新成功
 */
async function updateUser(userId, updates) {
    const data = await readData('user');
    
    if (!Array.isArray(data.users)) return false;

    const userIndex = data.users.findIndex(user => user.id === userId);
    if (userIndex === -1) return false; // 用户不存在

    // 更新用户信息
    data.users[userIndex] = { ...data.users[userIndex], ...updates };
    
    await writeData('user', data);
    return true;
}

/**
 * 删除用户
 * @param {string|number} userId - 用户的唯一标识
 * @returns {boolean} 是否删除成功
 */
async function deleteUser(userId) {
    const data = await readData('user');
    
    if (!Array.isArray(data.users)) return false;

    const userIndex = data.users.findIndex(user => user.id === userId);
    if (userIndex === -1) return false; // 用户不存在

    // 删除用户
    data.users.splice(userIndex, 1);
    
    await writeData('user', data);
    return true;
}

/**
 * 根据任意字段查找用户（例如检查用户名或邮箱是否存在）
 * @param {Function} predicate - 一个返回布尔值的函数，用于匹配用户
 * @returns {Object|undefined} 找到的用户对象，未找到返回 undefined
 */
async function findUser(predicate) {
    const data = await readData('user');
    if (!Array.isArray(data.users)) return undefined;
    return data.users.find(predicate);
}

// --- 示例：检查用户名是否存在 ---
async function isUsernameExists(username) {
    const user = await findUser(u => u.username === username);
    return !!user; // 返回 true 或 false
}

// --- 示例：检查邮箱是否存在 ---
async function isEmailExists(email) {
    const user = await findUser(u => u.email === email);
    return !!user;
}

module.exports = { 
    getUser, 
    createUser, 
    updateUser, 
    deleteUser,
    findUser,           // 通用查找
    isUsernameExists,   // 检查用户名是否存在
    isEmailExists       // 检查邮箱是否存在
};