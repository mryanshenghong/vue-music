<template>
    <transition name="slide">
        <music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script>
import MusicList from '@/components/music-list/MusicList'
import { mapGetters } from 'vuex'
import { getSongList } from '@/api/recommend'
import { ERR_OK } from '@/api/config'
import { createSong } from '@/common/js/song'
export default {
    data(){
        return {
            songs:[]
        }
    },
    components:{
        MusicList        
    },
    computed:{
        title(){
            return this.disc_getter.songListDesc
        },
        bgImage(){
            return this.disc_getter.picUrl
        },
        ...mapGetters(['disc_getter'])
    },
    methods:{
        _getSongList(){
            if(!this.disc_getter.id){
                this.$router.push('/recommend')
                return 
            }
            getSongList(this.disc_getter.id).then( res => {
                if(res.code === ERR_OK){
                    this.songs = this._normalizeSongs(res.cdlist[0].songlist)
                }
            })
        },
        _normalizeSongs(songs){
            let ret = []
            songs.forEach(element => {
                if(element.songid && element.albumid){
                    ret.push(createSong(element))
                }
            })
            return ret
        }
    },
    created(){
        this._getSongList()
    }
}
</script>
<style lang="scss" scoped>
    .slide-enter-active, .slide-leave-active{
        transition: all .3s;
    }

    .slide-enter, .slide-leave-to{
        transform: translate3d(100%,0,0);
    }
</style>