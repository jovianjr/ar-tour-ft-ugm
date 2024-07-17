<script setup>
import { onMounted, watch } from "vue";
import { DeviceOrientationControls } from "../helpers/DeviceOrientaion";

const props = defineProps({
  coordinates: {
    default: {},
    type: Object,
    required: false,
  },
});

onMounted(async () => {
  await import("aframe");
  const THREEx = await import(
    "@ar-js-org/ar.js/three.js/build/ar-threex-location-only"
  );

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(80, 2, 0.1, 50000);
  const arjs = new THREEx.LocationBased(scene, camera);

  const main = () => {
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#canvas1"),
    });

    const geom = new THREE.BoxGeometry(20, 20, 20);
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
      // // Use position of first GPS update (fake or real)
      // const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      // const material2 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
      // const material3 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
      // const material4 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      // arjs.add(new THREE.Mesh(geom, material), longitude, latitude + 0.001); // slightly north
      // arjs.add(new THREE.Mesh(geom, material2), longitude, latitude - 0.001); // slightly south
      // arjs.add(new THREE.Mesh(geom, material3), longitude - 0.001, latitude); // slightly west
      // arjs.add(new THREE.Mesh(geom, material4), longitude + 0.001, latitude); // slightly east
    }
    requestAnimationFrame(render);
  };

  main();

  watch(
    () => props.coordinates,
    async (newVal, oldVal) => {
      // remove all previous object
      while (scene.children.length) {
        scene.remove(scene.children[0]);
      }

      if (!newVal.path || !newVal.target) return;

      // add path marker
      const markPoint = new THREE.BoxGeometry(2, 2, 2);
      const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      newVal.path.forEach((e) => {
        arjs.add(new THREE.Mesh(markPoint, material), e[0], e[1]);
      });

      // add target marker
      const targetMarkPoint = new THREE.BoxGeometry(5, 5, 5);
      const targetMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
      arjs.add(
        new THREE.Mesh(targetMarkPoint, targetMaterial),
        newVal.target[0],
        newVal.target[1],
      );
    },
    { immediate: true },
  );
});

watch(
  () => props.target,
  (newVal, oldVal) => {},
  { immediate: true },
);
</script>

<template>
  <canvas
    id="canvas1"
    class="!h-[100svh] !w-[100svw]"
    style="background-color: black; width: 100%; height: 100%"
  ></canvas>
</template>

<style></style>
