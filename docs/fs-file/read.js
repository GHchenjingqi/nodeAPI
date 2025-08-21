/**
 * fs 模块 —— 读取文件
 * 
 * 读取场景：
 * 电脑开机、程序运行、查看文件、播放音乐和视频
 * 
 * 1.同步读取
 * readFile(path, [options?], callback)
 * 
 * 2.异步读取
 * readFileSync(path, [options?])
 * 
 * 3.流式读取
 * 创建流通道：rs = fs.createReadStream(path)
 * 读取数据,chunk为数据块，最大长度65536字节（64kb),也就是每次读取64kb的流数据
 * rs.on('data', chunk=>{ })
 * */

const fs = require('fs');
// 1.按utf-8 异步读取
fs.readFile('./files/古诗.txt', 'utf-8', function (err, data) { 
    if (err) {
        console.log(err);
    } else {
        console.log("异步读取："+data);
    }
});

// 2.按utf-8 同步读取
const data = fs.readFileSync('./files/古诗3.txt', 'utf-8');
console.log("同步读取："+data);

// 3.流式读取
const rs = fs.createReadStream('./files/古诗.txt');
rs.on('data', function (chunk) { 
    console.log("流式读取："+chunk.length +"字节");
});
rs.on('end', function () { 
    console.log("流式读取结束");
});