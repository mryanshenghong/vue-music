import * as types from './mutationTypes'
import { playMode } from '@/common/js/config'
import { shuffle } from '@/common/js/util'
import { saveSearch, deleteSearch, clearSearch } from '@/common/js/cache'
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

export const insertSong = function ({commit,state},song) {
    // 不能直接操作 state.playlist 只能操作他的副本 使用array.slice()
    let playlist = state.playlist.slice()
    let sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex
    // 记录当前歌曲
    let currentSong = playlist[currentIndex]

    // 查找这首歌在不在播放列表里面
    let fpIndex = findIndex(playlist,song)
    // 插入歌曲，索引+1
    currentIndex++
    // 插入这首歌到当前索引位置
    playlist.splice(currentIndex,0,song)
    //判断如果包含了这首歌
    if(fpIndex > -1){
        // 从列表中删除掉这首歌

        //如果当前插入的序号，大于列表中的需要
        if(currentIndex > fpIndex ){
            playlist.splice(fpIndex,1)
            currentIndex--
        }else{
            playlist.splice(fpIndex+1,1)
        }
    }

    //修改sequenceList
    let currentSIndex = findIndex(sequenceList,currentSong) + 1

    let fSIndex = findIndex(sequenceList,song)
    sequenceList.splice(currentIndex,0,song)
    
    if(fSIndex > -1 ){
        if(currentIndex > fSIndex){
            sequenceList.splice(fSIndex, 1)
        }else{
            sequenceList.splice(fSIndex+1,1)
        }
    }

    commit(types.SET_PLAYLIST,playlist)
    commit(types.SET_SEQUENCELIST, sequenceList)
    commit(types.SET_CURRENTINDEX,currentIndex)
    commit(types.SET_FULLSCREEN,true)
    commit(types.SET_PLAYING,true)   
}

export const saveSearchHistory = function({commit},query){
    commit(types.SET_SEARCHHISTORY, saveSearch(query))
}

export const deleteSearchHistory = function( {commit},query){
    commit(types.SET_SEARCHHISTORY,deleteSearch(query))
}

export const clearSearchHistory = function({commit}){
    commit(types.SET_SEARCHHISTORY, clearSearch())
}