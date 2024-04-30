import '../style.css';
import * as THREE from 'three';

const BOX_WIDTH = 3;
const BOX_HEIGHT = 3;
const BOX_DEPTH = 3;

/**
 * Primero creamos el cubo
 */

const cubeGeometry = new THREE.BoxGeometry(BOX_WIDTH,BOX_HEIGHT,BOX_DEPTH);
const cubeMaterial = new THREE.MeshBasicMaterial({
    color: 0x71D1EB
});
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

const scene = new THREE.Scene();
scene.add(cubeMesh);

const perspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
perspectiveCamera.position.z = 10;

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#webgl')!
});


function tick() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, perspectiveCamera);

    requestAnimationFrame(tick)
}

tick();

