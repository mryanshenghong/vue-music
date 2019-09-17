<template>
    <div class="singer">
        <ListView @select="selectSinger" :data="singers"></ListView>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        
    </div>
</template>
<script>
import {getSingerList} from '@/api/singer'
import { ERR_OK } from '@/api/config'
import Singer from '@/common/js/singer'
import ListView from '@/base/listView/ListView'
import { mapMutations } from 'vuex'
const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10
export default {
    data(){
        return {
            singers:[]
        }
    },
    components:{
        ListView
    },
    created(){
        this._getSingerList()
    },
    methods:{
        selectSinger(singer){
            this.$router.push({
                path: `/singer/${singer.id}`
            })

            this.setSinger(singer)
        },
        _getSingerList(){
            getSingerList().then( res => {
                if(res.code === ERR_OK){
                    this.singers = this._normalizeSinger(res.data.list)
                    // console.log(this.singers)
                }
            }).catch( err => {

            })
        },
        _normalizeSinger(list){
            let map ={
                hot:{
                    title:HOT_NAME,
                    items:[]
                }
            }
            // 给map填充
            list.forEach( (item,index) => {
                if(index < HOT_SINGER_LEN){
                    map.hot.items.push(new Singer({
                        id:item.Fsinger_mid,
                        name:item.Fsinger_name,
                    }))  
                }

                const key = item.Findex
                if(!map[key]){
                    map[key] = {
                        title:key,
                        items:[]
                    }
                }
                map[key].items.push(new Singer({
                       id:item.Fsinger_mid,
                       name:item.Fsinger_name,
                }))
            });
            //让map有序 转换成有序列表
            let hot = []
            let rest = []
            for(let key in map ){
                let val = map[key]
                if(val.title.match(/[a-zA-Z]/)){
                    rest.push(val)
                }else if( val.title === HOT_NAME){
                    hot.push(val)
                }
            }
            rest.sort( (a,b) => {
                return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            })
            return hot.concat(rest)
        },
        ...mapMutations({
            //映射mutation type里面的 SET_SINGER 这个放到到组件内名字为 setSinger
            setSinger:'SET_SINGER'
        })        
    },
}
</script>
<style scoped lang="scss">
    .singer{
        position: fixed;
        top:88px;
        bottom:0;
        width: 100%;
    }
</style>