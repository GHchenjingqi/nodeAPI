/**
 * fs 模块 - 文件移动和重命名
 * 
 * 1.异步移动重命名
 * rename(oldPath, newPath, callback)
 * 2.同步移动重命名
 * renameSync(oldPath, newPath)
**/

const fs = require('fs');

// 1.同步文件移动+重命名
fs.renameSync('./files/ascll.png', './docs/asc.png');

// 2.异步文件移动+重命名
fs.rename('./files/ascll.png', './docs/asc.png', function (err) { 
    if (err) {
        console.log(err);
    } else {
        console.log("异步文件移动成功");
    }
});