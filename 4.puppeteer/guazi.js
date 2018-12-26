const puppeteer = require('puppeteer');

//瓜子二手车爬取
// .carlist  li a 
const list = 'https://www.guazi.com/bj/buy/';


(async () => {
    try {
        const browser = await puppeteer.launch({
            // headless: false, //是否打开浏览器
            executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', //指定chromium浏览器位置;
        });
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36');
        await page.setViewport({
            width: 1920,
            height: 768
        });
        await page.goto(list);
        // ('.js-uc-new')
        page.once('load', async () => {
            let title = await page.title();
            console.log(`title:${title}`);
            console.log(await page.content());
            let lis = await page.$eval('.carlist', els => els);
            console.log(lis);


            await browser.close();
        });


    } catch (error) {

    }

})();