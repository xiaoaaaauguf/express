import Vue from "vue";
import $ from "jquery";
import "./toast.scss";
export default {
  install(Vue) {
    //弹窗组件
    

    Vue.mixin({
      mounted() {
        
        //显示toast
        this.$toast = (val) => {
          const Toast = Vue.extend({
            render() {
              return <div id="toast">{val.trim()}</div>;
            },
          });
          $("body").append(`
          <div id='wrap'>
            <div id='toast'></div>
          </div>`);
          this.toastComp = new Toast();
          this.toastComp.$mount("#toast");
          setTimeout(() => {
            $("#wrap").remove();
          }, 1400);
        };
      },
    });
  },
};
