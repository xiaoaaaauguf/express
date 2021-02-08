<template>
  <div class="pageTotal">
    <p>共{{pages.total}}条/{{pages.sum}}页</p>
    <div class="prev" @click="prev">上一页</div>
    <section>
      <ul :style="pageWidth">
        <li v-for="index in pages.sum"
            :class="{active:pages.current===index}"
            @click="pageClick(index)"
        >{{index}}</li>
      </ul>
    </section>

    <div class="next" @click="next">下一页</div>
  </div>
</template>

<script>
  export default {
    name: "Page",
    props:{
      pages:{
        type:Object,
        default:{}
      }
    },
    data(){
      return{
        currentPage:1,
      }
    },
    computed:{
      pageWidth(){
        return {width:this.pages.sum*90+'px',left:-25*(this.pages.current-2)+'px'}
      }
    },
    methods:{
      prev(){
        if(this.pages.current>1){
          this.$emit('currentPage',this.pages.current-1)
        }
      },
      next(){
        if( this.pages.current<this.pages.sum){
          this.$emit('currentPage',this.pages.current+1)
        }
      },
      pageClick(index){
        this.currentPage=index
        this.$emit('currentPage',this.currentPage)
      },


    }
  }
</script>

<style lang="scss" scoped>
.pageTotal{
  position: fixed;
  bottom: 66px;
  right: 10px;
  display: flex;
  height: 35px;
  align-items: center;
  p{
    color:#666;
    font-size: 13px;
  }
  div:hover{
    background:#6babdd;
  }
  div{
    margin-left: 10px;
    background: #ff9d00;
    border-radius: 7px;
    color: #fff;
    padding: 5px;
    font-size: 13px;
  }
  .prev{
    margin-right: 10px;
  }
  section{
    width: 100px;
    overflow: hidden;
    position: relative;
    ul{
      display: flex;
      /*width: 180px;动态添加宽度*/
      overflow: hidden;
      position: relative;
      left: 0;
      transition: all .3s;
      li{
        border-radius: 7px;
        padding: 5px 0;
        text-align: center;
        color: #666;
        box-sizing: border-box;
        width: 25px;
      }
      li.active{
        background: #ff9d00;
        color: #fff;
      }
    }

  }
  .next{
    margin-left: 10px;
  }
}
</style>