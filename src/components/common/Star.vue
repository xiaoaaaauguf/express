<template>
  <div class="star">
    <div class="main">
      <div class="star1">
        <i v-for="i in 5" class="iconfont icon-xingxing" @click="starClick(i)"></i>
      </div>
      <div class="star2">
        <i v-for="i in starNumber"
           :style="active"
           class="iconfont icon-xingxing"
           @click="starClick(i)"
        ></i>
      </div>
      <div class="score">{{starNumber*2}}分</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Star",
    props:{
      disable:{
        type:Boolean,
        default:true
      },
      starNumber:{
        type: Number,
        default: 0
      }
    },
    created() {
      this.score=this.starNumber*2
    },
    computed: {
      active() {
        if (this.starNumber >= 0 && this.starNumber < 3) {
          return {color: '#ff5d5e'}
        } else if (this.starNumber >= 3 && this.starNumber < 5) {
          return {color: '#ff8d5b'}
        } else {
          return {color: '#ffcf60'}
        }
      }
    },
    methods: {
      starClick(index) {
        if(!this.disable){
          this.$emit('updateStar',index)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .star {
    .main {
      position: relative;
      display: flex;
      align-items: center;
      i {
        font-size: 30px;
        color: #dcdcdc;
        margin-left: 5px;
      }

      .star2 {
        position: absolute;
      }

      .score {
        margin-left: 20px;
        color: #666;
      }
    }
  }
</style>