<template>
  <div class="nav">
    <div class="left" @click="backClick"><slot name="left"><i class="iconfont icon-navbankicon"></i></slot></div>
    <div class="center"><slot name="center"></slot>
    </div>
    <div class="right" @click="homeClick"><slot name="right"><i class="iconfont icon-yemian"></i></slot></div>
  </div>
</template>

<script>
  export default {
    name: "NavBar",
    methods:{
      backClick(){
        this.$router.back()
      },
      homeClick(){
        this.$emit('right')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .nav{
    height: 44px;
    background: #003399;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
.left,.right{
  width: 60px;
  color: #fff;
  text-align: center;
  i{
    font-size: 20px;
  }
}
  .center{
    width: 70%;
    text-align: center;
    color: #fff;
    font-size: 20px;
    overflow: hidden;
  }

</style>