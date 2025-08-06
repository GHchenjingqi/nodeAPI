const { readData, writeData } = require('../lib/index');

/**
 * 获取菜单列表
 * @returns {Object|undefined} 找到的用户对象，未找到返回 undefined
 */
async function getMenus() {
    const data = await readData('menus');
    if (!Array.isArray(data.menus)) return [];
    return data.menus || [];
}

module.exports = { 
    getMenus, 
};