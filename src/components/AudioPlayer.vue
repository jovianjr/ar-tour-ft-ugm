<script setup>
import { ref, onMounted } from "vue";
import { PauseCircleIcon, PlayCircleIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  src: { type: String, required: true },
});

const audioRef = ref();
const audioProgress = ref(0);
const audioIsPaused = ref(true);

const audioTimeUpdate = () => {
  audioProgress.value = Math.round(
    (audioRef.value.currentTime / audioRef.value.duration) * 100,
  );
};

const audioEnded = () => {
  audioRef.value.currentTime = 0;
  audioIsPaused.value = true;
  audioRef.value.pause();
};

const toggleSound = () => {
  if (audioRef.value.paused) {
    audioIsPaused.value = false;
    audioRef.value.play();
    audioRef.value.addEventListener("timeupdate", audioTimeUpdate);
    audioRef.value.addEventListener("ended", audioEnded);
  } else {
    audioIsPaused.value = true;
    audioRef.value.pause();
    audioRef.value.removeEventListener("timeupdate", audioTimeUpdate);
    audioRef.value.removeEventListener("ended", audioEnded);
  }
};

const progressClick = (e) => {
  const percentage = e.offsetX / e.target.offsetWidth;
  audioProgress.value = percentage * 100;
  audioRef.value.currentTime = audioRef.value.duration * percentage;
};

onMounted(() => {
  toggleSound();
});
</script>

<template>
  <div class="flex flex-col items-center gap-3">
    <div
      class="relative h-2 w-full rounded-full bg-slate-300"
      @click="progressClick"
    >
      <div
        class="h-full rounded-full bg-slate-900"
        :style="`width: ${audioProgress}%`"
      ></div>
    </div>
    <button
      class="flex items-center justify-center gap-2 text-sm font-semibold"
      @click="toggleSound"
    >
      <audio ref="audioRef">
        <source :src="props.src" type="audio/mp3" />
      </audio>
      <template v-if="audioIsPaused">
        <PlayCircleIcon class="h-5 w-5" />
        <span>Putar Suara</span>
      </template>
      <template v-else>
        <PauseCircleIcon class="h-5 w-5" />
        <span>Berhenti</span>
      </template>
    </button>
  </div>
</template>
