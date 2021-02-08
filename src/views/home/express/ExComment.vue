<template>
  <div class="comment">
    <nav-bar @right="comEvaluate">
      <div slot="center">快递单评价</div>
      <div slot="right">提交</div>
    </nav-bar>
    <div class="total">
      <div class="t1">总体评分</div>
      <div class="t2"><span class="score">{{starNum*2}}</span>分</div>
      <div class="totalStar">
        <star :disable="false" :starNumber="starNum" @updateStar="updateStar"></star>
      </div>
    </div>
    <div class="setStar">
      <div>店铺评分</div>
      <div>店铺评分
        <star :disable="false" :starNumber.sync="shopStar" @updateStar="updateStar1"></star>
      </div>
      <div>物流速度
        <star :disable="false" :starNumber.sync="speedStar" @updateStar="updateStar2"></star>
      </div>
      <div>快递评分
        <star :disable="false" :starNumber.sync="exStar" @updateStar="updateStar3"></star>
      </div>
    </div>
    <card class="card">
      <div slot="left" class="left">
        <textarea placeholder="写几句评价" v-model="comVal"></textarea>
      </div>
    </card>
    <popup :pp.sync="pp" :toast="toastMes" @confirm="confirm"></popup>
  </div>
</template>

<script>

  import NavBar from "components/common/NavBar";
  import Star from "components/common/Star";
  import Card from "components/common/Card";
  import {addEvaluate} from "network/api";
  import Popup from "components/common/Popup";

  export default {
    name: "ExComment",
    components: {Popup, Card, Star, NavBar},
    data() {
      return {
        starNum: 0,
        shopStar: 0,
        speedStar: 0,
        exStar: 0,
        comVal:'',
        pp:false,
        toastMes:''
      }
    },
    created() {
      console.log()
    },
    methods: {
      async comEvaluate(){
        let {message}=await addEvaluate({
          serialNo:this.$route.query.serialNo,
          prodConformityPoint:this.shopStar,
          logisticsSpeedPoint:this.speedStar,
          serviceQualityPoint:this.exStar,
          comment:this.comVal
        })
        if (message==='操作成功'){
          this.pp=true
          this.toastMes=message
        }
      },
      //Popup事件
      confirm(){
        this.$router.push('/express')
      },
      updateStar(index) {
        this.starNum = index
      },
      //商品描述
      updateStar1(index) {
        this.shopStar = index
      },
      //物流速度
      updateStar2(index) {
        this.speedStar = index
      },
      //物流服务
      updateStar3(index) {
        this.exStar = index
      }
    }
  }
</script>

<style lang="scss" scoped>
  .comment {
    position: relative;
    z-index: 1009;
    background: #f5f5f5;
    min-height: 100vh;
    .total {
      background: #fff;
      text-align: center;
      border: 1px solid #eee;
      padding-bottom: 15px;

      .t1 {
        color: #aaa;
        margin: 15px 0 10px 0;
      }

      .t2 {
        color: #ffcc33;
        margin-top: 10px;
        span {
          font-size: 40px;
        }
      }

      .totalStar {
        display: flex;
        justify-content: center;
      }
    }
    .setStar{
      background: #fff;
      &>div{
        display: flex;
        align-items: center;
        height: 70px;
        border-bottom: 1px dashed #eee;
        margin: 0 10px;
      }
      div:nth-child(n+2){
        padding: 0 20px;
      }
    }
    .card{
      margin-top: 10px;
      .left{
        flex: 1;
        height: 220px;
        textarea{
          width: 370px;
          height: 150px;
          border: none;
        }
      }
    }
  }
</style>