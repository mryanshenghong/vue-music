import * as types from './mutationTypes'
import { playMode } from '@/common/js/config'
import { shuffle } from '@/common/js/util'
/**
 * 
 * @param {Object,Object} param0 action 默认对象 mutation commit, original state
 * @param {Array,Number} param1 播放列表, 歌曲索引
 */

export const selectPlay = function({commit,state},{list,index}) {
    commit(types.SET_SEQUENCELIST,list)
    if(state.mode === playMode.random){
        let randomList = shuffle(list)
        commit(types.SET_PLAYLIST,randomList)
        index = findIndex(randomList,list[index])
    }else{
       commit(types.SET_PLAYLIST,list) 
    }
    commit(types.SET_CURRENTINDEX,index)
    commit(types.SET_FULLSCREEN,true)
    commit(types.SET_PLAYING,true)
}

//进入歌手详情页面 点击随机播放
export const randomPlay = ({commit},{list}) =>{
    commit(types.SET_MODE, playMode.random)
    commit(types.SET_SEQUENCELIST,list)
    let randomlist = shuffle(list)
    commit(types.SET_PLAYLIST, randomlist)
    commit(types.SET_CURRENTINDEX,0)
    commit(types.SET_FULLSCREEN,true)
    commit(types.SET_PLAYING,true)    
}

function findIndex(list,song){
    return list.findIndex( (item) => {
      return  item.id === song.id
    })
}