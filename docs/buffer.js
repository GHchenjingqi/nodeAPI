/**
 * Buffer 缓冲区，类似JS的数组，存在于内存空间中，用于表示固定长度的字节序列，处理二进制数据。
 * 特点：
 * 1.大小固定，无法调整，不能改变大小
 * 2.每个元素占1字节（byte)，1字节=8bit
 * 
 * 创建Buffer 
 * 1.alloc   —— 分配时，每一个二进制位都会被归0
 * 2.allocUnsafe —— 创建的buffer 会有旧数据，导致每次的值不一致！！！
 * 3.from —— 将对应的字符串转换unicode编码之后，再转成16进制
 * 
 * Buffer 的属性
 * 1.length —— 获取buffer的长度（返回原字符串长度）
 * 2.toString() —— 转换成字符串
 * 3.indexOf —— 查找字符串，返回字符串的索引
 * 4.includes —— 判断字符串是否包含某字符，返回布尔值
 * 4.copy —— 复制buffer
 * 
 * Buffer 获取和修改数据
 * 1.buf[0]
 * 2.buf[0] = 91
 * 
 * Buffer 溢出会扔掉高位
 * 
 * 
 */
// 一、创建Buffer 
// 1. alloc 
let buf = Buffer.alloc(10); // <Buffer 00 00 00 00 00 00 00 00 00 00>
// 2. allocUnsafe
buf = Buffer.allocUnsafe(10000); // 多个<Buffer 70 71 f9.....>
// 3. from
buf = Buffer.from('hello'); // <Buffer 68 65 6c 6c 6f>
console.log(buf);

// 二、Buffer 的属性
// 1. length
console.log(buf.length); // 5
// 2. indexOf
console.log(buf.indexOf('l')); // 2
// includes
console.log(buf.includes('l')); // true
// 3. toString
console.log(buf.toString()); // hello
// 4. copy
let buf2 = Buffer.alloc(10);
buf.copy(buf2, 0, 0, 5); // <Buffer 68 65 6c 6c />

// 获取修改数据
let bb = buf[0].toString(2); // 01101000
console.log(bb);
// 修改数据
buf[0] = 91;
console.log(buf.toString()); // [ello

// 溢出，会舍弃到高位数据
buf[0] = 361; // 0001 0110 1001 
console.log(buf.toString()); // iello   i => 0110 1001 