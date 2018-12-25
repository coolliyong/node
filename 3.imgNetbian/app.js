const request = require('request');
const rp = require('request-promise');
const cheerio = require('cheerio');
const iconv = require("iconv-lite");
const fs = require('fs');


const host = 'http://desk.zol.com.cn';
let base_dir = 'D:/img/'

/**
 * main 入口函数
 * 创建文件夹 开始请求
 */
function mian() {
    fs.mkdir(base_dir, function (err) {
        if (err) {
            console.log(`${base_dir}目录创建不成功,下载图片将会存在当前文件夹`);
            base_dir = './';
            // return console.error(err);
        }
        console.log(`${base_dir}目录创建成功,下载图片将会存在:${base_dir}`);
    });
    const _url = host + '/pc/';
    _request(_url, null, parse)
}

/**
 * 列表页回调函数，传入 body:Html
 * @param {String} body 
 */
function parse(body) {
    if (body) {
        console.log('----body解析中----');
        const _body = iconv.decode(body, 'gb2312');
        const $ = cheerio.load(_body);
        const imgs = $('.main .pic-list2 li a');
        if (imgs && imgs.length) {
            imgs.each((i, v) => {
                const _title = v;
                const _src = $(v).attr('href');
                console.log(_src);
                _request(host + _src, null, datail);
            });
        }
        const next = $('#pageNext');
        if (next && next.length) {
            //如果存在下一页
            const _url = $(next).attr('href');
            if (_url) {
                console.log(`----下一页::${_url}----`);
                _request(host + _url, null, parse);
            }
        }
    }
}

/**
 * 详情页回调函数，传入 body:Html
 * @param {String} body 
 */
function datail(body) {
    if (body) {
        console.log('----datail解析中----');
        const _body = iconv.decode(body, 'gb2312');
        const $ = cheerio.load(_body);
        const img = $('#bigImg').attr('src');
        const title = $('#titleName').text();
        downloadImg(img, title);

    }
}

/**
 * 图片下载函数
 * @param {String} url 图片地址
 * @param {String} title  图片标题、无去重功能
 */
function downloadImg(url, title) {
    try {
        const file = `${base_dir}${title}.jpg`
        console.log(`${title}下载中`);
        request(url).pipe(fs.createWriteStream(file)); //下载图片
    } catch (error) {
        console.log(`图片下载失败,${err}`)
    }
}

/**
 * 请求函数
 * @param {String} url url地址
 * @param {Number} page 页码 如果有页码自行拼装
 * @param {Function} cb  请求完成后的回调函数
 */
function _request(url, page, cb) {
    if (page) {
        url = `${url}/${page}`;
    }
    console.log(`==== request :${url} ====`);
    rp({
            url,
            encoding: null, //设置encoding 
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML,like,Gecko) Chrome/68.0.3440.106 Safari/537.36',
                'Referer': 'http://www.baidu.com/'
            }
        })
        .then(res => {
            cb.call(this, res);
        })
        .catch(err => {
            console.log(`err:${url}--${err}`);
        });
}
mian();