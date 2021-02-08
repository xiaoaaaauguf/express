<template>
  <ul class="tab">
    <li v-for="(item,index) in titles"
        :key="index"
        @click="titleClick(index)"
        :class="{active:currentIndex===index}"
    >
      {{item}}
    </li>
  </ul>
</template>

<script>
  export default {
    name: "TabBar",
    props:{
      titles:{
        type:Array,
        default:[]
      }
    },
    data(){
      return{
        currentIndex:0
      }
    },
    methods:{
      titleClick(index){
        this.currentIndex=index
        this.$emit('toggleClick',index)
      }
    }
  }
</script>

<style lang="scss" scoped>
.tab{
  background: #fff;
  height: 44px;
  line-height: 44px;
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  color: #666;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  .active{
    color:#003399;
    border-bottom: 2px solid #ffcc33;
  }
}
</style>