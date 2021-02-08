<template>
  <div class="client">
    <NavBar @right="rightClick">
      <div slot="center">客户列表信息</div>
      <div slot="right">新增</div>
    </NavBar>
    <Query @queryVal="queryVal" :hint="hint"></Query>
    <Card class="card" v-for="item in result" :key="item.telephone">
      <div slot="left" class="card-t-l" @click="clientClick(item.id)">
        <div>
          客户名称<span>{{ item.custName }}</span>
        </div>
        <div>
          联系方式<span>{{ item.telephone }}</span>
        </div>
        <div>
          公司名称<span>{{ item.company }}</span>
        </div>
        <div>
          职务<span>{{ item.position }}</span>
        </div>
      </div>
      <div class="card-b-r" slot="b-right">
        <span>新增拜访</span>
        <span>拜访记录</span>
      </div>
    </Card>
    <Page :pages="pages" @currentPage="currentPage"></Page>
  </div>
</template>

<script>
import NavBar from "components/common/NavBar";
import Card from "components/common/Card";
import Page from "components/common/Page";
import Query from "components/common/Query";
import { getClientList } from "network/api";
export default {
  name: "Client",
  components: { Card, NavBar, Page, Query },
  data() {
    return {
      result: [],
      keyword: "",
      pages: {}, //分页
      hint: "客户名称/联系方式",
    };
  },
  created() {
    this._getClientList({});
  },
  methods: {
    //NavBar事件,新增用户信息
    rightClick() {
      this.$router.push({ path: "/info", query: { type: "addUserInfo" } });
    },
    //Page事件,分页
    currentPage(current) {
      this._getClientList({ keyword: this.keyword, current });
    },
    async _getClientList({ keyword, current = 1, size = 3 }) {
      const { data } = await getClientList({ keyword, current, size });
      this.result = data.records;
      this.pages = {
        current: current,
        total: data.total,
        sum: data.pages,
      };
    },
    //查询
    queryVal(keyword) {
      this._getClientList({ keyword });
    },
    //客户信息点击
    clientClick(id) {
      this.$router.push({ path: "/clientDetail", query: { id } });
    },
  },
};
</script>

<style lang="scss" scoped>
.client {
  min-height: 100vh;
  background: #f5f5f5;
}

.card {
  margin-top: 10px;
  .card-t-l {
    div {
      color: #666;
      margin-top: 10px;
      font-size: 14px;
    }

    span {
      margin-left: 10px;
      color: #000;
    }
  }

  .card-b-r {
    min-height: 50px;
    line-height: 50px;
    span {
      background: #003399;
      padding: 5px 12px;
      border-radius: 15px;
      color: #fff;
      margin-left: 10px;
      font-size: 14px;
    }
  }
}
</style>
