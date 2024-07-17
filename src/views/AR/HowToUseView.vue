<script setup>
import { XMarkIcon } from "@heroicons/vue/24/solid";
import dataHowToUse from "@/data/how-to-use";

const emit = defineEmits(["close"]);
</script>

<template>
  <div class="fixed left-0 top-0 flex h-full w-full flex-col bg-white pt-8">
    <div class="flex justify-between pr-8">
      <h1
        class="mx-10 mb-4 w-fit border-b-4 border-yellow-300 pb-2 text-2xl font-bold"
      >
        CARA PENGGUNAAN
      </h1>
      <XMarkIcon class="aspect-square h-10" @click="emit('close')" />
    </div>
    <div
      class="flex flex-grow flex-col gap-6 overflow-y-auto pb-20 pl-10 pr-10 text-sm"
    >
      <div class="flex flex-col gap-2" v-for="o in dataHowToUse" :key="o.title">
        <h2 v-if="o.title" class="text-lg font-semibold">{{ o.title }}</h2>
        <img v-if="o.image" class="h-auto w-full bg-contain" :src="o.image" />
        <p v-if="o.description" class="text-justify">
          {{ o.description }}
        </p>
      </div>
    </div>
    <div class="leading-1 bg-black px-10 py-1 text-center text-[0.6rem]">
      <p class="w-full text-gray-300">
        Penggunaan lokasi, orientasi, dan kamera <br />
        diperlukan untuk menggunakan aplikasi ini.
      </p>
    </div>
  </div>
</template>
