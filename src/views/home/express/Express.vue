<template>
  <div class="express">
    <NavBar>
      <div slot="center">商品订单</div>
    </NavBar>
    <Query @queryVal="queryVal" :hint="hint"></Query>
    <TabBar :titles="['全部','待发货','待收货','待评价',]" @toggleClick="toggleStatus"></TabBar>
    <div v-for="item in expressList" class="card-info" :key="item.title">
      <card>
        <div slot="left">{{item.title}}</div>
        <i class="iconfont icon-more" slot="right"></i>
      </card>
      <card>
        <div slot="left" class="e-info">
          <div class="truck"> <!--truck货车-->
            <i class="iconfont icon-wuliuxinxi"></i>
          </div>
          <div class="right">
            <div>{{item.prodName}}</div>
            <div>下单时间<span>{{item.orderTime}}</span></div>
            <div>下单人<span>{{item.orderUserName}}</span></div>
          </div>
        </div>
        <div slot="b-right" class="b-right">
          <div class="right" v-if="item.status===0" @click="sendGoodsClick(item.serialNo)">发货</div>
          <div class="right sh" v-else-if="item.status===10" @click="takeGoodsClick(item.serialNo)">收货</div>
          <div class="right pj" v-else-if="item.status===20" @click="$router.push({path:'/exc',query:{serialNo:item.serialNo}})">评价</div>
          <div class="right ypj" v-else-if="item.status===30" @click="evaClick(item.serialNo)">查看评价</div>
        </div>
      </card>
    </div>
    <!--分页-->
    <page :pages="pages" @currentPage="currentPage" v-show="type!==3"></page>
    <!-- 弹窗 -->
    <popup :toast='toast' :pp.sync='pp' @confirm="confirm"/>
  </div>
</template>

<script>
  import Query from "components/common/Query";
  import NavBar from "components/common/NavBar";
  import TabBar from "components/common/TabBar";
  import Card from "components/common/Card";
  import {getExpressList,takeGoods} from "@/network/api";
  import Page from "components/common/Page";
import Popup from '@/components/common/Popup.vue';

  export default {
    name: "Express",
    data() {
      return {
        expressList: [],
        pages: {},
        hint: '输入物流单号查询',
        keyword: '',
        type: '',
        toast:'',
        pp:false,
        serialNo:0
      }
    },
    components: {Page, Card, NavBar, Query, TabBar,Popup},
    created() {
      this._getExpressList({})
    },
    methods: {
      //Query事件,返回搜索结果
      queryVal(keyword) {
        this.keyword = keyword
        this._getExpressList({})
      },
      //Page事件,分页
      currentPage(current) {
        this._getExpressList({current})
      },
      //Tab事件,切换数据
      toggleStatus(type) {
        console.log(type)
        this.type = type === 0 ? '' : type
        this._getExpressList({})
      },
      //发货
      sendGoodsClick(serialNo){
        this.$router.push('/sendgoods/'+serialNo)
      },
      //收货
      takeGoodsClick(serialNo){
        this.toast='是否确认收货?'
        this.pp=true
        this.serialNo=serialNo
      },
      //弹窗事件-确定
      confirm(){
        takeGoods(this.serialNo).then(({errCode})=>{
          errCode==0?this.$toast('已确认收货'):this.$toast('操作失败')
        })
      },
      //查看评价
      evaClick(serialNo){
        this.$router.push({path:'/eva',query:{id:serialNo}})
      },
      //全部信息
      async _getExpressList({current = 1, size = 2}) {
        const {data} = await getExpressList({keyword: this.keyword, current, size, type: this.type})
        this.expressList = data.records
        if(this.type===3){
          const {data} = await getExpressList({keyword: this.keyword, current:1, size:99, type: this.type})
          this.expressList=data.records.filter((item)=>{
            return item.status===20
          })
        }
        this.pages = {
          current: data.current,
          sum: data.pages,
          total: data.total
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .express {
    background: #f5f5f5;
    min-height: 100vh;
    position: relative;
    z-index: 1002;

    .card-info {
      margin-top: 10px;

      .e-info {
        display: flex;

        .truck {
          padding: 20px;
          background: #eee;
          margin-right: 15px;
          height: 25px;

          img {
            vertical-align: middle;
          }
        }

        .right {
          line-height: 25px;
          color: #666;
          font-size: 14px;
          padding: 0 0 15px 0;

          span {
            color: #333;
            margin-left: 15px;
          }
        }
      }

      .b-right {
        height: 30px;
        padding: 10px 0;
        //默认状态,未发货
        .right {
          background: #003399;
          color: #fff;
          padding: 5px 20px;
          border-radius: 20px;
          font-size: 14px;
        }

        //收货
        .sh {
          background: #fff;
          border: 1px solid #003399;
          color: #003399;
        }

        //评价
        .pj {
          background: #ffcc33;
          color: #fff;
        }

        //查看评价
        .ypj {
          border: 1px solid #ffcc33;
          color: #ffcc33;
          background: #fff;
        }
      }
    }

  }

</style>