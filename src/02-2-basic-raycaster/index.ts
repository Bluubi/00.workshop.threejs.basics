import '../style.css';

import * as THREE from 'three';
import gsap from 'gsap';

const cubeGeometry = new THREE.BoxGeometry(2,2,2);
const cubeMaterial = new THREE.MeshBasicMaterial({
    color: 0x8E44AD,
});

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

const cubeGeometry2 = new THREE.BoxGeometry(2,2,2);
const cubeMaterial2 = new THREE.MeshBasicMaterial({
    color: 0xEDF494,
});

const cubeMesh2 = new THREE.Mesh(cubeGeometry2, cubeMaterial2);

cubeMesh2.position.x = 4;
cubeMesh2.name = 'froggie'

const pivot = new THREE.Mesh(new THREE.BoxGeometry(2,2,2), new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0
}));


pivot.position.y = cubeMesh2.position.y -= 1;


const scene = new THREE.Scene();
scene.add(pivot);
scene.add(cubeMesh);
pivot.add(cubeMesh2);

const perspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
perspectiveCamera.position.z = 10;

const raycaster = new THREE.Raycaster(cubeMesh.position, new THREE.Vector3(10,0,0));

cubeMesh.rotation.y = (Math.PI / -2)
const tick = () => {

    pivot.rotation.z += (Math.cos(0.2)) / 50;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#webgl')!
    })

    const objectsInScene = raycaster.intersectObjects(scene.children);
    objectsInScene.forEach(_ => {

        gsap.to(cubeMesh.position, {
            y: (cubeMesh.position.y + 3),
            yoyo: true,
            duration: 0.8,
            repeat: 1
        });

    });


    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, perspectiveCamera);
    requestAnimationFrame(tick);
}

tick();
