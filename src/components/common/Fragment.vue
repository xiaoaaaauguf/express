<template>
  <div class="info">
    <NavBar @right="rightClick">
      <div slot="center">{{ title }}</div>
      <div v-if="title === '消息详情'" slot="right"></div>
    </NavBar>
    <div v-if="title === '个人信息'">
      <ul class="top">
        <li>
          <div>姓名</div>
          <span>{{ data.name }}</span>
        </li>
        <li>
          <div>联系电话</div>
          <span>{{ data.phone }}</span>
        </li>
      </ul>
      <ul class="bottom">
        <li>
          <div>性别</div>
          <span>{{ data.sex }}</span>
        </li>
        <li>
          <div>年薪</div>
          <span>{{ data.year_salary }}</span>
        </li>
        <li>
          <div>月薪</div>
          <span>{{ data.month_salary }}</span>
        </li>
        <li>
          <div>个人简介</div>
          <span>{{ data.remark }}</span>
        </li>
      </ul>
    </div>
    <div v-else-if="title === '版本信息'">
      <ul class="top">
        <li>
          <div>当前版本</div>
          <span>{{ data.versions }}</span>
        </li>
      </ul>
      <ul class="bottom">
        <li>
          <div>版本信息</div>
          <span>{{ data.infomation }}</span>
        </li>
      </ul>
    </div>
    <div v-else-if="title === '消息详情'">
      <ul class="top">
        <li>
          <div>系统通知</div>
          <span>{{ data.createTime }}</span>
        </li>
        <li>
          <div>
            发布人:<span>{{ data.sourceName }}</span>
          </div>
        </li>
      </ul>
      <ul class="bottom">
        <li>
          <div>{{ data.msgDate }}</div>
        </li>
        <li>
          <div></div>
          <span>-{{ data.title }}</span>
        </li>
      </ul>
    </div>
    <div v-else-if="title === '新增客户信息'" class="add">
      <ul class="top">
        <li>
          <label for="custName"><span>*</span>客户名称</label>
          <input id="custName" v-model="custName" type="text" />
        </li>
        <li>
          <label for="telephone"><span>*</span>联系方式</label>
          <input id="telephone" v-model="telephone" type="text" />
        </li>
      </ul>
      <ul class="bottom">
        <li>
          <div>学历</div>
          <input v-model="education" type="text" />
        </li>
        <li>
          <div>年龄</div>
          <input v-model="age" type="text" />
        </li>
        <li>
          <div>性别</div>
          <input v-model="sex" type="text" />
        </li>
        <li>
          <div>所属城市</div>
          <input v-model="cityName" type="text" />
        </li>
        <li>
          <div>公司名称</div>
          <input v-model="company" type="text" />
        </li>
        <li>
          <div>职务</div>
          <input v-model="position" type="text" />
        </li>
      </ul>
      <div class="save" @click="saveClick">
        <div :class="{ active }">保存</div>
      </div>
    </div>
    <Popup :toast="toast" :pp.sync="pp" @confirm="addInfo"></Popup>
  </div>
</template>

<script>
import {
  getDetailInfo,
  getVersion,
  getNewsDetail,
  addUserInfo,
} from "network/api";
import NavBar from "./NavBar";
import Card from "./Card";
import Popup from "./Popup";

export default {
  name: "Fragment",
  data() {
    return {
      data: {},
      title: "",
      //新增客户信息集合
      custName: "",
      cityName: "",
      company: "",
      position: "",
      telephone: "",
      education: "",
      sex: "",
      age: "",
      /*-----------*/
      toast: "",
      pp: false,
      code: 500,
    };
  },
  computed: {
    active() {
      if (
        this.custName &&
        this.telephone &&
        this.cityName &&
        this.company &&
        this.position &&
        this.education &&
        this.sex &&
        this.age
      ) {
        return true;
      }
    },
  },
  components: {
    NavBar,
    Card,
    Popup,
  },
  created() {
    let { type, id } = this.$route.query;
    if (type === "info") {
      this.getUserInfo();
    } else if (type === "version") {
      this._getVersion();
    } else if (type === "addUserInfo") {
      //新增用户信息
      this._addUserInfo();
    }
    if (id) {
      this._getNewsDetail(id);
    }
  },
  methods: {
    //保存用户信息
    async saveClick() {
      if (this.active) {
        let errCode = null;
        let { errcode, data } = await addUserInfo({
          custName: this.custName,
          telephone: this.telephone,
          cityName: this.cityName,
          company: this.company,
          position: this.position,
          education: this.education,
          sex: this.sex,
          age: this.age,
        });
        if (errCode == 0) {
          this.toast = "添加成功";
          this.pp = true;
        } else {
          this.$toast("信息填写有误");
        }
      } else {
        this.$toast("未填写完整");
      }
    },
    async getUserInfo() {
      this.title = "个人信息";
      const { data } = await getDetailInfo();
      this.data = data;
    },
    async _getVersion() {
      this.title = "版本信息";
      const { data } = await getVersion();
      this.data = data;
    },
    async _getNewsDetail(id) {
      this.title = "消息详情";
      const { data } = await getNewsDetail(id);
      this.data = data;
    },
    async _addUserInfo() {
      this.title = "新增客户信息";
    },
    //接收navbar事件
    rightClick() {
      this.$router.push("/home");
    },
    addInfo() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.info {
  background: #f5f5f5;
  height: 100vh;
  position: relative;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #eee;
    min-height: 30px;
    background: #fff;
  }

  span {
    color: #666;
  }

  .top {
    padding-top: 10px;
  }

  .bottom {
    margin-top: 10px;
  }
}
.add {
  span {
    margin-right: 5px;
    color: red;
  }
  input {
    flex: 1;
    outline: none;
    padding: 0 0 0 20px;
    border: none;
    color: #666;
  }
  .save {
    z-index: 1001;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    background: #fff;
    padding: 0 10px;
    div {
      height: 44px;
      line-height: 44px;
      font-size: 20px;
      background: #cde7ff;
      border-radius: 15px;
      text-align: center;
      color: #fff;
      font-weight: 500;
      letter-spacing: 10px;
    }
    .active {
      background: lightblue;
    }
  }
}
</style>
