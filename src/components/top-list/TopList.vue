<template>
    <MusicList :title="title" :bgImage="bgImage" :songs="songs" :rank="rank"></MusicList>
</template>

<script>
import MusicList from '@/components/music-list/MusicList'
import { mapGetters } from 'vuex'
import { getMusicList } from '@/api/rank'
import { ERR_OK } from '@/api/config'
import { createSong } from '@/common/js/song'
export default {
    data(){
        return {
            songs:[],
            rank: true
        }
    },
    components:{
        MusicList
    },
    computed:{
        title(){
            return this.topList_getter.topTitle
        },
        bgImage(){
            if(this.songs.length){
                return this.songs[0].image
            }
        },
        ...mapGetters(['topList_getter'])
    },
    methods:{
        _getMusicList(){
            if(!this.topList_getter.id){
                this.$router.push('/rank')
                return 
            }
            getMusicList(this.topList_getter.id).then( res => {
                if(res.code === ERR_OK){
                    this.songs = this._nomarlizeSongs(res.songlist)
                }
            })
        },
        _nomarlizeSongs(list){
            let ret = []
            list.forEach(element => {
                const musicData = element.data
                if(musicData.songid && musicData.albumid){
                    ret.push(createSong(musicData))
                }
            });
            return ret
        }
    },
    created() {
        this._getMusicList()
    }
}
</script>
<style lang="scss" scoped>

</style>