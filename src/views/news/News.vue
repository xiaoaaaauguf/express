<template>
  <div class="news">
    <NavBar @right="rightClick">
      <div slot="center">消息中心</div>
      <div slot="right">
        <div class="right">
          <div>排序</div>
          <img src="~assets/img/news/排序.png" alt="">
        </div>
      </div>
    </NavBar>
    <!--    tab栏-->
    <tab-bar :titles="titles" @toggleClick="toggleClick"></tab-bar>
    <!--    消息列表-->
    <ul>
      <li v-for="item in news" @click="newsClick(item.id)" :key="item.id">
        <div class="left">
          <div class="img">
            <!--            信息图片-->
            <img v-if="item.type===1" class="newsImg" src="~assets/img/news/系统消息.png" alt="">
            <img v-else-if="item.type===2" class="newsImg" src="~assets/img/news/个人信息.png" alt="">
            <img v-if="item.isReader===0" class="dot" src="~assets/img/news/红点.png" alt="">
          </div>
          <div>
            <div class="t1">{{item.title}}
              <img v-if="item.top===1" src="~assets/img/news/置顶.png"/>
            </div>
            <div class="t2">发布人:<span>{{item.sourceName}}</span></div>
          </div>
        </div>
        <div class="right">{{item.createTime}}<span> > </span></div>
      </li>
    </ul>
    <!--    分页-->
    <Page :pages.sync="pages" @currentPage="currentPage"></Page>
  </div>
</template>

<script>
  import NavBar from "components/common/NavBar";
  import TabBar from "components/common/TabBar";
  import Page from "components/common/Page";
  import {getNews, readReceipt} from "network/api";
  export default {
    name: "News",
    data() {
      return {
        titles: ['全部消息', '系统消息', '个人消息'],
        news: [],
        newsDetail: {},
        pages:{},
        type:0
      }
    },
    created() {
      this._getNews({})
    },
    components: {NavBar, TabBar,Page},
    methods: {
      //NavBar事件,排序
      rightClick() {
        this.news.sort((n1, n2) => {
          return +new Date(n1.createTime) - (+new Date(n2.createTime))
        })
      },
      //Page组件事件,分页
      currentPage(index){
        this._getNews({current:index,type:this.type})
      },
      //TabBar事件,切换
      toggleClick(index) {
        this.type=index
        this._getNews({current:1,type: index})
      },
      async newsClick(id) {
        let data = await readReceipt(id)
        this.$router.push({path: '/info', query: {id}})
      },

      //获取所有信息
      async _getNews({current = 1, size = 7, type = 0}) {
        let {data} = await getNews({current, size, type})
        this.news = data.records
        this.pages={sum:data.pages,total:data.total,current}
      }
    }
  }
</script>

<style lang="scss" scoped>
  .news {
    background: #f5f5f5;
    height: 100vh;
  }

  .right {
    display: flex;

    img {
      width: 18px;
    }
  }

  ul {
    margin-top: 10px;
    background: #fff;

    li {
      height: 62px;
      padding: 0 10px;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #999;
      font-size: 14px;

      .left {
        display: flex;

        .t1 {
          color: #666;
          font-size: 15px;
          margin-bottom: 5px;

          img {
            margin-left: 5px;
            width: 9px;
          }
        }

        .t2 {
          margin-top: 5px;

          span {
            margin-left: 7px;
            font-size: 13px;
          }
        }

        .img {
          position: relative;

          .newsImg {
            width: 38px;
            margin-right: 15px;
          }

          .dot {
            position: absolute;
            width: 10px;
            right: 15px;
            top: 0;
          }
        }
      }

      .right {
        span {
          margin-left: 10px;
        }
      }
    }
  }
</style>