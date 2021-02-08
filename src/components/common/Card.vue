<template>
  <ul class="card">
    <li class="top">
      <div class="left"><slot name="left"></slot></div>
      <div class="right"><slot name="right"></slot></div>
    </li>
    <li class="bottom">
      <div class="left"><slot name="b-left"></slot></div><!--用来卡位置的-->
      <div class="right"><slot name="b-right"></slot></div>
    </li>
  </ul>
</template>

<script>

  export default {
    name: "Card"
  }
</script>

<style lang="scss" scoped>
  .card{
    background: #fff;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 10px;
      background: #fff;
      position: relative;
    }
    .top{
      min-height: 30px;
      padding: 10px;
      border-bottom: 1px solid #eee;
    }
    .bottom{
      padding: 0 10px;
      .left{
        flex: 1;
      }
    }
  }


</style>