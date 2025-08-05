const fs = require('fs').promises;
const path = require('path');

// 定义数据文件的存储目录（相对于当前文件所在目录的上级目录的 jsons 文件夹）
// 假设此文件位于 ./lib/index.js，数据存放在项目根目录的 ./jsons/
const DATA_DIR = path.resolve(__dirname, '../jsons');

/**
 * 确保数据目录存在，如果不存在则创建
 */
async function ensureDataDir() {
    try {
        await fs.access(DATA_DIR);
    } catch (err) {
        // 如果目录不存在 (err.code === 'ENOENT')，则创建
        if (err.code === 'ENOENT') {
            await fs.mkdir(DATA_DIR, { recursive: true });
            console.log(`Data directory created: ${DATA_DIR}`);
        } else {
            // 其他错误（如权限问题）
            throw err;
        }
    }
}

/**
 * 读取指定 key 的数据文件
 * @param {string} key - 文件名（不带 .json）
 * @returns {Object} 解析后的 JSON 数据，文件不存在则返回 {}
 */
async function readData(key) {
    if (!key) {
        throw new Error('Key is required');
    }

    // 确保目录存在
    await ensureDataDir();

    const DATA_PATH = path.join(DATA_DIR, key + '.json');

    try {
        const data = await fs.readFile(DATA_PATH, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        if (err.code === 'ENOENT') {
            // 文件不存在，返回空对象
            return {};
        } else if (err.code === 'EACCES') {
            throw new Error(`Permission denied when reading ${DATA_PATH}`);
        } else {
            // 可能是 JSON 解析错误
            console.warn(`Invalid JSON in ${DATA_PATH}, returning empty object.`);
            return {};
        }
    }
}

/**
 * 写入数据到指定 key 的文件
 * @param {string} key - 文件名（不带 .json）
 * @param {Object} newData - 要写入的数据对象
 */
async function writeData(key, newData) {
    if (!key) {
        throw new Error('Key is required');
    }

    // 确保目录存在
    await ensureDataDir();

    const DATA_PATH = path.join(DATA_DIR, key + '.json');

    try {
        const dir = path.dirname(DATA_PATH);
        // 再次确保目录存在（虽然上面调用了，但以防并发写入时目录被删除）
        await fs.access(dir).catch(() => fs.mkdir(dir, { recursive: true }));

        await fs.writeFile(DATA_PATH, JSON.stringify(newData, null, 2), 'utf8');
    } catch (err) {
        if (err.code === 'EACCES') {
            throw new Error(`Permission denied when writing to ${DATA_PATH}`);
        } else {
            throw err;
        }
    }
}

module.exports = { readData, writeData };