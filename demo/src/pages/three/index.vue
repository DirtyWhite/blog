
<script lang='tsx'>
/**
 * TODO：
 * 镜面反射没成功
 * 元素无法设置位置
 */

import { Component, Watch, Vue } from "vue-property-decorator";

import { mapMutations, mapActions } from "vuex";
import { Mutation, Action } from "vuex-class";

import { pops } from "../../baseConfig";
import {
  Face3,
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  Vector3,
  Clock,
  OrthographicCamera,
  Camera,
  PlaneGeometry,
  SphereGeometry,
  CircleGeometry,
  CylinderGeometry,
  TetrahedronGeometry,
  TorusKnotGeometry,
  TorusGeometry,
  TextGeometry,
  FontLoader,
  MeshPhongMaterial,
  Font,
  Geometry,
  MeshLambertMaterial,
  AmbientLight,
  PointLight,
  Light,
  DirectionalLight,
  SpotLight,
  MeshNormalMaterial,
  TextureLoader,
  RepeatWrapping,
  Quaternion,
  Texture,
  RectAreaLight,
  PointLightHelper,
  SpotLightShadow,
  DoubleSide,
  FileLoader,
  ObjectLoader,
  GridHelper,
  PlaneBufferGeometry,
  MeshPhysicalMaterial,
  MeshStandardMaterial
} from "three/src/Three";
import control from "three-orbitcontrols";
import fbxLoader from "three-fbx-loader";
import { tween } from "popmotion";

const image = require("@/images/demo.png");
const font = require("@/lib/font.json");

Component.registerHooks(["beforeRouteEnter", "beforeRouteLeave"]);
@Component({
  components: {}
})
export default class ThreeDemo extends Vue {
  el: HTMLCanvasElement;

  scene: Scene;
  camera: Camera;
  light: Light;
  renderer: WebGLRenderer;
  box: Mesh;

  mounted() {
    this.initScene();
    this.animation();
    this.renderLoop();
  }

  initScene() {
    this.el = document.querySelector("#three");
    this.scene = new Scene();
    this.renderer = new WebGLRenderer({
      canvas: this.el
    });
    this.renderer.setClearColor(0xffffff);

    this.camera = new PerspectiveCamera(
      45,
      this.el.width / this.el.height,
      1,
      1000
    );
    this.camera.position.set(10, 10, 10);
    this.camera.lookAt(0, 0, 0);
    this.scene.add(this.camera);

    this.light = new DirectionalLight(0xffffff, 1);
    this.light.position.set(3000, 10000, -3000);
    this.scene.add(this.light);

    const controls = new control(this.camera, this.renderer.domElement);
  }

  animation() {
    let loader = new fbxLoader() as ObjectLoader;
    loader.load("/static/models/工厂.fbx", object => {
      object.scale.set(0.003, 0.003, 0.003);
      object.position.y = 1.5;
      this.scene.add(object);
    });
    const mesh = new Mesh(
      new PlaneBufferGeometry(2000, 2000),
      new MeshLambertMaterial({
        color: 0xeeeeee,
        side: DoubleSide
      })
    );
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    this.scene.add(mesh);
  }

  run(ball) {
    let rotate = 0;
    let initTime;
    const run = time => {
      ball.rotation.y = rotate;
      rotate += 0.01;
      requestAnimationFrame(run);
    };
    requestAnimationFrame(run);
  }

  renderLoop() {
    requestAnimationFrame(this.renderLoop);
    this.renderer.render(this.scene, this.camera);
  }

  render(h) {
    return (
      <div class="threeDemo">
        <canvas id="three" width="1000" height="800" style="margin:0 auto;" />
      </div>
    );
  }
}
</script>

<style lang='scss' scoped>
/*@import "../../lib/common/sass/common";*/
@import "../../images";
</style>
