<template>
  <div id="app">
<!-- <keep-alive v-if='$route.meta.isKeep'> -->
<keep-alive v-if="$route.meta.iskeep!=false" exclude="Fragment,ClientDetail,Evaluate,ExComment,SendGoods">
  <router-view />
</keep-alive>
<router-view v-else/>
<Bottom></Bottom>
</div>
</template>

<script>
  import Bottom from "./components/common/Bottom";
  export default {
    name:'App',
    components:{Bottom}
  }
</script>

<style>
  @import "http://at.alicdn.com/t/font_2203654_4lg2fq4latr.css";
  .distpicker-address-wrapper select{
    width: 100px!important;
  }
</style>
