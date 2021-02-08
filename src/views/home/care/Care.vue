<template>
  <div class="care">
    <NavBar>
      <div slot="center">客户关怀</div>
    </NavBar>
    <h1></h1>
  </div>

</template>

<script>
  import NavBar from "components/common/NavBar";
  export default {
    name: "Care",
    components:{NavBar}
  }
</script>

<style lang="scss" scoped>
h1{
  text-align: center;
}
</style>