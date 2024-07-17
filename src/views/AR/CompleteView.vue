<script setup>
import {
  InformationCircleIcon,
  LockClosedIcon,
  StarIcon,
} from "@heroicons/vue/24/solid";

const emit = defineEmits(["complete"]);
</script>
<template>
  <div class="fixed left-0 top-0 h-full w-full">
    <div
      class="relative flex h-full w-full flex-col items-center justify-center bg-white px-10 text-slate-900"
    >
      <StarIcon class="mb-4 aspect-square w-40 text-yellow-500" />
      <p class="text-center text-lg">
        Selamat! <br />
        Kamu telah menamatkan
      </p>
      <h1 class="text-center text-3xl font-bold">AR Tour FT UGM</h1>

      <div class="absolute bottom-10 left-1/2 w-max -translate-x-1/2">
        <button
          @click="emit('complete')"
          class="rounded-full bg-blue-700 px-6 py-2 text-sm font-medium text-white hover:bg-white hover:text-blue-700"
        >
          Kembali ke Halaman Utama
        </button>
      </div>
    </div>
  </div>
</template>
