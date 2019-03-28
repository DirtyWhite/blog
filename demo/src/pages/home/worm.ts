import { Scene, PerspectiveCamera, WebGLRenderer, MeshDepthMaterial, BoxGeometry, Mesh, DirectionalLight, MeshLambertMaterial, MeshPhongMaterial, Vector3, ParametricGeometry, DoubleSide, FlatShading, PlaneGeometry, PlaneBufferGeometry, ImageUtils, RepeatWrapping, MirroredRepeatWrapping } from 'three/src/Three'
import home from './home'
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
        const gemotery = new BoxGeometry(3, 3, 3);
        const material = new MeshLambertMaterial({ color: 0x0000ff })
        const cube = new Mesh(gemotery, material);
        cube.castShadow = true;
        cube.position.y = 1.5
        scene.add(cube);
    }

}