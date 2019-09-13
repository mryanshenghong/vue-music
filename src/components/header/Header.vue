<template>
  <div class="my-header">
    <div class="icon"></div>
    <h1 class="text">Chicken Music</h1>

    <!-- 个人中心 -->
    <router-link to="/user" class="mine" tag="div">
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import '@/common/scss/const.scss';
@import '@/common/scss/mixin.scss';

.my-header {
  position: relative;
  height: 44px;
  text-align: center;
  color: $color-theme;
  font-size: 0;
  //这里设置top为0的原因，让header距离顶部没有距离
  //如果不设置当移动端触摸移动header的时候会发生组件移动，
  //非常影响用户体验
  top:0;
  .icon {
    display: inline-block;
    vertical-align: top;
    margin-top: 6px;
    width: 30px;
    height: 32px;
    margin-right: 9px;
    @include bg-image('logo');
    background-size: 30px 32px;
  }
  .text {
    display: inline-block;
    vertical-align: top;
    line-height: 44px;
    font-size: $font-size-large;
  }
  .mine {
    position: absolute;
    top: 0;
    right: 0;
    .icon-mine {
      display: block;
      padding: 12px;
      font-size: 20px;
      color: $color-theme;
    }
  }
}
</style>
