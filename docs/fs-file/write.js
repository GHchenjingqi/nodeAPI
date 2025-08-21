/**
 * fs 模块 —— 写入文件
 * 
 * 使用场景：
 * 文件下载、应用安装、编辑保存、日志保存、录制视频等
 * 
 * 1.异步（不会等结果）写入文件
 * writeFile(path, data, [options?], callback)
 * 实现一个需求：新建一个 古诗.txt ,写入：静夜思
 * 
 * 2.同步（会等结果）写入文件,会阻塞主线程， 类似JS的 await（js的await只是“看起来像是同步”，await后面的代码被放到了then中）
 * writeFileSync(path, data, [options?])
 * 
 * 3.追加写入 - 异步（不会等结果）
 * appendFile(path, data, [options?], callback)
 * 
 * 4.追加写入 - 同步（会等结果）
 * appendFileSync(path, data, [options?])
 * 
 * 5.文件流式写入
 * 创建流通道：ws = fs.createWriteStream(path)
 * 写入数据：ws.write(data) 
 * 关闭通道：ws.close()
 * */

const fs = require('fs');

// 写入
const text = '《静夜思》\n唐·李白\n床前明月光，疑是地上霜。\n举头望明月，低头思故乡。';
fs.writeFile('./files/古诗.txt', text, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('写入成功');
    }
});
console.log(2); // 先执行2，再执行写入成功，因此 writeFile 是异步写入
// 同步写入
fs.writeFileSync('./files/古诗2.txt', text);

// 异步追加
fs.appendFile('./files/古诗.txt', '\n白日依山尽，黄河入海流。', function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('追加成功');
    }
});

// 同步追加
fs.appendFileSync('./files/古诗2.txt', "\n欲穷千里目，更上一层楼。");


// 5.流式写入
const ws = fs.createWriteStream('./files/古诗3.txt');
ws.write('白日依山尽\n');
ws.write('接天莲叶无穷碧\n');
ws.close()
