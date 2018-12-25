const cheerio = require('cheerio');

const html = `<ul>
        <li class="li1">text1</li>
        <li class="li2">text2</li>
        <li class="li3">text3</li>
    </ul>`;

//加载html
const $ = cheerio.load(html);
const li2 = $('ul>li:nth-child(2)'); //li第二个 或者.li2
console.log($(li2).text()); //text2
console.log($(li2).attr('class')); // li2

//遍历
const lis = $('ul>li');
if(lis&&lis.length){
    lis.each((i,el)=>{
        console.log(`index:${i}`);
        console.log(`el:${el}`);
    });
}