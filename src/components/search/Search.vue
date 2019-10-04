<template>
    <div class="search">
        <div class="search-box-wrapper">
            <SearchBox ref="searchBox" @query="onQueryChange"></SearchBox>
        </div>
        <div class="shortcut-wrapper" v-show="!query">
            <div class="shortcut">
                <div class="hot-key">
                    <h1 class="title">热门搜索</h1>
                    <ul>
                        <li @click="addQuery(item.k)"  class="item" v-for="(item,index) in hotkey" :key="index">
                            <span>{{item.k}}</span>
                        </li>
                    </ul>                    
                </div>
            </div>
        </div>
        <div class="search-result" v-show="query">
            <Suggest :query="query" @listScroll="blurInput"></Suggest>
        </div>
        <transition name="slide">
            <router-view></router-view>
        </transition>
        
    </div>
</template>

<script>

import SearchBox from '@/base/searchBox/SearchBox'
import { getHotKey } from '@/api/search'
import { ERR_OK } from '@/api/config'
import Suggest from '@/components/suggest/Suggest'
export default {
    data(){
        return {
            hotkey:[],
            query:''
        }
    },
    components:{
        SearchBox,
        Suggest
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