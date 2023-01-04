import './style.css';
import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();

// perspective camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// renderer

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'), 
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

// Create an object in 3 steps

// 1. geometry - {x,y,z} that makeup a shape
const geometry = new THREE.TorusGeometry(10, 3, 16, 100)

// 2. material- wrapping paper for an object (WebGL for custom shaders)
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});

// 3. MESH - geometry + material
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff})
    const star = new THREE.Mesh( geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x,y,z);
    scene.add(star)
}
Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3drNjIyMDM4MjgtaW1hZ2Uta3A2Ym1jYmIuanBn.jpg');
scene.background = spaceTexture;

// Texture mapping - Avator
const ishratTexture = new THREE.TextureLoader().load('https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=600');
const ishrat = new THREE.Mesh(
    new THREE.BoxGeometry(3,3,3),
    new THREE.MeshBasicMaterial({map: ishratTexture})
);

scene.add(ishrat);

// Moon
const moonTexture = new THREE.TextureLoader().load('https://images.immediate.co.uk/production/volatile/sites/25/2019/02/TYCHO-27e2a02-e1603190530561.jpg');
const normalTexture = new THREE.TextureLoader().load('https://thumbs.dreamstime.com/b/normal-map-ground-stone-texture-mapping-245660873.jpg');

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
        map: moonTexture, 
        normalMap: normalTexture
    })
);
scene.add(moon);

moon.position;
moon.position.setX(-10);


function moveCamera() {

    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    ishrat.rotation.y += 0.01;
    ishrat.rotation.z += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.01;

}
document.body.onscroll = moveCamera

// animation loop
function animate() {
    requestAnimationFrame(animate)

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    controls.update();
    renderer.render( scene, camera);
}

animate();
