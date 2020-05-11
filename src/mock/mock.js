import Mock from 'mockjs'
import data from './data.json'
Mock.mock('/index_category', { code: 0, data: data.categorys })
Mock.mock('/goods', { code: 0, data: data.goods })
Mock.mock('/rating', { code: 0, data: data.ratings })
Mock.mock('/info', { code: 0, data: data.info })