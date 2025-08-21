/**
 * http 模块 
 * 
 * http协议： 是对浏览器和服务区的约束协议：请求与响应
 * 
 * 
 */

const http = require('http')
const server = http.createServer((req,res)=>{

    res.writeHead(200,{
        'Content-Type':'text/html;charset=utf-8'
    })
    res.write('<h1>hello world</h1>')
    res.end()
})

// 启动服务,监听端口
server.listen(30001,()=>{
    console.log('server is listening 30001')
})