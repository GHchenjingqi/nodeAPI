/**
 * path模块
 * 
 * Node全局变量
 * __dirname 当前文件所在目录的绝对路径
 * __filename 当前文件的绝对路径
 * 
 * 
 * 1.resolve 拼接处规范的绝对路径
 * resolve(__dirname, filepath, filepath....)  // 
 *      filepath必须是相对路径
 *      filepath可以是一个路径片段
 *      filepath可以多个
 *      filepath可以是 ./files || ../files || files ，唯独不能是绝对路径 /files
 * 
 * 2.sep 路径分隔符
 * 不同系统分隔符不一致，windows为\，linux为/
 * 
 * 3.parse 解析路径片段,返回一个对象
 * 
 * 4.join 拼接路径片段
 */
const path = require('path');

// resolve 拼接处规范的绝对路径
const path1 = path.resolve(__dirname, 'files/00古诗.txt');
console.log(path1); // D:\gitresp\nodeAPI\docs\files\00古诗.txt

// 拼接多个路径
const path2 = path.join(__dirname, 'files', '00古诗.txt');
console.log(path2); // D:\gitresp\nodeAPI\docs\files\00古诗.txt

console.log(path.sep); // \

console.log(__filename); // D:\gitresp\nodeAPI\docs\path.js

console.log('完整路径:', __filename);
console.log('目录名:', path.dirname(__filename));
console.log('文件名:', path.basename(__filename));
console.log('扩展名:', path.extname(__filename));
console.log('相对路径:', __filename); // 直接使用


// 转义路径，不然无法输出
let pathstr = __filename.replace(/\\/g, '/');;
console.log('转义路径:', pathstr);

const posixPath = __filename.split(path.sep).join(path.posix.sep);
console.log("转义路径",posixPath);