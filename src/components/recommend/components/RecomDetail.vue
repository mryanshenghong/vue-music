<template name="slide">
    <transition>
        <RecomDetail></RecomDetail>
    </transition>
</template>

<script>
import RecomDetail from '@/components/recommend/components/RecomDetail'
export default {
    components:{
        RecomDetail
    }
}
</script>

<style lang="scss" scoped>
    .slide-enter-avive, .slide-leave-avive{
        transition: all .3s;
    }

    .slide-enter, .slide-leave-to{
        transform: translate3d(100%,0,0)
    }
</style>