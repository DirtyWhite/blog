import { Scene, PerspectiveCamera, WebGLRenderer, DirectionalLight, PointLight, AmbientLight } from 'three/src/Three'
import control from "three-orbitcontrols";
import { FLOOR_SIZE, SPEED, FPS } from '@/baseConfig';
import Ground from './ground'
import { interval } from 'rxjs';
import { animationFrame } from 'rxjs/internal/scheduler/animationFrame';
import { share, tap } from 'rxjs/operators';
import Worm from './worm';
require('./home.scss')

export class Home {

    constructor() {

    }

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
        FLOOR_SIZE * 2
    );
    readonly mainLight = new PointLight(0xffffff, 10, FLOOR_SIZE);

    worm: Worm
    ground: Ground


    public readonly fps$ = interval(1000 / FPS, animationFrame).pipe(
        share()
    )

    public main() {
        this.init();
        this.render();
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
        mainCamera.position.set(0, FLOOR_SIZE * 2, 0);
        mainCamera.lookAt(0, 0, 0);
        scene.add(mainCamera)
    }

    private initMainLight() {
        const { mainLight, scene } = this;
        mainLight.position.set(0, FLOOR_SIZE / 2, 0);
        mainLight.castShadow = true;
        scene.add(mainLight);
        var light = new AmbientLight(0x404040); // soft white light
        scene.add(light);
    }

    private initControl() {
        const { mainCamera } = this;
        new control(mainCamera, this.renderer.domElement)
    }

    private render() {
        const { scene, renderer, mainCamera } = this;
        this.ground = new Ground();
        this.worm = new Worm();
        this.fps$.pipe(
            tap(e => {
                renderer.render(scene, mainCamera)
            })
        ).subscribe();
    }
}

export default new Home();







