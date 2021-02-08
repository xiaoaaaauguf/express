<template>
  <div>
    <div class="content">
      <div class="left"><slot name="left"></slot></div>
      <div class="right"><slot name="right"></slot></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
 
    }
  }
}
</script>
 
<style lang = "scss" scoped>
  .content{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    min-height: 45px;
    background: #fff;
    border-bottom: 1px solid #eee;
    .left{
      font-size: 15px;
      color: #333;
      width: 75px;
    }
    .right{
      color: #9a9a9a;
      font-size: 14px;
      flex:1;
      text-align: right;
      padding: 3px 0;
    }
  }
</style>