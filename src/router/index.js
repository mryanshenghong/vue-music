import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const SingerDetail = (resolve) => {
    import('@/components/singer/components/SingerDetail').then((module) => {
      resolve(module)
    })
  }
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
          },
          children:[
              {
                path:':id',
                name:'Disc',
                component:function(resolve){
                    require(['@/components/disc/Disc'],resolve)
                },                  
              }
          ]
        },
        {
            path:'/rank',
            name:'Rank',
            component:function(resolve){
                require(['@/components/rank/Rank'],resolve)
            },
            children:[
                {
                    path: ':id',
                    component:function(resolve){
                        require(['@/components/top-list/TopList'],resolve)
                    },                    
                }
            ]
        },
        {
            path:'/singer',
            name:'Singer',
            component:function(resolve){
                require(['@/components/singer/Singer'],resolve)
            },
            children:[
                {
                    path:':id',
                    component: SingerDetail
                }
            ]
        },
        {
            path:'/search',
            name:'Search',
            component:function(resolve){
                require(['@/components/search/Search'],resolve)
            },
            children:[
                {
                    path:':id',
                    component: SingerDetail
                }
            ]
        }
    ]
})