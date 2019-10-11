<template>
  <transition name="slide">
      <div class="add-song" v-show="showFlag" @click.stop>
          <div class="header">
              <h1 class="title">添加歌曲到列表</h1>
              <div class="close" @click="hide">
                  <i class="icon-close"></i>
              </div>
          </div>
          <div class="search-box-wrapper">
            <SearchBox ref="searchBox" placeholder="搜索歌曲" @query="onQueryChange"></SearchBox>
          </div>
          <div class="shortcut" v-show="!query">
            <Switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></Switches>
            <div class="list-wrapper">
                <Scroll :refreshDelay="refreshDelay" ref="songList" class="list-scroll" v-if="currentIndex==0" :data="playHistory">
                    <div class="list-inner">
                        <SongList :songs="playHistory" @select="selectSong"></SongList>
                    </div>
                </Scroll>
                <Scroll :refreshDelay="refreshDelay" ref="SearchList" class="list-scroll" v-if="currentIndex == 1" :data="history_getter">
                    <div class="list-inner">
                        <SearchList @delete="deleteSearchHistory" @select="addQuery" :searches="history_getter"></SearchList>
                    </div>    
                </Scroll>             
            </div>
          </div>
          <div class="search-result" v-show="query">
              <Suggest @listScroll="blurInput" :query="query" :showSinger="showSinger" @select="selectSuggest"></Suggest>
          </div>
          <TopTip ref="topTip">
              <div class="tip-title">
                  <i class="icon-ok"></i>
                  <span class="text">添加歌曲成功</span>
              </div>
          </TopTip>
      </div>
  </transition>
</template>

<script>
import SearchBox from '@/base/searchBox/SearchBox'
import Suggest from '@/components/suggest/Suggest'
import { searchMixin } from '@/common/js/mixin'
import Switches from '@/components/switches/Switches'
import Scroll from '@/base/scroll/Scroll'
import SongList from '@/components/song-list/SongList'
import { mapGetters, mapActions } from 'vuex'
import Song from '@/common/js/song'
import SearchList from '@/base/search-list/SearchList'
import TopTip from '@/base/top-tip/TopTip'
export default {
    mixins:[searchMixin],
    data(){
        return {
            showFlag: false,
            showSinger: false,
            currentIndex: 0,
            switches:[
                {name: '最近播放'},
                {name:'搜索历史'}
            ]
        }
    },
    components:{
        SearchBox,
        Suggest,
        Switches,
        Scroll,
        SongList,
        SearchList,
        TopTip
    },
    computed:{
        ...mapGetters(['playHistory'])
    },
    methods:{
        show(){
            this.showFlag = true
            setTimeout( () => {
                if(this.currentIndex === 0){
                    this.$refs.songList.refresh()
                }else{
                    this.$refs.searchList.refresh()
                }
            },20)
        },
        hide(){
            this.showFlag = false
        },
        selectSuggest(){
            this.saveSearch()
            this.showTip()
        },
        switchItem(index){
            this.currentIndex = index
        },
        selectSong(song,index){
            if( index !== 0){
                this.insertSong(new Song(song))
                this.showTip()
            }
        },
        showTip(){
            this.$refs.topTip.show()
        },
        ...mapActions(['insertSong'])
    }
}
</script>

<style lang="scss" scoped>
@import '~@/common/scss/const.scss';
@import '~@/common/scss/mixin.scss';

.add-song {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 200;
  background: $color-background;
  &.slide-enter-active, &.slide-leave-active {
    transition: all 0.3s;
  }
  &.slide-enter, &.slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  .header {
    position: relative;
    height: 44px;
    text-align: center;
    .title {
      line-height: 44px;
      font-size: $font-size-large;
      color: $color-text;
    }
    .close {
      position: absolute;
      top: 0;
      right: 8px;
      .icon-close {
        display: block;
        padding: 12px;
        font-size: 20px;
        color: $color-theme;
      }
    }
  }
  .search-box-wrapper {
    margin: 20px;
  }
  .shortcut {
    .list-wrapper {
      position: absolute;
      top: 165px;
      bottom: 0;
      width: 100%;
      .list-scroll {
        height: 100%;
        overflow: hidden;
        .list-inner {
          padding: 20px 30px;
        }
      }
    }
  }
  .search-result {
    position: fixed;
    top: 124px;
    bottom: 0;
    width: 100%;
  }
  .tip-title {
    text-align: center;
    padding: 18px 0;
    font-size: 0;
    .icon-ok {
      font-size: $font-size-medium;
      color: $color-theme;
      margin-right: 4px;
    }
    .text {
      font-size: $font-size-medium;
      color: $color-text;
    }
  }
}
</style>