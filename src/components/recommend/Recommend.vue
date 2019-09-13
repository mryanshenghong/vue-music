<template>
   <div class="recommend" ref="recommend">
       <Scroll ref="scroll" class="recommend-content" :data="total">
         <div>
           <div v-if="recommends.length" class="slide-wrapper">
               <Slider>
                   <div v-for="(item,index) in recommends" :key="index">
                       <a :href="item.linkUrl">
                           <img class="needsclick" @load="loadImage" :src="item.picUrl">
                       </a>
                   </div>
               </Slider>
           </div>
           <div class="recommend-list">
               <h1 class="list-title">热门歌单推荐</h1>
               <ul>
                   <li v-for="(item,index) in disc" :key="index" class="item">
                       <div class="icon">
                           <img width="60px" height="60px" v-lazy="item.picUrl" :key="item.picUrl">
                       </div>
                       <div class="text">
                           <h2 class="name">{{item.songListAuthor}}</h2>
                           <p class="desc">{{item.songListDesc}}</p>
                       </div>
                   </li>
               </ul>
           </div>           
         </div>
         <div class="loading-container" v-show="!disc.length">
            <Loading></Loading>
         </div>
       </Scroll>
   </div>
</template>
<script>

import { getRecommend } from '../../api/recommend'
import { ERR_OK } from '../../api/config'
import Slider from '@/base/slider/Slider'
import Scroll from '@/base/scroll/Scroll'
import Loading from '@/base/loading/Loading'
export default {
    data(){
        return{
            total: [],
            recommends:[],
            disc:[],
            radio:[]
        }
    },
    components:{
        Slider,
        Scroll,
        Loading
    },
    created(){
        this._getRecommend()
    },
    methods: {
        _getRecommend (){
            getRecommend().then( res => {
                if(res.code === ERR_OK){
                    this.recommends = res.data.slider
                    this.disc = res.data.songList
                    this.radio = res.data.radioList
                    this.total = [this.recommends , this.disc , this.radio]
                }
            }).catch( err => {

            }) 
        },
        loadImage(){
          //在这里加入倒计时事件是因为页面重新渲染时间是17ms，使用倒计时在加载完第一张图片以后立即执行scroll刷新计算dom高度，
          //目前解决了scroll下拉出现大片空白的问题
          setTimeout( () => {
            if(!this.checkLoaded){
              this.$refs.scroll.refresh()
            }
            this.checkLoaded = true
          },20)
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/common/scss/const.scss';
@import '@/common/scss/mixin.scss';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  .recommend-content {
    height: 100%;
    overflow: hidden;
    .slide-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }
    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }
      .item {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 20px 20px 20px;
        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }
        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;
          .name {
            margin-bottom: 10px;
            color: $color-text;
          }
          .desc {
            color: $color-text-d;
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
}
</style>