/**
 * fs 模块 - 文件夹创建
 * 
 * 1.异步文件夹创建
 * mkdir(path, options, callback)
 *    options：
 *      recursive: true, 递归创建
 * 2.同步文件夹创建
 * mkdirSync(path, options)
 * 3.多层级文件夹创建
 * fs.mkdirSync('./html3/a/b', { recursive:true });
 * 
 */

// 1.异步文件夹创建
fs.mkdir('./html',(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('创建成功');
    }
});
// 同步创建
fs.mkdirSync('./html3');
// 3.递归创建多层级目录
fs.mkdirSync('./html3/a/b', { recursive:true});