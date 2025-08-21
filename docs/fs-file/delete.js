/**
 * fs 模块 - 文件删除
 * 
 * 1.异步删除
 * unlink(path, callback)
 * 2.同步删除
 * unlinkSync(path)
 * 3.rm(path, options, callback)
 * */

const fs = require('fs');

// 1.文件删除
fs.unlink('./files/001.txt',(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('删除成功');
    }
});
// 2.同步删除
fs.unlinkSync('./files/001.txt');

// 3.rm(path, options, callback)
fs.rm('./files/001.txt',{force:true},(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('删除成功');
    }
});