import * as THREE from 'three';
import '../style.css';
import {MeshBasicMaterial} from "three";


/**
 * Creamos una esfera básica
 */
const sphereGeometry = new THREE.SphereGeometry(1);
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x10D4E8
});
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphereMesh.position.set(0,0,5)

/**
 * Creamos el cubo sobre el que girará nuestra esfera. Lo llamaremos testaferro.
 */

const cubeGeometry = new THREE.BoxGeometry(2,2,2);
const cubeMaterial = new THREE.MeshBasicMaterial({
    color: 0x71EBAE
});
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh.position.x = 5;
cubeMesh.name = 'testaferro'


/**
 * Creamos la escena, la cámara y el render.
 */

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#webgl')!});
renderer.setSize(window.innerWidth, window.innerHeight);

const perspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
perspectiveCamera.position.z = 10;

/**
 * Añadimos el cubo "testaferro" a la escena
 */

scene.add(cubeMesh);


/**
 * Creamos un pivote sobre el que girará el objeto
 */

const pivotGeometry = new THREE.BoxGeometry(cubeGeometry.parameters.width, cubeGeometry.parameters.height, cubeGeometry.parameters.depth);
const pivotMaterial = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0,
})
const pivotMesh = new THREE.Mesh(pivotGeometry, pivotMaterial);

scene.add(pivotMesh);

pivotMesh.add(sphereMesh);


const raycast = new THREE.Raycaster();

/*
const points = [];
points.push(new THREE.Vector3(0,0,0));
points.push(new THREE.Vector3(0,0,10));
*/

// const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
// const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
// const line = new THREE.Line(lineGeometry, lineMaterial);

// scene.add(line);

pivotMesh.rotation.set(0,Math.PI / -2,0)

let testaferro: THREE.Object3D | undefined = undefined;

const tick = () => {
     pivotMesh.rotation.y += 0.01;

     // line.rotation.copy(pivotMesh.rotation);
    renderer.render(scene, perspectiveCamera);


    const worldDirection = new THREE.Vector3();
    pivotMesh.getWorldDirection(worldDirection);

    raycast.set(pivotMesh.position, worldDirection.normalize());

    const intersected = raycast.intersectObjects(scene.children);

  intersected.forEach(i => {

      if( (i.object as THREE.Mesh).name === 'testaferro'){
          testaferro = i.object;
          (testaferro as THREE.Mesh).material = new MeshBasicMaterial({
              color: 0xB271EB
          })
      } else {
          if(testaferro){
              (testaferro as THREE.Mesh).material = new MeshBasicMaterial({
                  color: 0x71EBAE
              })
          }
      }
    })
    requestAnimationFrame(tick);
}

tick();

