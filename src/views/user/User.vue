<template>
  <div class="user">
    <div class="bg"></div>
    <div class="content">
<!--      用户信息-->
      <section>
        <div class="photo">
          <img src="~assets/img/user/photo.png" alt="">
          <div>{{data.remark}}</div>
        </div>
        <div class="name">
          <div>姓名<span>{{data.name}}</span></div>
          <div>联系方式<span>{{data.phone}}</span></div>
        </div>
      </section>
<!--      用户操作-->
      <section>
        <ul>
          <li v-for="(item,index) in userData" @click="btnClick(index)" :key="index">
            <img :src="item.img" :key="item.img" alt="">
            <span>{{item.text}}</span>
            <span class="fr">{{item.version}} > </span>
          </li>
        </ul>
      </section>
<!--      退出登录-->
      <section @click="logoutClick">退出登录</section>
    </div>
<!--    弹出框-->
    <Popup :pp.sync="pp" :toast="toast"></Popup>
  </div>
</template>

<script>
  import user from 'assets/img/user/user.png'
  import money from 'assets/img/user/money.png'
  import key from 'assets/img/user/key.png'
  import clear from 'assets/img/user/clear.png'

  import {getDetailInfo} from "network/api";
  import Popup from "components/common/Popup";
  export default {
    name: "User",
    components:{Popup},
    data() {
      return {
        money,
        pp:false,
        data:{},
        toast:'',
        userData: [
          {
            img: user,
            text: '个人信息'
          },
          {
            img: money,
            text: '支付中心'
          },
          {
            img: key,
            text: '修改密码'
          },
          {
            img: money,
            text: '版本信息',
            version:'1.0'
          },
          {
            img: clear,
            text: '清除缓存'
          }
        ]
      }
    },
    async created() {
      let {data}=await getDetailInfo()
      this.data=data
    },
    methods:{
      btnClick(index){
        switch (index) {
          case 0:
            this.$router.push({path:'/info',query:{type:'info'}})
            break
          case 1:
            this.toast='无法支付'
            this.pp=true
            break
          case 2:
            this.toast='不能修改'
            this.pp=true
            break
          case 3:
            this.$router.push({path:'/info',query:{type:'version'}})
            break
          case 4:
            this.toast='是否清除缓存?'
            this.pp=true
            break
        }
      },
      logoutClick(){
        this.$router.push('/login')
        localStorage.removeItem('token')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .user {
    background: #f5f5f5;
    z-index: 999;
    position: relative;
    color: #666;
    height: 100vh;

    .bg {
      height: 200px;
      background: #1f4ba2;
    }

    .content {
      padding: 0 15px;
      position: absolute;
      top: 100px;
      left: 0;
      right: 0;

      section{
        background: #fff;
        border-radius: 7px;
      }

      section:nth-child(1) {

        .photo {
          text-align: center;
          font-size: 14px;
          padding: 10px 0;
          position: relative;
          height: 70px;

          img {
            margin: -50px 0 10px 0;
            width: 88px;
          }
        }

        .name {
          display: flex;
          justify-content: space-between;
          margin: 20px;
          padding: 15px 0;
          border-top: 1px dashed #eee;

          span {
            margin-left: 5px;
          }
        }
      }

      section:nth-child(2) {
        margin-top: 10px;
        li {
          height: 50px;
          line-height: 50px;
          padding: 0 15px;
          border-bottom: 1px solid #eee;
          img {
            width: 20px;
            vertical-align: middle;
          }

          span {
            margin-left: 5px;
          }

          .fr {
            float: right;
          }
        }
        li:nth-child(4){

        }
      }

      section:nth-child(3){
        background: #66666680;
        margin-top: 20px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #fff;
      }
    }
    //弹出框
    .pp{
      position: absolute;
      width: 100%;
      height: calc(100vh + 100px);
      background: #00000060;
      top: -100px;
    }
    .popup{
      width: 70%;
      position: absolute;
      top:50%;left: 50%;
      transform: translate(-50%,-20%);
      background: #fff;
      text-align: center;
      border-radius: 7px;
      .mes{
        height: 80px;
        line-height: 80px;
      }
      .btn{
        font-size: 14px;
        display: flex;
        div{
          padding:10px 0;
          flex: 1;
          border-top: 1px solid #eee;
          &:nth-child(1){
            border-right: 1px solid #eee;
          }
        }
      }
    }
  }
</style>