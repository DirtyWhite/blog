import { Scene, PerspectiveCamera, WebGLRenderer, BoxBufferGeometry, BoxGeometry, MeshNormalMaterial, MeshBasicMaterial, Mesh, DirectionalLight } from 'three/src/Three'
import { animationFrameScheduler } from 'rxjs';

require('./style.scss')

/**
 * 初始化场景
 */
const root = document.querySelector('#canvas') as HTMLCanvasElement
const rootStyle = window.getComputedStyle(root, null);
const scene = new Scene();
const camera = new PerspectiveCamera(45, parseFloat(rootStyle.width) / parseFloat(rootStyle.height), 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0)
scene.add(camera)
const light = new DirectionalLight(0xffffff, 1)
light.position.set(0, 1000, 0);
scene.add(light);
const renderer = new WebGLRenderer({
    canvas: root
});

renderer.setClearColor(0xffffff);
renderer.setSize(parseFloat(rootStyle.width), parseFloat(rootStyle.height))

/**
 * 初始化一个物体
 */
const gemotery = new BoxGeometry(1, 1, 1);
const material = new MeshBasicMaterial({ color: 0x0000ff });
const cube = new Mesh(gemotery, material);
scene.add(cube);





/**
 * 渲染
 */


//  const frame = new animationFrameScheduler();
window.requestAnimationFrame(render);
function render() {
    renderer.render(scene, camera)
    window.requestAnimationFrame(render);
}














const main = function () {
    // createScene();
}

export default main;