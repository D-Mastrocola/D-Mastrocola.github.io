//https://coolors.co/9a1d1f-0c080c-635d5c-e0e1dd-a59132

import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js";
import { GLTFLoader } from "https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/GLTFLoader.js";
//import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js";


import landingAnimation from './animations/landingAnimation.js';
import loadPortfolioAnimation from './animations/loadPortfolioAnimation.js'

const canvas = document.querySelector("#canvas");
const renderer = new THREE.WebGLRenderer({ canvas });

let modelRotation = {
  x: 0.0003,
  y: 0.0002,
  z: 0.0002,
  isRotating: true
};
const fov = 75;
const aspect = 2;
const near = 0.1;
const far = 1000;

const scene = new THREE.Scene();
scene.background =new THREE.Color(0x0C080C);
var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z += .75;
camera.position.y -= .1;

//Create a PointLight and turn on shadows for the light
const light = new THREE.PointLight(0xffffff, 1, 1000);
light.position.set(0, 2, 2);
const light2 = new THREE.PointLight(0xffffff, 0.4, 100);
light2.position.set(-20, 10, -40);
scene.add(light);
scene.add(light2);

let model;

const loader = new GLTFLoader();

loader.load(
  "./src/3D Models/Logo.glb",
  function (gltf) {
    model = gltf.scene;
    //console.log(model)
    scene.add(model);
    model.rotation.x += Math.PI / 2;
  },
  undefined,
  function (error) {
    console.log("Error Loading Model");
    console.error(error);
  }
);

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
    if(width < 500) {
      camera.position.z = 1.75;
    }else if(width < 800) {
      camera.position.z = 1.5;
    } else if (width < 1000) {
      camera.position.z = 1;
    } else {
      camera.position.z = .75;
    }
  }
  return needResize;
}

function render() {
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  renderer.render(scene, camera);
  if (model && modelRotation.isRotating) {
    model.rotation.x += modelRotation.x;
    model.rotation.y += modelRotation.y;
    model.rotation.z += modelRotation.z;
    if (model.rotation.x > Math.PI / 2 + .15 || model.rotation.x < Math.PI / 2 - .15) modelRotation.x *= -1;
    if (model.rotation.y > .15 || model.rotation.y < -.15) modelRotation.y *= -1;
    if (model.rotation.z > .15 || model.rotation.z < -.15) modelRotation.z *= -1;
  }
  requestAnimationFrame(render);
}
document.getElementById("load-portfolio").addEventListener("click", function() {
  loadPortfolioAnimation(scene, camera);
  modelRotation.isRotating = false;
});
landingAnimation();

requestAnimationFrame(render);
