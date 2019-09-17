export const singer_getter = state =>  state.singer

export const playing_getter = state => state.playing

export const fullScreen_getter = state => state.fullScreen

export const playlist_getter = state => state.playlist

export const sequenceList_getter = state => state.sequenceList

export const mode_getter = state => state.mode

export const currentIndex_getter = state => state.currentIndex

export const currentSong = (state) => {
    return state.playlist[state.currentIndex] || {}
}