<template lang="html">
    <transition name="move">
      <div class="detail detailWrapper" >
          <div class="banner">
              <img :src="banner"/>
          </div>
      </div>
  </transition>
</template>

<script>
export default {
    data(){
        return {
            banner:'https://www.vuefe.cn/images/logo.png'
        }
    }
}

</script>


<style lang="stylus">
.detailWrapper
  position fixed
  left 0
  top 0
  height 100%
  width 100%
  background white
  transition all 0.4s ease
  &.move-enter-avtive,&.move-leave-active{
    transform translate3d(0,0,0)
  }
  &.move-enter,&.move-leave-active{
    transform translate3d(100%,0,0)
  }

</style>
