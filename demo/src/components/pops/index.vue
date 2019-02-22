<script lang='tsx'>
  import { Component, Watch, Vue, Prop } from "vue-property-decorator";

  import { mapMutations, mapActions } from "vuex";
  import { Mutation, Action } from "vuex-class";

  import { pops as P } from "../../baseConfig";

  @Component({
    components: {}
  })
  export default class Pops extends Vue {
    @Prop() curPop;

    getPayload<T>() {
      return this.curPop.payload as T;
    }
    render(h) {
      const pops = {
        [P.test]: () => {
          let { onClick } = this.getPayload<P.test>();
          return (
            <section class={["content", "share"]}>
              <div class="main" onClick={() => onClick()}>
                我是弹窗
              </div>
            </section>
          );
        }
      };
      return <section class="pop">{pops[this.curPop.type]()}</section>;
    }
  }
</script>

<style lang='scss'>
  @import "./index";
</style>
