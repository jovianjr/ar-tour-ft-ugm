<script setup>
  import { onMounted } from 'vue';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

  const props = defineProps({
    src: {
      type: String,
      required: true
    }
  });

  function main() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(80, 1, 0.1, 50000);

    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#model')
      // alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setAnimationLoop(animate);
    renderer.setClearColor(0x000, 0);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;

    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);
    const light = new THREE.AmbientLight(0xffffff, 1); // soft white light
    scene.add(light);
    // const hlp = new THREE.AxesHelper(1);
    // scene.add(hlp);
    // gltf
    const loader = new GLTFLoader();
    loader.load(
      props.src,
      (gltf) => {
        gltf.scene.position.set(0, 0, 0);
        scene.add(gltf.scene);
        renderer.render(scene, camera);
      },
      () => {},
      (err) => {
        console.error(err);
      }
    );
    camera.lookAt(scene.position);
    camera.position.z = 4;
    camera.position.y = 4;
    camera.position.x = 4;
    // cube.rotation.x = 0.5;
    controls.update();

    function animate() {
      // cube.rotation.y += 0.01;
      controls.update();
      renderer.render(scene, camera);
    }
  }

  onMounted(() => {
    main();
  });
</script>

<template>
  <canvas id="model" class="h-full aspect-square w-full rounded-lg !bg-slate-100"></canvas>
</template>

<style></style>
