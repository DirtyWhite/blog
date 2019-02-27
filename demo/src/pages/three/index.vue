
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
  Texture
} from "three/src/Three";
import control from "three-orbitcontrols";

const image = require("@/images/demo.png");

Component.registerHooks(["beforeRouteEnter", "beforeRouteLeave"]);
const font = require("@/lib/font.json");
@Component({
  components: {}
})
export default class webGLDemo extends Vue {
  el: HTMLCanvasElement;

  scene: Scene;
  camera: Camera;
  light: Light;
  renderer: WebGLRenderer;
  box: Mesh;

  mounted() {
    this.initScene();
    this.initControl();
    // this.draw();
    this.animation();
    this.renderLoop();
  }

  initControl() {
    const controls = new control(this.camera, this.renderer.domElement);
  }

  initScene() {
    this.el = document.querySelector("#three");
    this.scene = new Scene();

    this.renderer = new WebGLRenderer({
      canvas: this.el
    });
    this.renderer.setClearColor(0x888888);
  }
  draw() {
    const loader = new TextureLoader();
    loader.load(image as string, texture => {
      texture.wrapS = texture.wrapT = RepeatWrapping;
      texture.repeat.set(2, 2);
      const box = new BoxGeometry(1, 1, 1);
      const material = new MeshPhongMaterial({
        // emissive: 0x333333,
        // specular: 0xffffff,
        map: texture
        // opacity: 0.9,
        // transparent: true
      });
      this.box = new Mesh(box, material);
      this.box.rotation.setFromQuaternion(new Quaternion(-0.1));
      this.scene.add(this.box);
    });

    // const plane = new PlaneGeometry(3, 3);
    // const planeMaterial = new MeshBasicMaterial({
    //   color: 0xffffff
    // });
    // const planeObj = new Mesh(plane, planeMaterial);
    // this.scene.add(planeObj);

    // const ball = new SphereGeometry(1, 100, 100);
    // const ballMaterial = new MeshPhongMaterial({
    //   specular: 0xffff00
    //   // shininess: 30
    // });
    // const ballObj = new Mesh(ball, ballMaterial);
    // this.scene.add(ballObj);
    // const circle = new CircleGeometry(1);
    // const circleMaterial = new MeshBasicMaterial({
    //   color: 0xff00ff,
    //   wireframe: true
    // });
    // const circleObj = new Mesh(circle, circleMaterial);
    // this.scene.add(circleObj);
    // const cylinder = new CylinderGeometry(2, 1, 2, 100, 30);
    // const cylinderMaterial = new MeshBasicMaterial({
    //   color: 0xff00ff,
    //   wireframe: true
    // });
    // const cylinderObj = new Mesh(cylinder, cylinderMaterial);
    // this.scene.add(cylinderObj);
    // const cylinder = new TetrahedronGeometry(1);
    // const cylinderMaterial = new MeshBasicMaterial({
    //   color: 0xff00ff,
    //   wireframe: true
    // });
    // const cylinderObj = new Mesh(cylinder, cylinderMaterial);
    // this.scene.add(cylinderObj);
    // const loadedFont = new Font(font);
    // const textGeometry = new TextGeometry("A", {
    //   font: loadedFont,
    //   size: 1,
    //   height: 1
    // });
    // const fontMaterial = new MeshBasicMaterial({
    //   color: 0xffff,
    //   opacity: 0.5
    //   // wireframe: true
    // });
    // const text = new Mesh(textGeometry, fontMaterial);
    // this.scene.add(text);
    // const cylinder = new TorusGeometry(1, 0.2, 3, 100);
    // const cylinderMaterial = new MeshBasicMaterial({
    //   color: 0xff00ff,
    //   wireframe: true
    // });
    // const cylinderObj = new Mesh(cylinder, cylinderMaterial);
    // this.scene.add(cylinderObj);
  }

  animation() {
    const ball = new Mesh(
      new SphereGeometry(1, 100, 100),
      new MeshLambertMaterial({
        color: 0xffff00
      })
    );
    ball.position.y = 0;
    this.scene.add(ball);

    const loader = new TextureLoader();
    loader.load(image as string, texture => {
      const plane = new Mesh(
        new PlaneGeometry(3, 3),
        new MeshLambertMaterial({ map: texture })
      );
      plane.rotation.x = (-Math.PI / 2) * 5;
      this.scene.add(plane);
    });
  }

  renderLoop() {
    requestAnimationFrame(this.renderLoop);
    this.renderer.render(this.scene, this.camera);
  }

  render(h) {
    return (
      <div class="threeDemo">
        <canvas id="three" width="500" height="500" style="margin:0 auto;" />
      </div>
    );
  }
}
</script>

<style lang='scss' scoped>
/*@import "../../lib/common/sass/common";*/
@import "../../images";
</style>
