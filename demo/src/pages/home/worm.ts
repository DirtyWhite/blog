import { Scene, PerspectiveCamera, WebGLRenderer, MeshDepthMaterial, BoxGeometry, Mesh, DirectionalLight, MeshLambertMaterial, MeshPhongMaterial, Vector3, ParametricGeometry, DoubleSide, FlatShading, PlaneGeometry, PlaneBufferGeometry, ImageUtils, RepeatWrapping, MirroredRepeatWrapping, MeshBasicMaterial, MeshStandardMaterial } from 'three/src/Three'
import home from './home'
import { FLOOR_SIZE, DIRECTIONS, FPS, SPEED } from '@/baseConfig';
import { fromEvent, interval } from 'rxjs';
import { map, tap, take, takeUntil, buffer, throttle, throttleTime, mergeMap } from 'rxjs/operators';

/**
 * 虫子类
 * 渲染
 * 运动
 * 控制
 * 碰撞
 */



export default class Worm {

    key$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(
        map(e => e.keyCode)
    )

    move$ = this.key$.pipe(
        take(1),
        mergeMap(e => {
            return home.fps$.pipe(
                throttleTime(500),
                map(val => SPEED),
                tap(e => this.instance.position.z -= e)
            )
        })
    ).subscribe();

    direction$ = this.key$.pipe(
        tap(console.log),
        map((keyCode) => DIRECTIONS[keyCode])
    )

    control$ = this.direction$.pipe(
        tap(e => this.turn(e))
    ).subscribe();

    constructor() {
        this.init();
    }
    instance: Mesh

    turn(direc: typeof DIRECTIONS[37]) {
        // this.instance.position.x += direc.x;
        // this.instance.position.z += direc.y;
    }
    init() {
        const { scene } = home
        const brickSrc = require('../../images/lava.png') as string;
        const brickTexture = ImageUtils.loadTexture(brickSrc)
        const gemotery = new BoxGeometry(10, 10, 10);
        const material = new MeshStandardMaterial({ map: brickTexture })
        const cube = new Mesh(gemotery, material);
        cube.castShadow = true;
        cube.position.set(0, 10 / 2, 0)
        this.instance = cube;
        scene.add(cube);
    }


}