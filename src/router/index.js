import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
    routes:[
        {
            path:'/',
            redirect:'/recommend'
        },
        {
          path:'/recommend',
          name:'Recommend',
          component:function(resolve){
              require(['@/components/recommend/Recommend'],resolve)
          }
        },
        {
            path:'/rank',
            name:'Rank',
            component:function(resolve){
                require(['@/components/rank/Rank'],resolve)
            }
        },
        {
            path:'/singer',
            name:'Singer',
            component:function(resolve){
                require(['@/components/singer/Singer'],resolve)
            }
        },
        {
            path:'/search',
            name:'Search',
            component:function(resolve){
                require(['@/components/search/Search'],resolve)
            }
        }
    ]
})