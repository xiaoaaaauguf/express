<template>
  <div class="send-goods">
    <nav-bar>
      <div slot="right"></div>
    </nav-bar>
    <!-- 订单详情 -->
    <div class="mt">
      <cc v-for="(item, index) in lineData" :key="index">
        <div slot="left">{{ item.key }}</div>
        <div slot="right">{{ item.val }}</div>
      </cc>
    </div>
    <!-- 收货人信息 -->
    <div class="mt">
      <cc v-for="(item, index) in giveData" :key="index">
        <div slot="left">{{ item.key }}</div>
        <div slot="right">
          <textarea v-if="item.key == '收货地址'" v-model="item.val"></textarea>
          <VDistpicker
            :province="select.province"
            :city="select.city"
            :area="select.area"
            @selected='getAddress'
            v-else-if="item.key == '选择地址'"
          ></VDistpicker>
          <input v-else type="text" v-model="item.val" />
        </div>
      </cc>
    </div>
    <div class="saveInfo">
      <div class="msg" @click="save">确认发货消息</div>
    </div>
  </div>
</template>

<script>
import { sendGoods, lineItem } from "@/network/api";
import VDistpicker from "v-distpicker";
import NavBar from "components/common/NavBar.vue";
import Cc from "components/common/cc.vue";
export default {
  components: { NavBar, Cc, VDistpicker },

  data() {
    return {
      lineData: [],
      serialNo: "",
      giveData: [],
      select: { province: "", city: "", area: "" },
    };
  },
  async created() {
    this.serialNo = this.$route.params.id;
    let { data } = await lineItem(this.serialNo);
    // 订单信息
    this.lineData = [
      {
        key: "客户",
        val: data.cusName,
      },
      {
        key: "商品",
        val: data.prodName,
      },
      {
        key: "数量",
        val: data.prodNum,
      },
      {
        key: "下单人",
        val: data.orderUserName,
      },
      {
        key: "下单时间",
        val: data.orderTime,
      },
    ];
    //发货信息
    this.giveData = [
      {
        key: "收货人",
        val: "",
      },
      {
        key: "联系电话",
        val: "",
      },
      {
        key: "选择地址",
      },
      {
        key: "收货地址",
        val: "",
      },
      {
        key: "物流编号",
        val: this.serialNo,
      },
    ];
  },
  methods: {
    //获取地址信息
    getAddress({area,city,province}){
      console.log({area,city,province})
      this.giveData[3].val=province.value+' '+city.value+' '+area.value+' '
    },
    //确定发货
    save() {
      sendGoods({
        serialNo: this.serialNo,
        receiver: this.giveData[0].val,
        linkPhone: this.giveData[1].val,
        address: this.giveData[3].val,
        logisticsCode: this.giveData[4].val,
      }).then(({errCode})=>{
        if(errCode==0){
          this.$toast('发货成功')
          this.$router.back()
        }else{
          this.$toast('信息填写错误')
        }
      })
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/global-style.scss";
.send-goods {
  position: relative;
  min-height: 100vh;
  background: #eee;
  .mt {
    margin-top: 10px;
    input,
    textarea {
      background: #ececec;
      border: none;
      min-height: 30px;
      width: 90%;
      padding: 0 15px;
      border-radius: 5px;
      outline: none;
      color: #666;
    }
    textarea {
      padding: 10px 15px;
      line-height: 20px;
    }
  }
  .saveInfo {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 59px;
    z-index: 1009;
    background: #fff;
    padding: 0 18px;
    display: flex;
    align-items: center;
    .msg {
      flex: 1;
      background: $theme-color;
      color: #fff;
      text-align: center;
      height: 40px;
      line-height: 40px;
      border-radius: 20px;
    }
  }
}
// 地址插件
.distpicker-address-wrapper {
  text-align: left;
}
</style>
