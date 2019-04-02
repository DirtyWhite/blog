import home from './home';
import { ImageUtils, RepeatWrapping, PlaneBufferGeometry, MeshPhysicalMaterial, MeshLambertMaterial, DoubleSide, Mesh, PointLight, PointLightHelper, RGBA_ASTC_10x10_Format, PlaneGeometry, MeshBasicMaterial } from 'three/src/Three';
import { FLOOR_SIZE } from '@/baseConfig';

export default class Ground {


    constructor() {
        this.init();
        this.drawWall();
    }

    init() {
        const { scene } = home;
        const floorPicSrc = require('../../images/floor.png') as string
        const floorTexture = ImageUtils.loadTexture(floorPicSrc)
        floorTexture.wrapS = RepeatWrapping
        floorTexture.wrapT = RepeatWrapping
        floorTexture.repeat.set(10, 10);
        const plane = new PlaneGeometry(FLOOR_SIZE, FLOOR_SIZE);
        const planeMaterial = new MeshLambertMaterial({ side: DoubleSide, map: floorTexture });
        const ground = new Mesh(plane, planeMaterial)
        ground.rotation.x = Math.PI / 2
        ground.receiveShadow = true;
        scene.add(ground);
    }
    drawWall() {
        const { scene } = home;
        const brickSrc = require('../../images/floor.png') as string;
        const brickTexture = ImageUtils.loadTexture(brickSrc)
        brickTexture.wrapS = RepeatWrapping
        brickTexture.wrapT = RepeatWrapping
        brickTexture.repeat.set(10, 10);
        const wallMaterial = new MeshPhysicalMaterial({ side: DoubleSide, map: brickTexture });
        const walls = [
            [FLOOR_SIZE / 2, FLOOR_SIZE / 4, 0, Math.PI / 2],
            [-FLOOR_SIZE / 2, FLOOR_SIZE / 4, 0, Math.PI / 2],
            [0, FLOOR_SIZE / 4, FLOOR_SIZE / 2, Math.PI],
            [0, FLOOR_SIZE / 4, -FLOOR_SIZE / 2, Math.PI],
        ]
        walls.map(([x, y, z, deg]) => {
            const plane = new PlaneGeometry(FLOOR_SIZE, FLOOR_SIZE / 2);
            const wall = new Mesh(plane, wallMaterial);
            wall.position.set(x, y, z)
            wall.rotation.set(0, deg, 0);
            scene.add(wall)
        })
    }
}