import { Scene, PerspectiveCamera, WebGLRenderer, MeshDepthMaterial, BoxGeometry, Mesh, DirectionalLight, MeshLambertMaterial, MeshPhongMaterial, Vector3, ParametricGeometry, DoubleSide, FlatShading, PlaneGeometry, PlaneBufferGeometry, ImageUtils, RepeatWrapping, MirroredRepeatWrapping } from 'three/src/Three'
import control from "three-orbitcontrols";
import { FLOOR_SIZE } from '@/baseConfig';
require('./style.scss')

export default class Home {

    private static readonly singleton = new Home();

    public static get instance() {
        return Home.singleton
    }

    private constructor() { }

    readonly root = document.querySelector('#canvas') as HTMLCanvasElement
    readonly rootStyle = window.getComputedStyle(this.root, null);
    readonly scene = new Scene();
    readonly renderer = new WebGLRenderer({
        canvas: this.root
    });
    readonly mainCamera = new PerspectiveCamera(
        45,
        parseFloat(this.rootStyle.width) / parseFloat(this.rootStyle.height),
        0.1,
        3000
    );
    readonly mainLight = new DirectionalLight(0xffffff, 1)

    public init() {
        this.initRender();
        this.initCamera();
        this.initMainLight();
        this.initControl();
    }

    private initRender() {
        const { rootStyle, renderer } = this;
        renderer.setClearColor(0xeeeeee);
        renderer.setSize(parseFloat(rootStyle.width), parseFloat(rootStyle.height))
        renderer.shadowMap.enabled = true;
    }

    private initCamera() {
        const { mainCamera, scene } = this;
        mainCamera.position.set(0, 10, FLOOR_SIZE);
        scene.add(mainCamera)
    }

    private initMainLight() {
        const { mainLight, scene } = this;
        mainLight.position.set(10, 10, 10);
        mainLight.castShadow = true;
        scene.add(mainLight);
    }

    private initControl() {
        const { mainLight, mainCamera } = this;
        new control(mainLight, mainCamera)
    }

    private render() {
        const { scene, renderer, mainCamera } = this;
        window.requestAnimationFrame(render);
        function render() {
            renderer.render(scene, mainCamera)
            window.requestAnimationFrame(render);
        }
    }
}



// async function generateFloor() {
//     const floorPicSrc = require('../../images/floor.png') as string
//     const floorTexture = ImageUtils.loadTexture(floorPicSrc)
//     floorTexture.wrapS = RepeatWrapping
//     floorTexture.wrapT = RepeatWrapping
//     floorTexture.repeat.set(10, 10);
//     const plane = new PlaneBufferGeometry(FLOOR_SIZE, FLOOR_SIZE);
//     const planeMaterial = new MeshLambertMaterial({ side: DoubleSide, map: floorTexture });
//     const ground = new Mesh(plane, planeMaterial)
//     ground.rotation.x = Math.PI / 2
//     ground.receiveShadow = true;
//     scene.add(ground);
// }
// generateFloor();

/**
 * 初始化一个物体
 */
// const gemotery = new BoxGeometry(3, 3, 3);
// const material = new MeshLambertMaterial({ color: 0x0000ff })
// const cube = new Mesh(gemotery, material);
// cube.castShadow = true;
// cube.position.y = 1.5
// scene.add(cube);






