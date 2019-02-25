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
  gl: WebGLRenderingContext;
  glProgram;
  config = [`vec4(.0,.0,.0,1.9)`];
  VSHADER_SOURCE = `
  attribute vec4 a_Position;
    void main() {
      gl_Position  = a_Position;
      gl_PointSize  = 20.0;
    }
  `;
  FSHADER_SOURCE = `
    void main() {
      gl_FragColor = vec4(0.0,0.0,0.0,1.0);
    }
  `;
  mounted() {
    this.el = document.querySelector("#webGL");
    this.gl = this.el.getContext("webgl");
    this.glProgram = this.initShaders();
    this.initStage();
    this.drawRect();
  }
  initShaders() {
    const { gl, loadShader, VSHADER_SOURCE, FSHADER_SOURCE } = this;
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, VSHADER_SOURCE);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, FSHADER_SOURCE);

    // 创建着色器程序

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    // 创建失败， alert
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert(
        "Unable to initialize the shader program: " +
          gl.getProgramInfoLog(shaderProgram)
      );
      return null;
    }
    return shaderProgram;
  }
  loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    // Send the source to the shader object

    gl.shaderSource(shader, source);

    // Compile the shader program

    gl.compileShader(shader);

    // See if it compiled successfully

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert(
        "An error occurred compiling the shaders: " +
          gl.getShaderInfoLog(shader)
      );
      gl.deleteShader(shader);
      return null;
    }
  }
  initStage() {
    this.gl.clearColor(0.95, 0.95, 0.95, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }
  drawRect() {
    let a_Position = this.gl.getAttribLocation(this.glProgram, "a_Position");
    this.gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);
    this.gl.drawArrays(this.gl.POINTS, 0, 1);
  }
  render(h) {
    return (
      <div class="webGLDemo">
        <canvas id="webGL" width="300" height="300" />
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
