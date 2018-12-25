const request = require('request');
const rp = require('request-promise');
const fs = require('fs');
//普通请求
// request('http://www.baidu.com/',(err,response,body)=>{
//     if(err){
//         throw err;
//     }
//     console.log(body); //www.baidu.com/index.html 的内容
// });


//异步请求
// rp('http://www.baidu.com/')
// .then(res=>{
//     console.log(res);
// })
// .catch(err=>{
//     console.log(err);
// })

//流文件
//图片下载 request-promise 不能下载文件
const file = "https://upload.jianshu.io/users/upload_avatars/7232100/3ac5a4a7-eb45-4bff-8413-3c0b4684ad6d?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120";
request(file).pipe(fs.createWriteStream('li.png')); //下载图片


// cookie headers设置
rp({
        "url": 'https://www.baidu.com',
        "headers": {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
            'Cookie': 'abc=123'
        },
    })
    .then(res => {
        console.log('res');
        const result = /q857637472/i.exec(res);
        if (result && result[0]) {
            console.log(result[0]);
        }
    })
    .catch(err => {
        console.log(err);
    })


//设置代理
// const r = request.defaults({
//     'proxy': 'http://localproxy.com'
// });
// http.createServer(function (req, resp) {
//     if (req.url === '/doodle.png') {
//         r.get('http://google.com/doodle.png').pipe(resp)
//     }
// })