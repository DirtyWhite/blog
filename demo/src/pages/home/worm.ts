import { Scene, PerspectiveCamera, WebGLRenderer, MeshDepthMaterial, BoxGeometry, Mesh, DirectionalLight, MeshLambertMaterial, MeshPhongMaterial, Vector3, ParametricGeometry, DoubleSide, FlatShading, PlaneGeometry, PlaneBufferGeometry, ImageUtils, RepeatWrapping, MirroredRepeatWrapping, MeshBasicMaterial, MeshStandardMaterial } from 'three/src/Three'
import home from './home'
import { FLOOR_SIZE } from '@/baseConfig';
/**
 * 虫子类
 * 渲染
 * 运动
 * 控制
 * 碰撞
 */



export default class Worm {
    constructor() {
        this.init();
    }
    init() {
        const { scene } = home
        const brickSrc = require('../../images/lava.png') as string;
        const brickTexture = ImageUtils.loadTexture(brickSrc)
        const gemotery = new BoxGeometry(10, 10, 10);
        const material = new MeshStandardMaterial({ map: brickTexture })
        const cube = new Mesh(gemotery, material);
        cube.castShadow = true;
        cube.position.set(FLOOR_SIZE / 4, 10 / 2, FLOOR_SIZE / 4)
        scene.add(cube);
    }

}