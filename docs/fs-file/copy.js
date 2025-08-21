/**
 * fs 模块 - 复制文件
 *
 * 1.使用 readFileSync + writeFileSync 结合
 * 2.流式复制
 * const rs2 = fs.createReadStream('./files/古诗.txt');
 * const ws2 = fs.createWriteStream('./files/古诗5.txt');
 * // 方式1：读取复制
 * rs2.on('data', function (chunk) { 
 *    ws2.write(chunk);
 * });
 * // 方式2：管道复制
 * rs2.pipe(ws2); // 将一个可读流的数据“管道”到一个可写流。
 * */

const fs = require('fs');

// 1.同步复制 ,会占用磁盘空间比较大
const data = fs.readFileSync('./files/古诗.txt');
fs.writeFileSync('./files/古诗4.txt', data);

// 2.流式复制，更节约资源
const rs2 = fs.createReadStream('./files/古诗.txt');
const ws2 = fs.createWriteStream('./files/古诗5.txt');
// rs2.on('data', function (chunk) { 
//    ws2.write(chunk);
// });
rs2.pipe(ws2);
