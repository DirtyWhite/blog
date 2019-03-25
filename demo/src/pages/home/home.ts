import { Scene, PerspectiveCamera, WebGLRenderer, MeshDepthMaterial, BoxGeometry, Mesh, DirectionalLight, MeshLambertMaterial, MeshPhongMaterial, Vector3, ParametricGeometry, DoubleSide, FlatShading } from 'three/src/Three'
import control from "three-orbitcontrols";
require('./style.scss')

// /**
//  * 初始化场景
//  */
const root = document.querySelector('#canvas') as HTMLCanvasElement
const rootStyle = window.getComputedStyle(root, null);

const scene = new Scene();

const camera = new PerspectiveCamera(45, parseFloat(rootStyle.width) / parseFloat(rootStyle.height), 0.1, 1000);
camera.position.set(0, 20, 20);
camera.lookAt(0, 0, 0)
scene.add(camera)

const light = new DirectionalLight(0xffffff, 1)
light.position.set(0, 50, 50);
scene.add(light);

const renderer = new WebGLRenderer({
    canvas: root
});
renderer.setClearColor(0xeeeeee);
renderer.setSize(parseFloat(rootStyle.width), parseFloat(rootStyle.height))

new control(camera, renderer.domElement);

/**
 * 初始化一个物体
 */
const gemotery = new BoxGeometry(3, 3, 3);
const material = new MeshLambertMaterial({ color: 0x0000ff })
const cube = new Mesh(gemotery, material);
scene.add(cube);

function animate() {
    cube.rotation.x += .01
    cube.rotation.y += .01
    // cube.rotation.z += .01
    requestAnimationFrame(animate)
}

requestAnimationFrame(animate)

/**
 * 渲染
 */
const main = function () {
    window.requestAnimationFrame(render);
    function render() {
        renderer.render(scene, camera)
        window.requestAnimationFrame(render);
    }
}
export default main;