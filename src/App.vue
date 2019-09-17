<template>
  <div id="app" @touchmove.prevent>
    <MHeader></MHeader>
    <Tab></Tab>
    <!-- 将dom缓存，解决每次切换路由都重新渲染页面的问题 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Player></Player>
  </div>
</template>

<script>
import MHeader from './components/header/Header'
import Tab from './components/tab/Tab'
import Player from './components/player/Player'
export default {
  name: 'app',
  components:{
    MHeader,
    Tab,
    Player
  }
}
</script>

<style scope lang="scss">

</style>
