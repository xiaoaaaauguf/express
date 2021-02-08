<template>
  <ul>
    <li
      v-for="(item, index) in btData"
      @click="$router.push(item.link);"
      :class="{active:index == currentIndex}"
      :key="index"
    >
      <i class="iconfont" :class="item.class"></i>
      <div>{{ item.text }}</div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Bottom",
  data() {
    return {
      btData: [
        {
          class: "icon-yemian",
          text: "系统功能",
          link: "/home",
        },
        {
          class: "icon-xinxi",
          text: "联系",
          link: "/news",
        },
        {
          class: "icon-yonghu1",
          text: "个人中心",
          link: "/user",
        },
      ],
    };
  },
  computed:{
    currentIndex(){
      return this.$route.meta.index
    }
  }
};
</script>

<style lang="scss" scoped>
ul {
  z-index: 999;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 59px;
  background: #fff;
  display: flex;

  .active {
    color: #003399;
  }

  li {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;

    .xinxi {
      position: absolute;
      top: -30px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 66px;
      height: 66px;
      border-radius: 50%;
      background: #ffcc33;
      color: #fff;
      border: 5px solid #f5f5f5;
    }

    i {
      font-size: 25px;
    }
  }
}
</style>
