<template>
  <div class="pp" v-show="pp">
    <div class="popup">
      <div class="mes">{{toast}}</div>
      <div class="btn">
        <div @click="clearClick(false)">取消</div>
        <div @click="clearClick(true)">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Popup",
    props:{
      toast:{
        type:String,
        default:''
      },
      pp:{
        type: Boolean,
        default: false
      }
    },
    methods: {
      clearClick(bool) {
        this.$emit('update:pp',false)
        if(bool){
          this.$emit('confirm')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  //弹出框
  .pp {
    position: absolute;
    width: 100%;
    height: calc(100vh + 100px);
    background: #00000060;
    top: -100px;
  }

  .popup {
    width: 70%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -20%);
    background: #fff;
    text-align: center;
    border-radius: 7px;

    .mes {
      height: 80px;
      line-height: 80px;
    }

    .btn {
      font-size: 14px;
      display: flex;

      div {
        padding: 10px 0;
        flex: 1;
        border-top: 1px solid #eee;

        &:nth-child(1) {
          border-right: 1px solid #eee;
        }
      }
    }
  }
</style>