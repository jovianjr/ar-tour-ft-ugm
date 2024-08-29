<script setup>
  import { ref } from 'vue';
  import { RocketLaunchIcon } from '@heroicons/vue/24/solid';
  import HowToUseView from '@/views/AR/HowToUseView.vue';
  import Modal from '@/components/Modal.vue';
  import dataFT from '@/data/ft-ugm';

  const emit = defineEmits(['continueLastSaved', 'changeFirstPoint']);
  const props = defineProps({
    currentData: {
      type: Object,
      required: true
    },
    lastSavedStep: {
      type: Number,
      required: false
    }
  });
  const howToUseModal = ref(false);
  const firstPointModal = ref(false);
  const dataFTArray = Object.values(dataFT).reverse();
  const currentFirstPoint = ref(dataFTArray[0]);
  const currentFirstPointSaved = ref(dataFTArray[0]);
</script>

<template>
  <div class="absolute bottom-0 flex w-full flex flex-col gap-4 rounded-t-xl bg-white px-6 py-4 pb-6 text-slate-900">
    <label class="text-sm">Selamat Datang di,</label>
    <h1 class="border-l-8 border-yellow-300 pl-4 text-4xl font-bold">
      AR Tour <br />
      Fakultas Teknik <br />
      UGM
    </h1>
    <button
      v-if="lastSavedStep"
      @click="emit('continueLastSaved')"
      class="absolute flex items-center gap-2 top-5 right-5 cursor-pointer rounded-full bg-blue-700 px-4 text-xs font-semibold text-white py-1"
    >
      Lanjutkan
      <RocketLaunchIcon class="w-4 aspect-square" />
    </button>
    <p class="text-sm leading-7">
      Ayo menuju
      <a class="underline cursor-pointer font-medium" @click="firstPointModal = true">
        {{ currentData.title }}
      </a>
      untuk memulai tour. Ikuti arahan yang ada pada perangkatmu dan lihatlah hal-hal menarik sepanjang tour.
    </p>
    <button
      class="pt-2 cursor-pointer text-center text-xs text-neutral-500 underline"
      @click="howToUseModal = !howToUseModal"
    >
      Cara Penggunaan?
    </button>
  </div>
  <HowToUseView v-if="howToUseModal" @close="howToUseModal = !howToUseModal" />
  <Modal
    title="Pilih Titik Awal"
    :is-show="firstPointModal"
    cancel-text="Kembali"
    ok-text="Simpan"
    @toggleShow="firstPointModal = !firstPointModal"
    @toggleCancel="currentFirstPoint = currentFirstPointSaved"
    @toggleOK="
      emit('changeFirstPoint', currentFirstPoint);
      currentFirstPointSaved = currentFirstPoint;
    "
  >
    <div class="flex flex-col max-h-[70svh] overflow-y-auto">
      <div
        class="px-2 py-2 border-b"
        :class="item.name === currentFirstPoint.name ? 'bg-blue-300' : 'cursor-pointer hover:bg-blue-50'"
        v-for="item in dataFTArray"
        @click="currentFirstPoint = item"
      >
        {{ item.label }}
      </div>
    </div>
  </Modal>
</template>
