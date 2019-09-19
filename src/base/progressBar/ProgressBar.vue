<template>
    <div class="progress-bar" ref="progressBar" @click="clickProgress">
        <div class="bar-inner">
            <div class="progress" ref="progress"></div>
            <div class="progress-btn-wrapper" ref="progressBtn"
                @touchstart.prevent="progressTouchStart"
                @touchmove.prevent="progressTouchMove"
                @touchend="progressTouchEnd"
            >
                <div class="progress-btn"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { prefixStyle } from "@/common/js/dom";
const progressBtnWidth = 16
const transform = prefixStyle("transform");
export default {
    props:{
        percent:{
            type:Number,
            default: 0
        }
    },
    created(){
        this.touch = {}
    },
    methods:{
        progressTouchStart(e){
            this.touch.initiated = true
            this.touch.startX = e.touches[0].pageX
            this.touch.left = this.$refs.progress.clientWidth
        },
        progressTouchMove(e){
            if(!this.touch.initiated){
                return
            }
            const distanceX = e.touches[0].pageX - this.touch.startX
            //最终移动的距离
            const offsetWidth = Math.min(
                this.$refs.progressBar.clientWidth - progressBtnWidth,
                Math.max(0,this.touch.left + distanceX)
            )
            this._offset(offsetWidth)
        },
        progressTouchEnd(e){
            this.touch.initiated = false
            this._triggerPercent()
        },
        clickProgress(e){
            //当点击progressBtn e.offsetX 获取不对
            //this._offset(e.offsetX)
            const rect = this.$refs.progressBar.getBoundingClientRect()
            const offsetWidth = e.pageX - rect.left
            this._offset(offsetWidth)
            this._triggerPercent()
        },
        _offset(offsetWidth){
            this.$refs.progress.style.width = `${offsetWidth}px`
            this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
        },
        _triggerPercent(){
             const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
             const percent = this.$refs.progress.clientWidth / barWidth
             this.$emit('percentChange',percent)
        }
    },
    watch:{
        percent(newPercent){
            if(newPercent >= 0 && !this.touch.initiated){
                const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
                const offsetWidth = newPercent * barWidth
                // this.$refs.progress.style.width = `${offsetWith}px`
                // this.$refs.progressBtn.style[transform] = `translate3d(${offsetWith}px,0,0)`
                this._offset(offsetWidth)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    @import "@/common/scss/const.scss";
    .progress-bar {
        height: 30px;
        .bar-inner {
            position: relative;
            top: 13px;
            height: 4px;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.3);
            .progress {
            position: absolute;
            height: 100%;
            background: $color-theme;
            }
            .progress-btn-wrapper {
            position: absolute;
            left: -8px;
            top: -13px;
            width: 30px;
            height: 30px;
            .progress-btn {
                position: relative;
                top: 7px;
                left: 7px;
                box-sizing: border-box;
                width: 16px;
                height: 16px;
                border: 3px solid $color-text;
                border-radius: 50%;
                background: $color-theme;
            }
            }
        }
    }
</style>