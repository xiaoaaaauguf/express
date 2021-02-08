<template>
  <div class="query">
    <div class="left">
      <i class="iconfont icon-icon1460187631756"></i>
      <input v-model="keyword" type="text" :placeholder="hint">
    </div>
    <div class="right" @click="queryClick">搜索</div>
  </div>
</template>

<script>
  export default {
    name: "Query",
    props:['hint'],
    data(){
      return{
        keyword:''
      }
    },
    methods:{
      queryClick(){
        this.$emit('queryVal',this.keyword)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .query{
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0 10px;
    background: #fff;
    .left{
      background: #eee;
      border-radius: 15px;
      flex: 1;
      margin:0 10px 0 0;
      i{
        margin-left: 10px;
      }
      input{
        border: none;
        padding:6px 10px;
        background: none;
        outline: none;
        font-size: 14px;
      }
    }
    .right{
      color: #003399;
      font-size: 14px;
    }
  }
</style>