import jsonp from '../common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'
export function getRecommend() {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

    const data = Object.assign({},commonParams,{
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    })

    return jsonp(url,data,options)
}



export function getSongList(disstid) {
    const url = 'http://yanshenghong.com:3002/api/vue-music/getSongList'
    const data = Object.assign({}, commonParams, {
      disstid,
      type: 1,
      json: 1,
      format:'json',
      utf8: 1,
      onlysong: 0,
      platform: 'yqq',
      hostUin: 0,
      needNewCode: 0,
      loginUin:0
    })
  
    return axios.get(url,{
      params:data
    }).then( res=>{
      return Promise.resolve(res.data)
    }).catch( err => {
      return Promise.reject(err)
    })
  }