<script lang='tsx'>
  import { Component, Watch, Vue } from "vue-property-decorator";

  import { mapMutations, mapActions } from "vuex";
  import { Mutation, Action } from "vuex-class";

  import { pops } from "../../baseConfig";

  Component.registerHooks(["beforeRouteEnter", "beforeRouteLeave"]);

  @Component({
    components: {}
  })
  export default class Home extends Vue {
    render(h) {
      return (
        <div
          onClick={() =>
            //没点击一次都会增加一个弹窗
            this.pushPop<pops.test>(pops.test, {
              onClick: () => {
                console.log("pushpop");
              }
            })
          }
        >
          helloworld
        </div>
      );
    }
  }
</script>

<style lang='scss' scoped>
  /*@import "../../lib/common/sass/common";*/
  @import "../../images";
  @import "./index";
</style>
