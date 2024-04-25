import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

/**
 * Creamos una caja mediante la con geometría y material
 */

const boxGeometry = new THREE.BoxGeometry(3,3,3);
const boxMaterial = new THREE.MeshBasicMaterial({
    color: 0x10E88C
});
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

/**
 * Creamos una segunda caja
 */
const canvas = document.querySelector('#webgl');

const boxGeometry2 = new THREE.BoxGeometry(3,3,3);
const boxMaterial2 = new THREE.MeshBasicMaterial({
    color: 0xE8C710
});

const boxMesh2 = new THREE.Mesh(boxGeometry2, boxMaterial2);

/**
 * Creamos la cámara
 */

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 10;

/**
 * Creamos el renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas!
});

/**
 * Y los orbit controls. Los orbit controls necesitan
 * a) Una cámara
 * b) un elemento dom. Normalmente querremos darle el canvas
 */

const orbitControls = new OrbitControls(camera, canvas);

orbitControls.enableDamping = true; // permite darle un efecto rebote chulo


/**
 * Añadimos las cajas a la escena
 */
const scene = new THREE.Scene();

scene.add(boxMesh);
scene.add(boxMesh2);

/**
 * Subimos la segunda caja un poco hacia arriba
 */

boxMesh2.position.y = 5;

/**
 * Creamos un raycaster
 */

const raycaster = new THREE.Raycaster();

/**
 * Establecemos como punto de origen un Vec3 con las siguientes coordenadas
 * 1. La posición x de la caja, para que el origen sea el centro de la caja
 * 2. La altura, (height) para que el raycaster "nazca" desde la cara superior del cubo
 * 3. La posición z del cubo, lo mismo que con x.
 *
 * Y como punto de destino 1 hacia arriba. El punto de destino tiene que ser `normalize`
 */

raycaster.set(new THREE.Vector3(boxMesh.position.x, boxMesh.geometry.parameters.height, boxMesh.position.z), new THREE.Vector3(0,1,0).normalize());




function tick() {

    /**
     * Comprobamos continuamente si el raycast intersecciona con algún objeto
     */

    const intersections = raycaster.intersectObjects(scene.children, true);
    intersections.forEach( item => {
        (item.object as THREE.Mesh).material = new THREE.MeshBasicMaterial({
            color: 0xE81010 // si intersecciona, lo pintamos de rojo
        })
    })
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);

    camera.updateProjectionMatrix();
    orbitControls.update();

    requestAnimationFrame(tick);

}
tick();
