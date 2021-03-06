<template>
    <Scroll class="suggest" :data="result" :pullup="true" 
            @scrollToEnd="searchMore" 
            ref="suggest"
            :beforeScroll="beforeScroll"
            @beforeScroll="listScroll"
    >
        <ul class="suggest-list">
            <li @click="selectItem(item)" class="suggest-item" v-for="(item,index) in result" :key="index">
                <div class="icon">
                    <i :class="getIconCls(item)"></i>
                </div>
                <div class="name">
                    <p class="text" v-html="getDisplayName(item)"></p>
                </div>
            </li>
            <Loading v-show="hasMore" title=""></Loading>
        </ul>
        <div class="no-result-wrapper" v-show="!hasMore && !result.length">
            <NoResult title="抱歉，暂无搜索结果"></NoResult>
        </div>
    </Scroll>
</template>
<script>
import Scroll from '@/base/scroll/Scroll'
import Loading from '@/base/loading/Loading'
import Singer from '@/common/js/singer'
import { search } from '@/api/search'
import { ERR_OK } from '@/api/config'
import { createSong } from '@/common/js/song'
import {  mapMutations, mapActions } from 'vuex'
import NoResult from '@/components/no-result/NoResult'
const TYPE_SINGER = 'singer'
const perpage = 20
export default {
    props:{
        query:{
            type: String,
            default:''
        },
        showSinger:{
            type:Boolean,
            default: true
        }
    },
    components:{
        Scroll,
        Loading,
        NoResult
    },
    data(){
        return {
            page:1,
            result: [],
            pullup: true,
            hasMore: true,
            beforeScroll:true
        }
    },
    methods:{
        getIconCls(item){
            if(item.type === TYPE_SINGER){
                return 'icon-mine'
            }else{
                return 'icon-music'
            }
        },
        getDisplayName(item){
            if(item.type === TYPE_SINGER){
                return item.singername
            }else{
                return `${item.name}-${item.singer}`
            }
        },
        searchMore(){
            if(!this.hasMore){
                return 
            }else{
                this.page ++
                search(this.query,this.page,this.showSinger,perpage).
                then(res => {
                    this.result = this.result.concat(this._genResult(res.data.data))
                    this._checkMore(res.data.data)
                }).catch( err => {
                    console.log('loading more result err' + err)
                })
            }
        },
        selectItem(item){
            if(item.type === TYPE_SINGER){
                const singer = new Singer({
                    id: item.singermid,
                    name: item.singername
                })
                this.$router.push({
                    path:`/search/${singer.id}`
                })
                this.setSinger(singer)
            }else{
                this.insertSong(item)
            }
            //派发添加搜索历史的事件
            this.$emit('select')
        },
        listScroll(){
            this.$emit('listScroll')
        },
        _search(){
            this.hasMore = true
            this.page = 1
            this.$refs.suggest.scrollTo(0,0)
            search(this.query,this.page,this.showSinger,perpage).then( res => {
                if(res.data.code === ERR_OK){
                    this.result = this._genResult(res.data.data)
                    this._checkMore(res.data.data)
                }
            }).catch( err => {
                    console.log('fetch result err' + err)
            })
        },
        _checkMore(data){
            const song = data.song
            if(!song.list.length || (song.curnum + song.curpage * perpage) >= song.totalnum) {
                this.hasMore = false
            }
        },
        _normalizeSongs(list){
            let ret = []
            list.forEach( (musicData) => {
                if(musicData.songid && musicData.albumid) {
                    ret.push(createSong(musicData))
                }
            })
            return ret
        },
        _genResult(data){
            let ret = []
            if(data.zhida && data.zhida.singerid){
                ret.push({...data.zhida,...{type:TYPE_SINGER}})
            }
            if(data.song){
                ret = ret.concat(this._normalizeSongs(data.song.list))
            }
            return ret
        },
        _refresh(){
            this.$refs.suggest.refresh()
        },
        ...mapMutations({
            setSinger:'SET_SINGER'
        }),
        ...mapActions(['insertSong'])
    },
    watch:{
        query(){
            this._search()
        }
    }
}
</script>
<style lang="scss" scoped>
@import '~@/common/scss/const.scss';
@import '~@/common/scss/mixin.scss';

.suggest {
  height: 100%;
  overflow: hidden;
  .suggest-list {
    padding: 0 30px;
    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
    }
    .icon {
      flex: 0 0 30px;
      width: 30px;
      [class^="icon-"] {
        font-size: 14px;
        color: $color-text-d;
      }
    }
    .name {
      flex: 1;
      font-size: $font-size-medium;
      color: $color-text-d;
      overflow: hidden;
      .text {
        @include no-wrap();
      }
    }
  }
  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>