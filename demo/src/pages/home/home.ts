import { Scene, PerspectiveCamera, WebGLRenderer, DirectionalLight } from 'three/src/Three'
import control from "three-orbitcontrols";
import { FLOOR_SIZE, SPEED, FPS } from '@/baseConfig';
import sceneBuilder from './scene'
import { interval } from 'rxjs';
import { animationFrame } from 'rxjs/internal/scheduler/animationFrame';
require('./home.scss')

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

    private tick$ = interval(SPEED)

    public fps$ = interval(1000 / FPS, animationFrame)


    public main(): void {
        this.init();
    }

    private init() {
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

    // private render() {
    //     const { scene, renderer, mainCamera } = this;
    //     window.requestAnimationFrame(render);
    //     function render() {
    //         renderer.render(scene, mainCamera)
    //         window.requestAnimationFrame(render);
    //     }
    // }
}





/**
 * 初始化一个物体
 */
// const gemotery = new BoxGeometry(3, 3, 3);
// const material = new MeshLambertMaterial({ color: 0x0000ff })
// const cube = new Mesh(gemotery, material);
// cube.castShadow = true;
// cube.position.y = 1.5
// scene.add(cube);






