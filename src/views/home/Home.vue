<template>
  <div class="home">
    <header>
      <div class="top">
        <i class="iconfont icon-navbankicon"></i>
        <i class="iconfont icon-yemian"></i>
      </div>
      <div class="mes">
        遇到困难,微笑面对就好了.
        消除恐惧最好的办法就是面对恐惧,加油,奥利给!
      </div>
    </header>
    <ul>
      <li v-for="item in homeData" @click="HomeListClick(item.linK)" :key="item.text">
        <div class="img">
          <img :src="item.img" alt="">
        </div>
        <div>{{item.text}}</div>
        <div>{{item.mes}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  import img1 from 'assets/img/home/我的客户.png'
  import img2 from 'assets/img/home/客户关怀.png'
  import img3 from 'assets/img/home/消息中心.png'
  import img4 from 'assets/img/home/物流单.png'

  export default {
    name: "Home",
    data() {
      return {
        homeData:[
          {
            img:img1,
            text:'我的客户',
            mes:'MY CLIENTS',
            linK:'/client'
          },
          {
            img:img2,
            text:'客户关怀',
            mes:'CUSTOMER',
            linK:'/care'
          },
          {
            img:img3,
            text:'消息中心',
            mes:'NEWS',
            linK:'/news'
          },
          {
            img:img4,
            text:'物流单',
            mes:'LOGISTICS',
            linK:'/express'
          }
        ]
      }
    },
    mounted() {
    },
    methods:{
      HomeListClick(link){
        this.$router.push(link)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .home {
    background: #f5f5f5;
    color: #666;
    height: 100vh;
  }

  header {
    height: 190px;
    background: #00339990;

    .mes {
      color: #fff;
      font: 17px '楷体';
      padding: 30px;
    }

    i {
      font-size: 25px;
      color: #fff;
    }

    .top {
      display: flex;
      padding: 10px;
      justify-content: space-between;
    }
  }

  ul {
    padding: 10px 50px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    li {
      height: 200px;
      width: 48%;
      background: #fff;
      text-align: center;
      margin: 10px 0;

      .img {
        height: 100px;
        position: relative;
        img{
          width: 60px;
          padding: 25px 0 0 0;
          position: absolute;
          top:50%;left: 50%;
          transform: translate(-50%,-50%);
        }
      }

      div {
        margin-top: 10px;
      }
    }
  }
</style>