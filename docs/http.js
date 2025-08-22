/**
 * http 模块 
 * 
 * http协议： 是对浏览器和服务区的约束协议：请求与响应
 * 
 * 一.创建服务
 * server = http.createServer((req,res)=>{
 *      请求信息：
 *      req.method    请求方式 GET POST
 *      req.url       请求路径
 *      req.headers   请求头,内容如下：
            {
                host: '127.0.0.1:30001',
                connection: 'keep-alive',
                pragma: 'no-cache',
                'cache-control': 'no-cache',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-mode': 'no-cors',
                'sec-fetch-dest': 'empty',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
                'accept-encoding': 'gzip, deflate, br, zstd',
                'accept-language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7'
            }
 *      req.httpVersion  http版本 1.1
 *      
 *      响应信息：
 *      // 设置响应头 比如：Content-Type
 *      res.statusCode = 401  // 状态码
 *      res.setHeader('key','value') // 设置响应头，也可以自定义，当值为数组的时候，就设置了多个同名响应头
 *      res.writeHead(200,{ 'Content-Type':'text/html;charset=utf-8' }) // 设置响应头和状态码
 *      res.write('hello world') // 向响应流中写入一部分响应体
 *      res.end("你好") // 结束响应,并发送最后一段数据（字符串或Buffer对象）
 * })
 * 
 * 1.服务监听
 * server.listen(port,callback)
 * 
 * 2.获取req请求信息还可以
 * 方法2：用url 模块
 * const url = require('url')
 * const urlObj = url.parse(req.url,true) 
        {
            protocol: null,
            slashes: null,
            auth: null,
            host: null,
            port: null,
            hostname: null,
            hash: null,
            search: '?web=10',
            query: { web: '10' },
            pathname: '/',
            path: '/?web=10',
            href: '/?web=10'
        }
 * 方法3：用html5的URL对象
 * const url =  new URL(req.url,'http://127.0.0.1')  // 必须是完整的url路径
        {
            href: 'http://127.0.0.1/?web=10',
            origin: 'http://127.0.0.1',
            protocol: 'http:',
            username: '',
            password: '',
            host: '127.0.0.1',
            hostname: '127.0.0.1',
            port: '',
            pathname: '/',
            search: '?web=10',
            searchParams: URLSearchParams { 'web' => '10' },
            hash: ''
        }
 * url.searchParams.get('web') // 获取query参数
 *
 * 3.mime类型 - 媒体类型/资源类型
 * 类型结构： [type]/[subtype]
 * 例如： text/html  text/css  text/javascript application/json  image/png  image/jpeg  video/mp4  audio/mpeg  application/octet-stream - 下载类型
 *
 */

const http = require('http')
const url = require('url')
const server = http.createServer((req,res)=>{
    // console.log(req.headers)

    // const urlObj = url.parse(req.url,true)
    // console.log(urlObj.pathname)

    const urls =  new URL(req.url,'http://127.0.0.1')
    console.log(urls)


    res.setHeader('Content-Type','text/html;charset=utf-8')
    res.setHeader('custom',['a','b'])
    // res.writeHead(200,{
    //     'Content-Type':'text/html;charset=utf-8'
    // })
    res.statusCode = 401
    res.write('<h1>hello world</h1>')
    res.end('你好')
})

// 启动服务,监听端口
server.listen(30001,()=>{
    console.log('server is listening 30001')
})