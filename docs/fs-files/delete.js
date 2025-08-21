/**
 * fs 模块 - 文件夹创建、读取、删除
 * 
 * 1.异步文件夹删除 - 只能删除非空目录
 * rmdir(path, callback)
 * 2.同步文件夹删除
 * rmdirSync(path) - 只能删除非空目录
 * 3 rm
 * rm('./html3',{ recursive:true },callback)
 */

const fs = require('fs');




// 删除目录非空目录，会有警告说新版会移除rmdir，让使用rm
fs.rmdir('./html3',{ recursive:true },(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('删除成功');
    }
});
// 添加recursive:true可以多层级删除
fs.rm('./html3',{ recursive:true },(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('删除成功');
    }
});