# -*- coding: utf-8 -*-
import re
from scrapy.pipelines.images import ImagesPipeline
from scrapy import Request

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html


class ZolbizhiPipeline(ImagesPipeline):
    def get_media_requests(self, item, spider):
        for i in item['imgs']:
            _url = i['url']
            _title = i['title']
            print('%s正在下载图片' % _title)
            yield Request(i['url'],meta={'name':i['title']})

    # 重命名，若不重写这函数，图片名为哈希，就是一串乱七八糟的名字
    def file_path(self, request, response=None, info=None):
        # 提取url前面名称作为图片名。
        # image_guid = request.url.split('/')[-1]
        # 提取 后缀名
        after = request.url.split('.')[-1]
        if after != '.jpg' and after != '.JPG' and after != '.png' and after != '.PNG':
            after = '.jpg'
        # 接收上面meta传递过来的图片名称
        name = request.meta['name']
        # 过滤windows字符串，不经过这么一个步骤，你会发现有乱码或无法下载
        name = re.sub(r'[？\\*|“<>:/]', '', name)
        # 分文件夹存储的关键：{0}对应着name；{1}对应着image_guid
        # filename = u'{0}/{1}'.format(name, image_guid)
        return name + after

