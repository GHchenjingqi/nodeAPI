const http = require('http')
const fs = require('fs')
const path = require('path')
const app = http.createServer((req,res)=>{
    res.setHeader('Content-Type','text/html;charset=utf-8')
    let { pathname } = new URL(req.url, 'http://127.0.0.1')
    // 根据路径返回不同的资源，以下做法当资源较多时不适合
    // if (pathname === '/') {
    //     // 读取文件并返回
    //     let html = fs.readFileSync( path.resolve(__dirname,'../files/index.html'))
    //     res.end(html)
    // }else{
    //     res.end('404 not found')
    // }

    // 多文件读取
    let filePath = path.resolve(__dirname,'../files'+pathname)
    console.log(filePath)
    fs.readFile(filePath,(err,data)=>{
        if (err) {
            res.statusCode = 404
            res.end('404 not found')
        }else{
            res.end(data)
        }
    })
})
app.listen(30002)