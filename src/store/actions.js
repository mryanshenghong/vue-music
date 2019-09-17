import * as types from './mutationTypes'
/**
 * 
 * @param {Object,Object} param0 action 默认对象 mutation commit, original state
 * @param {Array,Number} param1 播放列表, 歌曲索引
 */
export const selectPlay = function({commit,state},{list,index}) {
    commit(types.SET_SEQUENCELIST,list)
    commit(types.SET_PLAYLIST,list)
    commit(types.SET_CURRENTINDEX,index)
    commit(types.SET_FULLSCREEN,true)
    commit(types.SET_PLAYING,true)
}