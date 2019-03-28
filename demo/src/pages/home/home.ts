import { Scene, PerspectiveCamera, WebGLRenderer, MeshDepthMaterial, BoxGeometry, Mesh, DirectionalLight, MeshLambertMaterial, MeshPhongMaterial, Vector3, ParametricGeometry, DoubleSide, FlatShading, PlaneGeometry, PlaneBufferGeometry, ImageUtils, RepeatWrapping, MirroredRepeatWrapping } from 'three/src/Three'
import control from "three-orbitcontrols";
import { FLOOR_SIZE } from '@/baseConfig';
require('./style.scss')

/**
 * 初始化场景
 */
const root = document.querySelector('#canvas') as HTMLCanvasElement
const rootStyle = window.getComputedStyle(root, null);

const scene = new Scene();

const camera = new PerspectiveCamera(45, parseFloat(rootStyle.width) / parseFloat(rootStyle.height), 0.1, 3000);
camera.position.set(0, 10, FLOOR_SIZE);

scene.add(camera)

const light = new DirectionalLight(0xffffff, 1)
light.position.set(10, 10, 10);
light.castShadow = true;
scene.add(light);

const renderer = new WebGLRenderer({
    canvas: root
});
renderer.setClearColor(0xeeeeee);
renderer.setSize(parseFloat(rootStyle.width), parseFloat(rootStyle.height))
renderer.shadowMap.enabled = true;

new control(camera, renderer.domElement);

/**
 * 初始化地板
 */



async function generateFloor() {
    const floorPicSrc = require('../../images/floor.png') as string
    const floorTexture = ImageUtils.loadTexture(floorPicSrc)
    floorTexture.wrapS = RepeatWrapping
    floorTexture.wrapT = RepeatWrapping
    floorTexture.repeat.set(10, 10);
    const plane = new PlaneBufferGeometry(FLOOR_SIZE, FLOOR_SIZE);
    const planeMaterial = new MeshLambertMaterial({ side: DoubleSide, map: floorTexture });
    const ground = new Mesh(plane, planeMaterial)
    ground.rotation.x = Math.PI / 2
    ground.receiveShadow = true;
    scene.add(ground);
}
generateFloor();

/**
 * 初始化一个物体
 */
const gemotery = new BoxGeometry(3, 3, 3);
const material = new MeshLambertMaterial({ color: 0x0000ff })
const cube = new Mesh(gemotery, material);
cube.castShadow = true;
cube.position.y = 1.5
scene.add(cube);


function runCamera() {

}




function animate() {
    // camera.lookAt(0, 50, 0)
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