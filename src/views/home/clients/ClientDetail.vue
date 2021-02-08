<template>
  <div class="user-detail">
    <NavBar>
      <div slot="center">客户详情</div>
    </NavBar>
    <div class="bg"></div>
    <header>
      <div class="photo">
        <img src="~assets/img/user/photo.png" alt="">
        <div>{{data.custName}}</div>
      </div>
      <div class="edit">编辑信息</div>
    </header>
    <div class="content">
      <!--      用户信息-->
      <section>
        <img src="~assets/img/clients/基本信息.png"/>
        <span>基本信息</span>
      </section>
      <section>
        <ul>
          <li v-for="item in data" :key="item.key">
            <span>{{item.key}}</span>{{item.value}}</li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
  import {getClientDetail} from "network/api";
  import NavBar from "components/common/NavBar";

  export default {
    name: "ClientDetail",
    data() {
      return {
        data: []
      }
    },
    components: {NavBar},
    created() {
      let id = this.$route.query.id
      this._getClientDetail(id)
    },
    methods: {
      async _getClientDetail(id) {
        let {data} = await getClientDetail(id)
        this.data = [
          {key:'客户名称',value:data.custName},
          {key:'联系电话',value:data.telephone},
          {key:'学历',value:data.education},
          {key:'性别',value:data.sex},
          {key:'年龄',value:data.age},
          {key:'所属城市',value:data.cityName},
          {key:'公司名称',value:data.company},
          {key:'职位',value:data.position},
          {key:'录入时间',value:data.createTime}
        ]
      }
    },
    watch:{
      route(to,from){
        console.log(1111)
        console.log(to,from)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .user-detail {
    background: #f5f5f5;
    z-index: 1002;
    position: relative;
    color: #666;
    height: 100vh;


    .bg {
      height: 150px;
      background: #003399;
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 70px;
      color: #fff;
      position: absolute;
      top: 50px;
      left: 0;
      right: 0;

      .photo {
        display: flex;
        align-items: center;
        font-size: 18px;
        padding: 10px 0;
        font-weight: 500;

        img {
          width: 55px;
          border: 3px solid lightblue;
          border-radius: 50%;
          vertical-align: center;
          margin: 0 20px 0 25px;
        }
      }

      .edit {
        background: #335cad;
        padding: 7px 20px;
        border-radius: 20px 0 0 20px;
        font-size: 14px;
      }
    }


    .content {
      margin: -30px 10px 0 10px;
      border-radius: 15px;
      background: #fff;

      section:nth-child(1) {
        padding: 0 15px;
        display: flex;
        align-items: center;
        height: 50px;

        color: #000;
        font-weight: 500;
        border-bottom: 1px dashed #eee;

        img {
          width: 20px;
          vertical-align: middle;
          margin-right: 10px;
        }
      }

      section:nth-child(2) {
        background: url("../../../assets/img/clients/底纹.png");
        background-size: 100%;
        background-position: 0 -20px;
        height: 520px;

        ul {
          margin: 0;
          padding: 0 15px;
          li{
            height: 30px;
            line-height: 30px;
            padding: 5px 0;
            display: flex;
            color: #333;
            font-size: 14px;
            span{
              width: 66px;
              text-align: right;
              margin-right: 15px;
              color: #666;
            }
          }
        }
      }

    }
  }

</style>