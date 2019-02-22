<script lang='tsx'>
  import { Component, Vue } from "vue-property-decorator";
  import globalMixin from "@/mixin";
  import { Action, Mutation } from "vuex-class";

  import Pops from "../../components/pops/index.vue";
  import loading from "../../components/loading/index.vue";

  Vue.mixin(globalMixin);
  Component.registerHooks(["beforeRouteEnter", "beforeRouteLeave"]);

  @Component({
    components: {
      "pops-cpn": Pops,
      "loading-cpn": loading
    }
  })
  export default class Index extends Vue {
    @Mutation("updateLoading") updateLoading;
    created() {}
    mounted() {
      this.updateLoading(false);
    }

    render(h) {
      return (
        <div id="app">
          <router-view />
          {this.$state.pops.map(el => (
            <transition name="fade">
              <pops-cpn curPop={el} />
            </transition>
          ))}
          {this.$state.isLoading && <loading-cpn />}
        </div>
      );
    }
  }
</script>

<style lang='scss'>
  // @import "../../lib/common/sass/reset";
  // @import "../../lib/common/sass/global";
</style>
