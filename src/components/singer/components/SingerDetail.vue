<template>
    <transition name="slide1">
        <MusicList :title="title" :songs="songs" :bgImage="bgImage"></MusicList>
    </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from '@/api/singer'
import { ERR_OK } from '@/api/config'
import { createSong } from '@/common/js/song'
import MusicList from '@/components/music-list/MusicList'
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
            return this.singer_getter.name
        },
        bgImage(){
            return this.singer_getter.avatar
        },
        ...mapGetters([
            //将getting里面的singer映射到本地组件的一个数据singer
            'singer_getter'
        ])
    },
    methods:{
        _getDetail(){
            if(!this.singer_getter.id){
                this.$router.push('/singer')
                return 
            }
            // console.log("开始请求歌手歌曲")
            getSingerDetail(this.singer_getter.id).then( (res) => {
                // console.log(res)
                if( res.code === ERR_OK){
                    this.songs = this._normalizeSongs(res.data.list)
                    // console.log(this.songs)
                }
            }).catch( (err) => {

            })
        },
        _normalizeSongs(list){
            let res = []
            list.forEach(element => {
                let {musicData} = element
                if(musicData.songid && musicData.albummid){
                    res.push(createSong(musicData))
                }
            })
            return res
        }
    },
    // created(){
    //     this._getDetail()
    // },
    
    deactivated(){
        this.songs = []
    },
    activated(){
        this._getDetail()
    }
}
</script>

<style lang="scss" scoped>
    @import "@/common/scss/const.scss";

    .slide1-enter-active, .slide1-leave-active {
        transition: all .3s ease;
    }
    .slide1-enter, .slide1-leave-to {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }

</style>