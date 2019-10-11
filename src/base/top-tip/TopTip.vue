<template>
    <transition name="drop">
        <div class="top-tip" v-show="showFlag" @click.stop="hide">
            <slot></slot>
        </div>        
    </transition>
</template>

<script>
export default {
    props:{
        delay:{
            type: Number,
            default: 2000
        }
    },
    data(){
        return {
            showFlag: false,
            myDelay: this.delay
        }
    },
    watch:{
        delay(val){
            this.myDelay = val
        }
    },
    methods:{
        show(){
            this.showFlag = true
            clearTimeout(this.myDelay)
            this.myDelay = setTimeout( () => {
                this.hide()
            },2000)
        },
        hide(){
            this.showFlag = false
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~@/common/scss/const.scss';
@import '~@/common/scss/mixin.scss';

.top-tip {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 500;
  background: $color-dialog-background;
  &.drop-enter-active, &.drop-leave-active {
    transition: all 0.3s;
  }
  &.drop-enter, &.drop-leave-to {
    transform: translate3d(0, -100%, 0);
  }
}
</style>