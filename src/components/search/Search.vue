<template>
    <div class="search">
        <div class="search-box-wrapper">
            <SearchBox ref="searchBox" @query="onQueryChange"></SearchBox>
        </div>
        <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
            <Scroll :refreshDelay="120" ref="shortcut" class="shortcut" :data="shortcut">
              <div>
                <div class="hot-key">
                    <h1 class="title">热门搜索</h1>
                    <ul>
                        <li @click="addQuery(item.k)"  class="item" v-for="(item,index) in hotkey" :key="index">
                            <span>{{item.k}}</span>
                        </li>
                    </ul>                    
                </div>
                <div class="search-history" v-show="history_getter.length">
                  <h1 class="title">
                    <span class="text">搜索历史</span>
                    <span class="clear" @click="showConfirm">
                      <i class="icon-clear"></i>
                    </span>
                  </h1>
                  <SearchList @select="addQuery" @delete="deleteSearchHistory" :searches="history_getter"></SearchList>
                </div>                
              </div>
            </Scroll>
        </div>
        <div ref="searchResult" class="search-result" v-show="query">
            <Suggest ref="suggest" @select="saveSearch" :query="query" @listScroll="blurInput"></Suggest>
        </div>
        <Comfirm text="是否清空所有搜索历史" confirmBtnText="清空" ref="confirm" @confirm="clearSearchHistory" @cancel="hideConform"></Comfirm>
        <transition name="slide">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>

import SearchBox from '@/base/searchBox/SearchBox'
import Scroll from '@/base/scroll/Scroll'
import { getHotKey } from '@/api/search'
import { ERR_OK } from '@/api/config'
import Suggest from '@/components/suggest/Suggest'
import { mapActions,mapGetters } from 'vuex'
import SearchList from '@/base/search-list/SearchList'
import Comfirm from '@/base/comfirm/Comfirm'
import { playlistMixin } from '@/common/js/mixin'
export default {
    mixins:[playlistMixin],
    data(){
        return {
            hotkey:[],
            query:''
        }
    },
    components:{
        SearchBox,
        Suggest,
        SearchList,
        Comfirm,
        Scroll
    },
    computed:{
      shortcut(){
        return this.hotkey.concat(this.history_getter)
      },
      ...mapGetters(['history_getter'])
    },
    methods:{
        blurInput(){ //当移动端点击搜索框会调用手机键盘，当滚动结果的时候，使用方法关闭键盘
          this.$refs.searchBox.blur()
        },
        addQuery(query){
            this.$refs.searchBox.setQuery(query)
        },
        _getHotKey(){
            getHotKey().then( (res) => {
                if( res.code === ERR_OK){
                    this.hotkey = res.data.hotkey.slice(0,10)
                }
            })
        },
        onQueryChange(query){
            this.query = query
        },
        saveSearch(){
          this.saveSearchHistory(this.query)
        },
        showConfirm(){
          this.$refs.confirm.show()
        },
        hideConform(){
          this.$refs.confirm.hide()
        },
        handlePlaylist(playlist){
          const bottom = playlist.length >0 ? '60px' : '0'
          this.$refs.shortcutWrapper.style.bottom = bottom
          this.$refs.shortcut.refresh()
          this.$refs.searchResult.style.bottom = bottom
          this.$refs.suggest._refresh()
        },
        ...mapActions(['saveSearchHistory','deleteSearchHistory','clearSearchHistory'])
    },
    watch:{
      query(newQuery){
        if(!newQuery) {
          setTimeout( () => {
            this.$refs.shortcut.refresh()
          },20)
        }
      }
    },
    created(){
        this._getHotKey()
    }
}
</script>
<style lang="scss" scoped>
@import '~@/common/scss/const.scss';
@import '~@/common/scss/mixin.scss';

.search {
  .search-box-wrapper {
    margin: 20px;
  }
  .shortcut-wrapper {
    position: fixed;
    top: 178px;
    bottom: 0;
    width: 100%;
    .shortcut {
      height: 100%;
      overflow: hidden;
      .hot-key {
        // height: 170px;
        // overflow: hidden;
        margin: 0 20px 20px 20px;
        .title {
          margin-bottom: 20px;
          font-size: $font-size-medium;
          color: $color-text-l;
        }
        .item {
          display: inline-block;
          padding: 5px 10px;
          margin: 0 20px 10px 0;
          border-radius: 6px;
          background: $color-highlight-background;
          font-size: $font-size-medium;
          color: $color-text-d;
          &.special {
            color: rgba(255, 255, 255, 0.7);
            // border: 1px solid #fc4524;
          }
        }
      }
      .search-history {
        position: relative;
        margin: 0 20px;
        .title {
          display: flex;
          align-items: center;
          height: 40px;
          font-size: $font-size-medium;
          color: $color-text-l;
          .text {
            flex: 1;
          }
          .clear {
            @include extend-click();
            .icon-clear {
              font-size: $font-size-medium;
              color: $color-text-d;
            }
          }
        }
      }
    }
  }
  .search-result {
    position: fixed;
    width: 100%;
    top: 178px;
    bottom: 0;
  }
}
    .slide-enter-active, .slide-leave-active{
        transition: all .3s;
    }

    .slide-enter, .slide-leave-to{
        transform: translate3d(100%,0,0);
    }
</style>