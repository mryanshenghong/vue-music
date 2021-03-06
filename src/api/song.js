import {commonParams} from './config'
import axios from 'axios'

export function getLyric(mid) {
  const url = 'http://yanshenghong.com:3002/api/vue-music/getLyric'

  const data = Object.assign({}, commonParams, {
    musicid: mid,
    platform: 'yqq',
    hostUin: 0,
    uin:0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json',
    jsonpCallback: 'jsonp1',
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}