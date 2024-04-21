import '../style.css';
import * as THREE from 'three';
import {Mesh} from "three";

const BOX_WIDTH = 5;
const BOX_HEIGHT = 5;
const BOX_DEPTH = 5;

function setup(){
    const box = createFirstBox();
    const scene = createSceneAndAddBoxToIt(box);
    const perspectiveCamera = createPerspectiveCamera();
    perspectiveCamera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#webgl')!});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, perspectiveCamera);
}

function createFirstBox(){
    const boxGeometry = new THREE.BoxGeometry(BOX_WIDTH,BOX_HEIGHT,BOX_DEPTH);
    const boxBasicMaterial = new THREE.MeshBasicMaterial({
        color: 0xC710E8
    });

    return new THREE.Mesh(boxGeometry, boxBasicMaterial);
}

function createSceneAndAddBoxToIt(box: Mesh){
    const scene = new THREE.Scene();
    scene.add(box);
    return scene;
}

function createPerspectiveCamera(){
    return new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
}

setup();
