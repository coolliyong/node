# -*- coding: utf-8 -*-
import scrapy
import json
import demjson
from shuiguo.items import ShuiguoItem

class SjSpider(scrapy.Spider):
    name = 'sj'
    allowed_domains = ['www.cnhnb.com']
    start_urls = ['http://www.cnhnb.com/p/sgzw/']
    items = ShuiguoItem()

    def parse(self, response):
        # $('#imgList>ul>ul li')
        els_a =  response.xpath('//*[@id="imgList"]/ul/ul//li/a[1]')
        if els_a:
            for i in els_a:
                _url = i.xpath('./@href').extract_first()
                yield scrapy.Request(_url,self.datail)
        next_url = response.xpath('/html/body/div[4]/div[6]/center/a[text()="下一页"]')
        if next_url:
                next_url = next_url.xpath('./@href').extract_first()
                if next_url:
                    yield scrapy.Request(next_url,self.parse)

    def datail(self,response):
        _title = response.xpath('/html/body/div[4]/div[2]/div[1]/div[2]/div[1]/h1/text()').extract_first()
        _price = response.xpath('/html/body/div[4]/div[2]/div[1]/div[2]/div[4]/p/span[2]/text()').extract_first()
        _main_img = response.xpath('//*[@id="prdGallery"]//div[@class="main-pic"]/a/@href').extract_first()
        
        _img_list =  response.xpath('//*[@id="prdGallery"]//ul[@class="thumb clearfix"]//a/@rel').extract()# 图片列表 list json 数据

        _imgs = []
        for i in _img_list:
            j = demjson.decode( i )
            _imgs.append(j['largeimage'])


        _datail = response.xpath('//*[@id="productDetail"]/text()').extract_first()# 商品详情 productDetail

        _price = _price.replace(' ','')
        _price = _price.replace('\n','')
        _price = _price.replace('\t','')

        # print(_main_img)
        # print(_imgs)

        self.items['name'] = _title
        self.items['price'] = _price
        self.items['main_img'] = _main_img
        self.items['img_list'] = _imgs
        self.items['datail'] = _datail

        yield self.items