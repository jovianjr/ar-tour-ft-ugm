<script setup>
import { ref, onMounted } from "vue";
import { DeviceOrientationControls } from "../helpers/DeviceOrientaion";

const dataGeometry = [
  [110.4739881, -7.7479808],
  [110.4739907, -7.7480844],
  [110.4739693, -7.7482094],
  [110.4738137, -7.748204],
  [110.4737279, -7.7481854],
  [110.4736796, -7.7481722],
  [110.4736152, -7.7481642],
  [110.4735696, -7.7481562],
  [110.4735026, -7.7481403],
  [110.4734597, -7.7481376],
  [110.4734194, -7.7481296],
  [110.4733604, -7.748119],
  [110.4733416, -7.7480685],
  [110.4733443, -7.74801],
  [110.4733604, -7.7479542],
  [110.4733658, -7.747917],
  [110.4733604, -7.7478479],
  [110.4733631, -7.7478134],
  [110.4733738, -7.7477522],
  [110.4733631, -7.7477097],
  [110.4733685, -7.7476831],
  [110.4733631, -7.7476486],
  [110.4733202, -7.7476459],
  [110.4732451, -7.7476486],
  [110.4731727, -7.7476353],
  [110.4731324, -7.7476353],
  [110.4730788, -7.7476353],
  [110.4730037, -7.74763],
  [110.4729527, -7.74763],
  [110.4729098, -7.7476193],
  [110.4728562, -7.7476167],
  [110.4727784, -7.7476114],
  [110.4727435, -7.747614],
  [110.4726765, -7.7476114],
  [110.4726094, -7.7476087],
  [110.4725397, -7.7476061],
  [110.4724967, -7.7475954],
  [110.4724431, -7.7475954],
  [110.4723895, -7.7475954],
  [110.472368, -7.7475795],
  [110.472376, -7.7475476],
  [110.4723868, -7.747513],
  [110.4723841, -7.7474971],
  [110.4723841, -7.7474758],
  [110.4723895, -7.7474466],
  [110.4723895, -7.7474067],
  [110.4723895, -7.7473748],
  [110.4723975, -7.7473297],
  [110.4723948, -7.7472632],
  [110.4723975, -7.7472021],
  [110.4724002, -7.7471516],
  [110.4724002, -7.747117],
  [110.4724056, -7.7470692],
  [110.4724082, -7.747024],
  [110.4724109, -7.7469788],
  [110.4724136, -7.7469257],
  [110.4724109, -7.7468885],
  [110.472419, -7.7468513],
];

function main() {
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#canvas1"),
  });

  const geom = new THREE.BoxGeometry(20, 20, 20);
  const camera = new THREE.PerspectiveCamera(80, 2, 0.1, 50000);
  const arjs = new THREEx.LocationBased(scene, camera);
  arjs.setElevation(16);

  // You can change the minimum GPS accuracy needed to register a position - by default 1000m
  //const arjs = new THREEx.LocationBased(scene, camera. { gpsMinAccuracy: 30 } );
  // const cam = new THREEx.WebcamRenderer(renderer, "#video1");
  const cam = new THREEx.WebcamRenderer(renderer);

  const mouseStep = THREE.MathUtils.degToRad(5);

  let orientationControls;

  // Orientation controls only work on mobile device
  if (isMobile()) {
    orientationControls = new DeviceOrientationControls(camera);
  }

  let fake = null;
  let first = true;

  arjs.on("gpsupdate", (pos) => {
    if (first) {
      setupObjects(pos.coords.longitude, pos.coords.latitude);
      first = false;
    }
  });

  arjs.on("gpserror", (code) => {
    alert(`GPS error: code ${code}`);
  });

  // Uncomment to use a fake GPS location
  //fake = { lat: 51.05, lon : -0.72 };
  if (fake) {
    arjs.fakeGps(fake.lon, fake.lat);
  } else {
    arjs.startGps();
  }

  let mousedown = false,
    lastX = 0;

  // Mouse events for testing on desktop machine
  if (!isMobile()) {
    window.addEventListener("mousedown", (e) => {
      mousedown = true;
    });

    window.addEventListener("mouseup", (e) => {
      mousedown = false;
    });

    window.addEventListener("mousemove", (e) => {
      if (!mousedown) return;
      if (e.clientX < lastX) {
        camera.rotation.y += mouseStep;
        if (camera.rotation.y < 0) {
          camera.rotation.y += 2 * Math.PI;
        }
      } else if (e.clientX > lastX) {
        camera.rotation.y -= mouseStep;
        if (camera.rotation.y > 2 * Math.PI) {
          camera.rotation.y -= 2 * Math.PI;
        }
      }
      lastX = e.clientX;
    });
  }

  function isMobile() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      )
    ) {
      // true for mobile device
      return true;
    }
    return false;
  }

  function render(time) {
    resizeUpdate();
    if (orientationControls) orientationControls.update();
    cam.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  function resizeUpdate() {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth,
      height = canvas.clientHeight;
    if (width != canvas.width || height != canvas.height) {
      renderer.setSize(width, height, false);
    }
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  function setupObjects(longitude, latitude) {
    // Use position of first GPS update (fake or real)
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const material2 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const material3 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const material4 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    arjs.add(new THREE.Mesh(geom, material), longitude, latitude + 0.001); // slightly north
    arjs.add(new THREE.Mesh(geom, material2), longitude, latitude - 0.001); // slightly south
    arjs.add(new THREE.Mesh(geom, material3), longitude - 0.001, latitude); // slightly west
    arjs.add(new THREE.Mesh(geom, material4), longitude + 0.001, latitude); // slightly east

    const markPoint = new THREE.BoxGeometry(2, 2, 2);
    dataGeometry.forEach((e) => {
      arjs.add(new THREE.Mesh(markPoint, material), e[0], e[1]);
    });
  }

  requestAnimationFrame(render);
}

onMounted(() => {
  main();
});
</script>

<template>
  <canvas
    id="canvas1"
    style="background-color: black; width: 100%; height: 100%"
  ></canvas>
</template>

<style>
canvas {
  @apply !h-[100svh] !w-[100svw] bg-red-500;
}
</style>
