import { Component } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

let renderer;

let scene;
let camera;
let cube;
let logoModel;

let loaded = false;

const loader = new GLTFLoader();

let resizeRendererToDisplaySize = () => {
  const canvas = renderer.domElement;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
};
let init = () => {
  if (loaded) {
    return true;
  }
  loaded = true;
  console.log();
  const fov = 75;
  const near = 0.1;
  const far = 1000;

  const canvas = document.querySelector("#canvas");
  renderer = new THREE.WebGLRenderer({ canvas });

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    fov,
    window.innerWidth / window.innerHeight,
    near,
    far
  );
  renderer.setSize(window.innerWidth, window.innerHeight, false);

  camera.position.z = 2;

  //Create a PointLight and turn on shadows for the light
  const light = new THREE.PointLight(0xffffff, 1, 1000);
  light.position.set(20, 10, 10);
  const light2 = new THREE.PointLight(0xffffff, 1, 1000);
  light2.position.set(20, -10, -10);
  const light3 = new THREE.PointLight(0xffffff, 1, 100);
  light3.position.set(0, 0, 20);

  scene.add(light);
  scene.add(light2);
  scene.add(light3);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshToonMaterial({ color: 0x00ff00 });
  cube = new THREE.Mesh(geometry, material);

  //scene.add(cube);
  loader.load(
    "./assets/models/Logo.gltf",
    function (gltf) {
      logoModel = gltf.scene;
      console.log(logoModel)
      scene.add(logoModel);

      logoModel.rotation.x = 1;
      animate();
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  
};
let animate = () => {
  if (resizeRendererToDisplaySize()) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    console.log("resize");
  }
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  logoModel.rotation.x += 0.001;
  logoModel.rotation.y += 0.001;

  renderer.render(scene, camera);
};

class ThreeCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }
  componentDidMount() {
    init();
  }
  render() {
    return <canvas id="canvas"></canvas>;
  }
}
export default ThreeCanvas;
