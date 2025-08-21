/**
 * fs 模块 - 文件夹读取，返回文件夹下的文件名数组
 * 
 * 1.异步读取文件夹
 * readdir(path, callback)
 * 2.同步读取文件夹
 * readdirSync(path)
 */
 
var fs = require('fs');

// 1.异步文件夹读取
fs.readdir('./files',(err, files)=>{
    if(err){
        console.log(err);
    }else{
        console.log(files);
    }
});
// 2.同步文件夹读取
fs.readdirSync('./files');