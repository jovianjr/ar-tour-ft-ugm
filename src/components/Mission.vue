<script setup>
  import { onMounted } from 'vue'
  import voice from './SpeechSynthesis.vue'

  const { title, description } = defineProps({
    icon: { required: true },
    title: { type: String, required: true },
    description: { type: String, required: false }
  })

  onMounted(() => {
    voice.speak(`${title}... ${description}`)
  })
</script>

<template>
  <div class="flex flex-col gap-1 rounded-xl bg-black/60 px-6 pb-8 pt-6 text-white backdrop-blur-sm">
    <div class="flex items-center gap-2">
      <span class="w-5 min-w-5">
        <component v-if="!!icon" :is="icon" class="aspect-square w-full" />
      </span>
      <h3 class="text-sm font-medium">{{ title }}</h3>
    </div>
    <div class="flex gap-2">
      <span class="w-5"></span>
      <desc class="text-xs font-light text-yellow-300">{{ description }}</desc>
    </div>
  </div>
</template>
