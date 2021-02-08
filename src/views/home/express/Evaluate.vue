<template>
  <div class="evaluate">
    <nav-bar>
      <div slot="center">评论</div>
      <div slot="right"></div>
    </nav-bar>
    <!--订单信息-->
    <card class="eva-card">
      <div slot="left" class="left">
        <i class="iconfont icon-icon-order"></i>
        <span>订单信息</span>
      </div>
      <div slot="b-left" class="b-left">
        <div><span>商品</span>{{eva.prodName}}</div>
        <div><span>发货时间</span>{{eva.sendTime}}</div>
        <div><span>到达时间</span>{{eva.receiveTime}}</div>
      </div>
    </card>
    <!--服务评价-->
    <card class="eva-card">
      <div slot="left" class="left">
        <i class="iconfont icon-icon-order"></i>
        <span>服务评价</span>
      </div>
      <div slot="b-left" class="b-star">
        <div><span>描述相符</span><star :starNumber="eva.prodConformityPoint"/></div>
        <div><span>物流速度</span><star :starNumber="eva.logisticsSpeedPoint"/></div>
        <div><span>服务质量</span><star :starNumber="eva.serviceQualityPoint"/></div>
      </div>
    </card>
    <div class="commentMsg">
      {{eva.comment}}
    </div>
  </div>
</template>

<script>
  import NavBar from "components/common/NavBar";
  import Card from "components/common/Card";
  import {getEvaluate} from "network/api";
  import Star from "components/common/Star";

  export default {
    name: "Evaluate",
    data(){
      return{
        eva:{}
      }
    },
    components: {Star, Card, NavBar},
    created() {
      this._getEvaluate(this.$route.query.id)
    },
    methods:{
      async _getEvaluate(id){
        const {data}=await getEvaluate(id)
        this.eva=data
      }
    }
  }
</script>

<style lang="scss" scoped>
  .evaluate {
    min-height: 100vh;
    background: #f5f5f5;
    .eva-card {
      margin-bottom: 10px;
      .left {
        background: #f5fafe;
        color: #13349b;

        i {
          font-size: 20px;
        }

        span {
          margin-left: 15px;
        }
      }
      .b-left{
        font-size: 14px;
        padding: 10px 0;
        div{
          display: flex;
          line-height: 25px;
          span{
            color: #666;
            min-width: 70px;
          }
        }
      }
      .b-star{
        width: 100%;
        &>div{
          display: flex;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid #eee;
          span{
            font-size: 14px;
            margin-right: 30px;
          }
        }
      }
    }
    .commentMsg{
      margin-top: 10px;
      min-height: 100px;
      background: #fff;
      padding:15px;
      line-height: 20px;
      color: #666;
    }
  }
</style>