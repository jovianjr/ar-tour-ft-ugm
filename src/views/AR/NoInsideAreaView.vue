<script setup>
import { InformationCircleIcon, LockClosedIcon } from "@heroicons/vue/24/solid";
</script>
<template>
  <div
    class="flex h-full w-full flex-col items-center justify-center gap-4 px-10 py-4 text-center text-white"
  >
    <LockClosedIcon class="aspect-square w-28 text-red-500" />
    <div class="flex flex-col gap-2">
      <h1 class="text-lg font-bold">Aplikasi Tidak Dapat Digunakan</h1>
      <p class="text-sm">
        Mohon Maaf, Aplikasi ini hanya dapat digunakan pada lingkungan Fakultas
        Teknik Universitas Gadjah Mada.
      </p>
    </div>
  </div>
</template>
