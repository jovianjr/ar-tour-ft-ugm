<script setup>
  import { SignalSlashIcon } from '@heroicons/vue/24/solid';
</script>
<template>
  <div
    class="flex h-svh w-full flex-col items-center justify-center gap-4 bg-slate-900 px-10 py-4 text-center text-white"
  >
    <SignalSlashIcon class="aspect-square w-28 text-red-500" />
    <div class="flex flex-col gap-2">
      <h1 class="text-lg font-bold">Izin lokasi tidak didapat</h1>
      <p class="text-sm">
        Mohon Maaf, Aplikasi ini membutuhkan perizinan lokasi perangkat anda. Periksa kembali pengaturan lokasi anda dan
        coba lagi.
      </p>
    </div>
  </div>
</template>
