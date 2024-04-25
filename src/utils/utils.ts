import * as THREE from "three";
import {BoxGeometry, Mesh} from "three";

const BOX_WIDTH = 1;
const BOX_HEIGHT = 1;
const BOX_DEPTH = 1;

const BIG_BOX_WIDTH = 6;
const BIG_BOX_HEIGHT = 6;
const BIG_BOX_DEPTH = 6;

export function createFirstBox(){
    const boxGeometry = new THREE.BoxGeometry(BOX_WIDTH,BOX_HEIGHT,BOX_DEPTH);
    const boxBasicMaterial = new THREE.MeshBasicMaterial({
        color: 0xC710E8
    });

    const box = new THREE.Mesh(boxGeometry, boxBasicMaterial);
    return { box, boxGeometry }
}

export function createSecondBigBox(){
    const bigBoxGeometry = new BoxGeometry(BIG_BOX_WIDTH, BIG_BOX_HEIGHT, BIG_BOX_DEPTH);
    const bigBoxMaterial =  new THREE.MeshBasicMaterial({
        color: 0x10E8DB,
        wireframe: true
    });
    const bigBox = new THREE.Mesh(bigBoxGeometry, bigBoxMaterial);
    return { bigBoxGeometry, bigBox}
}

export function createSceneAndAddBoxToIt(box: Mesh){
    const scene = new THREE.Scene();
    scene.add(box);
    return scene;
}

export function createPerspectiveCamera(){
    return new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
}
