<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import Swal from "sweetalert2";
// Local Components
import AudioPlayer from "@/components/AudioPlayer.vue";
import ARImageTracking from "@/components/Model.vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const { data } = defineProps({
  data: { type: Object, required: true },
});

const emit = defineEmits(["next"]);

const finish = () => {
  Swal.fire({
    title: "Apakah anda yakin?",
    text: "Anda tidak dapat kembali ke tempat ini lagi",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#1d4ed8",
    cancelButtonColor: "#dc2626",
    confirmButtonText: "Ya, lanjut ke tempat selanjutnya",
  }).then((result) => {
    if (result.isConfirmed) {
      emit("next");
    }
  });
};
</script>

<template>
  <swiper
    :modules="[Navigation, Pagination]"
    class="flex h-full flex-col gap-2 bg-white"
    :pagination="{ clickable: true }"
    :slides-per-view="1"
    :space-between="0"
  >
    <swiper-slide>
      <div class="flex w-full flex-grow flex-col">
        <div class="flex flex-grow items-center justify-center">
          <ARImageTracking v-if="data.model" />
          <img
            v-if="data.image"
            :src="data.image"
            class="aspect-video h-full rounded-md bg-slate-900 object-contain"
          />
        </div>
        <div class="flex flex-col items-center py-2">
          <h1 class="text-sm font-semibold">
            {{ data.name }}
          </h1>
          <p class="flex-grow text-xs">{{ data.label }}</p>
        </div>
      </div>

      <div class="">
        <AudioPlayer
          :key="data.name"
          :src="`/data/${data.audioTranscript}.mp3`"
        />
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="flex flex-col py-2">
        <h1 class="text-lg font-semibold">
          {{ data.name }}
        </h1>
        <p
          class="h-[25svh] overflow-y-auto pr-1.5 text-justify text-xs leading-7"
          v-html="data.description"
        ></p>
      </div>
      <div class="flex-grow"></div>
      <button
        @click="finish"
        class="w-fit self-center rounded-full bg-blue-700 px-6 py-2 text-xs font-semibold text-white hover:bg-blue-600"
      >
        Lanjut ke Tempat Selanjutnya
      </button>
    </swiper-slide>
  </swiper>
</template>

<style>
.swiper-wrapper {
  @apply z-[11];
}
.swiper-pagination {
  @apply !top-2 z-[10];
}
.swiper-slide {
  @apply flex h-full w-full flex-col px-3 pb-6 pt-10;
}
</style>
