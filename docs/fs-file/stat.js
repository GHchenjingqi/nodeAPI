/**
 * fs 模块 - 查看资源状态
 *
 * 1.异步获取文件信息
 * stat(path, callback)
 * 2.同步获取文件信息
 * res = statSync(path)
 *    
 *   res解读
 *      isFile()  是否是文件，返回布尔值
 *      isDirectory()  是否是目录，返回布尔值
 * */

const fs = require('fs');
// 1.异步获取文件信息
fs.stat('./files/古诗.txt', function(err, stats) { 
    if (err) {
        console.log(err);
        return
    }
    console.log(stats);
});
// 2.同步获取文件信息
let stat = fs.statSync('./files/古诗.txt');
console.log(stat);