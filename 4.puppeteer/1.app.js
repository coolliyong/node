const puppeteer = require('puppeteer');

// page对象操作

(async () => {
    const browser = await puppeteer.launch({
        executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', //指定chromium浏览器位置;
    });
    const page = await browser.newPage(); //新开一个 page 页面 得到一个page 对象
    await page.goto('https://www.baidu.com'); //页面打开到
    
    await browser.close(); //关闭浏览器
})();

// 网页操作 || 获取dom数据



// 下载图片 



// 设置Cookies || Header



// 设置代理
