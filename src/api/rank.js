import jsonp from '../common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

export function getTopList(){
    const url = "https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg"

    const data = Object.assign( {} , commonParams, {
        plateform:'h5',
        needNewCode:1
    })
    return jsonp(url,data,options)
}
export function getMusicList(topid){
    const url = "https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg"

    const data = Object.assign({},commonParams,{
        topid,
        needNewCode: 1,
        tpl: 3,
        page: 'detail',
        type: 'top',
        platform: 'h5',
    })

    return jsonp(url, data, options)
}