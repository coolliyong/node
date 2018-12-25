const fs = require('fs');

// FS文件模块
// 当使用同步操作时，任何异常都会立即抛出，可以使用 try/catch 处理异常。



// 读取文件
/*
fs.readFile('./readme.md', 'utf-8', function(err, data) {
    // 读取文件失败/错误
    if (err) {
        throw err;
    }
    // 读取文件成功
    console.log(data.toString());
　　//直接用console.log(data);也可以
});
const file = fs.readFileSync('./readme.md','utf-8');
console.log(file.toString())
*/


//写入文件
// fs.writeFile('./readme.md', 'test test', function(err) {
//     if (err) {
//         throw err;
//     }
//     console.log('存入成功');
//     // 写入成功后读取测试
//     fs.readFile('./readme.md', 'utf-8', function(err, data) {
//         if (err) {
//             throw err;
//         }
//         console.log(data.toString());
//     });
// });
// 因为默认flag='w'是写，会清空文件，想要追加，可以传递一个flag参数，如下。
const fff = fs.writeFileSync('./readme.md', '\n\ntest\n test\n', { 'flag': 'a' });
console.log(fff);

/*
//删除文件
fs.unlink('/tmp/shiyanlou', function(err) { //异步操作
    if (err) {
        throw err;
    }
    console.log('成功删除了 /tmp/shiyanlou');
});

fs.unlinkSync('/tmp/shiyanlou'); // Sync 表示是同步方法
console.log('成功删除了 /tmp/shiyanlou');
*/