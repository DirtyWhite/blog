import home from './home';
import { ImageUtils, RepeatWrapping, PlaneBufferGeometry, MeshLambertMaterial, DoubleSide, Mesh } from 'three';
import { FLOOR_SIZE } from '@/baseConfig';

export default class Ground {


    constructor() {
        this.init();
    }

    init() {
        const { scene } = home;
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
}