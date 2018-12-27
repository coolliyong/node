# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class ShuiguoItem(scrapy.Item):
    # define the fields for your item here like:
    name = scrapy.Field() #名字
    price = scrapy.Field() #价格
    main_img = scrapy.Field() # 商品主图
    img_list =  scrapy.Field() # 图片列表
    datail = scrapy.Field() # 商品详情 productDetail
