# -*- coding: utf-8 -*-
import scrapy
from zolBizhi.items import ZolbizhiItem

class ZolSpider(scrapy.Spider):
    name = 'zol'
    host = 'http://desk.zol.com.cn'
    # allowed_domains = ['http://zol.com.cn']
    start_urls = ['http://desk.zol.com.cn/pc/']
    # 如果是图片下载 则需要是数组
    items = ZolbizhiItem()
    

    def parse(self, response):
        # .main .pic-list2 li a
        # print(response.body.decode('gb2312'))
        els_a =  response.xpath('//div[@class="main"]//*[@class="pic-list2  clearfix"]/li//a')
        if els_a:
            for i in els_a:
                _url = i.xpath('./@href').extract_first()
                _url = self.host + _url
                yield scrapy.Request(_url,self.datail)
        next_url = response.xpath('//*[@id="pageNext"]/@href').extract_first()
        if next_url:
            print('下一页')
            yield scrapy.Request(self.host+next_url,self.parse)

    def datail(self,response):
        imgs = []
        _img = response.xpath('//img[@id="bigImg"]/@src').extract_first()
        _title = response.xpath('//*[@id="titleName"]/text()').extract_first()
        print('%s 解析图片: %s' % (_title,_img))
        imgs.append({
            'title':_title,
            'url':_img
        })
        self.items['imgs'] = imgs
        yield self.items
