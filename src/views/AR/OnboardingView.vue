<script setup>
const emit = defineEmits(["continueLastSaved, toggleHowToUse"]);
const props = defineProps({
  lastSavedStep: {
    type: Number,
    required: false,
  },
});
</script>

<template>
  <div
    class="flex flex-col gap-4 rounded-t-xl bg-white px-6 py-4 pb-6 text-slate-900"
  >
    <label class="text-sm">Selamat Datang di,</label>
    <h1 class="border-l-8 border-yellow-300 pl-4 text-4xl font-bold">
      AR Tour <br />
      Fakultas Teknik <br />
      UGM
    </h1>
    <p class="text-sm leading-7">
      Ayo menuju Tugu Teknik untuk memulai tour. Ikuti arahan yang ada pada
      perangkatmu dan lihatlah hal-hal menarik sepanjang tour.
    </p>
    <div class="flex flex-col gap-4 pt-2">
      <button
        v-if="lastSavedStep"
        @click="emit('continueLastSaved')"
        class="cursor-pointer rounded-full bg-white px-4 text-xs font-semibold text-blue-700"
      >
        Lanjutkan Sesi Sebelumnya
      </button>
      <button
        class="cursor-pointer text-center text-xs text-neutral-500 underline"
        @click="emit('toggleHowToUse')"
      >
        Cara Penggunaan?
      </button>
    </div>
  </div>
</template>
