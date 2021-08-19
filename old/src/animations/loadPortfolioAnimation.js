import anime from "../anime.es.js";
import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js";

function loadPortfolioAnimation(scene, camera) {
  anime
    .timeline({ loop: false })
    .add({
      targets: "#cover-div",
      height: "100%",
      easing: "linear",
      zIndex: 10,
      duration: 0,
    })
    .add({
      targets: "#cover-div",
      width: "100%",
      easing: "easeOutExpo",
      duration: 1000,
    })
    .add({
      targets: "#loading-bar",
      width: "60%",
      height: "80px",
      padding: "10px",
      duration: 1,
    })
    .add({
      targets: "#loading-bar",
      opacity: 1,
      easing: "linear",
      duration: 800,
    })
    .add({
      targets: "#load-progress",
      width: "100%",
      easing: "easeInExpo",
      duration: 3000,
    })
    .add({
      targets: "#loading-bar",
      opacity: 0,
      easing: "linear",
      duration: 1500,
      update: function (anim) {
        if (anim.progress >= 100) {
          //scene.background = new THREE.Color(0xE0E1DD);
          camera.rotation.y = Math.PI;
          camera.position.z = 0.9;
          camera.position.x = 1;
        }
      },
    })
    .add({
      targets: [
        "#intro-div",
        "#title-text",
        "#subtitle-text",
        "#load-portfolio",
      ],
      opacity: 0,
      width: 0,
      height: 0,
      padding: 0,
      duration: 1,
    })
    .add({
      targets: "#cover-div",
      opacity: 0,
      easing: "linear",
      duration: 2000,
    });
  /*
    update: function(anim) {
        progressLogEl.value = 'progress : '+Math.round(anim.progress)+'%';
        updateLogEl.value = 'updates : '+updates;
      }
      */
}
export default loadPortfolioAnimation;
