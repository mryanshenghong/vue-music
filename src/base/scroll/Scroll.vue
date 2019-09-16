<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
    props:{
        probeType:{
            type:Number,
            default:1
        },
        click:{
            type: Boolean,
            default:true
        },
        data:{
            type:Array,
            default:null
        },
        listenScroll:{
            type:Boolean,
            default:false
        }
    },
    mounted(){
        setTimeout( () => {
            this._initScroll()
        },20)
    },
    methods:{
        _initScroll(){
            if(!this.$refs.wrapper){
                return
            }
            this.scroll = new BScroll(this.$refs.wrapper,{
                probeType:this.probeType,
                click:this.click,
                useTransition: true
            })

            if(this.listenScroll){
                //Vue 实例
                let me = this
                this.scroll.on('scroll',(pos) =>{
                    me.$emit('scroll',pos)
                })
            }
        },
        enable(){
            this.scroll && this.scroll.enable()
        },
        disable(){
            this.scroll && this.scroll.disable()
        },
        refresh(){
            this.scroll && this.scroll.refresh()
        },
        // apply(e,arguments) arguments 是一个数组 wired
        scrollTo(){
            this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments)
        },
        scrollToElement(){
            this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments)
        }     
    },
    watch:{
        data(){
            setTimeout( () => {
                this.refresh()
            },20)
        }
    }
}
</script>
<style scoped lang="scss">

</style>