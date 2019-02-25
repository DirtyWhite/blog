<script lang='tsx'>
import { Component, Watch, Vue } from "vue-property-decorator";

import { mapMutations, mapActions } from "vuex";
import { Mutation, Action } from "vuex-class";

import { pops } from "../../baseConfig";

Component.registerHooks(["beforeRouteEnter", "beforeRouteLeave"]);

@Component({
  components: {}
})
export default class webGLDemo extends Vue {
  el: HTMLCanvasElement;

  mounted() {}

  render(h) {
    return (
      <div class="threeDemo">
        <canvas id="three" width="300" height="300" />
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
