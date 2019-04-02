import { PerspectiveCamera, ImageUtils, RepeatWrapping, Scene, PlaneBufferGeometry, MeshPhysicalMaterial, MeshLambertMaterial, DoubleSide, Mesh, PointLight, PointLightHelper, RGBA_ASTC_10x10_Format, PlaneGeometry, MeshBasicMaterial, BoxGeometry, WebGLRenderer, DirectionalLight, AmbientLight, Camera, Vector3 } from 'three/src/Three'
import control from "three-orbitcontrols";
import { FLOOR_SIZE, SPEED, FPS, cameraOffset } from '@/baseConfig';
import Ground from './ground'
import { interval } from 'rxjs';
import { animationFrame } from 'rxjs/internal/scheduler/animationFrame';
import { share, tap, take, delay } from 'rxjs/operators';
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
        // this.initControl();
    }

    private initRender() {
        const { rootStyle, renderer } = this;
        renderer.setClearColor(0xeeeeee);
        renderer.setSize(parseFloat(rootStyle.width), parseFloat(rootStyle.height))
        renderer.shadowMap.enabled = true;
    }

    private initCamera() {
        const { mainCamera, scene } = this;
        mainCamera.position.set(0, FLOOR_SIZE / 2, FLOOR_SIZE / 2);
        mainCamera.lookAt(0, 0, 0);
        scene.add(mainCamera)
    }

    private initMainLight() {
        const { mainLight, scene } = this;
        mainLight.position.set(0, FLOOR_SIZE / 2, 0);
        mainLight.castShadow = true;
        scene.add(mainLight);
        var light = new AmbientLight(0xffffff, .2);
        scene.add(light);
    }

    private cameraFollow(object: Mesh, camera: Camera) {
        this.fps$.pipe(
            tap(e => {
                let curPosition = object.position;
                const Offset = new Vector3(0, 50, 100);
                camera.lookAt(curPosition)
                let target = curPosition;
                let endPos = new Vector3(
                    curPosition.x + Offset.x,
                    curPosition.y + Offset.y,
                    curPosition.z + Offset.z
                )
                camera.position.lerp(endPos, .1);
            })
        ).subscribe()
    }
    cameraIn() {
        return this.fps$.pipe(
            take(3000 / 60),
            tap(e => {
                let { position } = this.worm.instance;
                this.mainCamera.position.lerp(
                    new Vector3(
                        position.x + cameraOffset[0],
                        position.y + cameraOffset[1],
                        position.z + cameraOffset[2],
                    ), .1);
                this.mainCamera.lookAt(position)
            })
        ).subscribe()
    }

    private initControl() {
        const { mainCamera } = this;
        new control(mainCamera, this.renderer.domElement)
    }

    private render() {


        const { scene, renderer, mainCamera } = this;
        this.ground = new Ground();
        this.worm = new Worm();
        this.cameraIn();
        // this.cameraFollow(this.worm.instance, this.mainCamera)
        this.fps$.pipe(
            tap(e => {
                renderer.render(scene, mainCamera)
            })
        ).subscribe();

    }
}

const homeInstance = new Home();

export default homeInstance;







