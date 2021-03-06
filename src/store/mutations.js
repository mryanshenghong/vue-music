import * as types from './mutationTypes'

const mutations = {
    /**
     * 
     * @param {*} state 获取state
     * @param {*} singer 提交mutation传递的参数 singer对象
     */
    [types.SET_SINGER](state, singer) {
        state.singer = singer
    },

    /**
     * 
     * @param {Object} state 获取state
     * @param {Boolean} flag 提交mutation传递参数 Boolean flag
     */
    [types.SET_PLAYING](state, flag) {
        state.playing = flag
    },

    [types.SET_CURRENTINDEX](state, flag) {
        state.fullScreen = flag
    },

    [types.SET_PLAYLIST](state, list) {
        state.playlist = list
    },

    [types.SET_SEQUENCELIST](state, list) {
        state.sequenceList = list
    },

    [types.SET_FULLSCREEN](state,flag){
        state.fullScreen = flag
    },

    [types.SET_MODE](state, mode) {
        state.mode = mode
    },

    [types.SET_CURRENTINDEX](state, index) {
        state.currentIndex = index
    },
    [types.SET_DISC](state,disc){
        state.disc = disc
    },
    [types.SET_TOPLIST](state,topList){
        state.topList = topList
    },
    [types.SET_SEARCHHISTORY](state,history){
        state.searchHistory = history
    },
    [types.SET_PLAY_HISTORY](state,history){
        state.playHistory = history
    },
    [types.SET_FAVORITELIST](state,list){
        state.favoriteList = list
    }
}

export default mutations