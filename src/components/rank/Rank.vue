<template>
    <div class="rank" ref="rank">
        <Scroll class="toplist" ref="toplist">
            <ul>
                <li class="item" v-for="(item,index) in topList" :key="index" @click="selectItem(item)">
                    <div class="icon">
                        <img width="100" height="100" v-lazy="item.picUrl">
                    </div>
                    <ul class="songlist">
                        <li class="song" v-for="(song,index) in item.songList" :key="index">
                            <span>{{index + 1}}</span>
                            <span>{{song.songname}}-{{song.singername}}</span>
                        </li>
                    </ul>                    
                </li>
            </ul>
            <div class="loading-container" v-show="!topList.length">
                <Loading />>
            </div>
        </Scroll>
        <transition name="slide">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
import { getTopList } from '@/api/rank'
import { ERR_OK} from '@/api/config'
import Scroll from '@/base/scroll/Scroll'
import Loading from '@/base/loading/Loading'
import { playlistMixin } from '@/common/js/mixin'
import  { mapMutations } from 'vuex'
export default {
    mixins:[playlistMixin],
    data(){
        return {
            topList:[]
        }
    },
    components:{
        Scroll,
        Loading
    },
    methods:{
        selectItem(item){
            this.$router.push({path: `/rank/${item.id}`})
            this.setTopList(item)
        },
        _getTopList(){
            getTopList().then( res => {
                if(res.code === ERR_OK){
                    this.topList = res.data.topList
                }
            })
        },
        handlePlaylist(playlist){
            const bottom =  playlist.length ? '60px' : '0'
            this.$refs.rank.style.bottom = bottom
            this.$refs.toplist.refresh()
        },
        ...mapMutations({
            setTopList: 'SET_TOPLIST'
        })
    },
    created(){
        this._getTopList()
    }
}
</script>
<style lang="scss" scoped>
@import "@/common/scss/const.scss";
@import "@/common/scss/mixin.scss";

.rank {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  .toplist {
    height: 100%;
    overflow: hidden;
    .item {
      display: flex;
      margin: 0 20px;
      padding-top: 20px;
      height: 100px;
      &:last-child {
        padding-bottom: 20px;
      }
      .icon {
        flex: 0 0 100px;
        width: 100px;
        height: 100px;
      }
      .songlist {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        height: 100px;
        overflow: hidden;
        background: $color-highlight-background;
        color: $color-text-d;
        font-size: $font-size-small;
        .song {
          @include no-wrap();
          line-height: 26px;
          .singername {
            color: rgba(255, 255, 255, 0.2);
          }
        }
      }
    }
    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
    .slide-enter-active, .slide-leave-active{
        transition: all 0.3s ease;
    }

    .slide-enter, .slide-leave-to{
        transform: translate3d(100%,0,0)
    }  
}
</style>