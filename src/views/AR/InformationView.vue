<script setup>
  import DepartmentCard from '@/components/DepartmentCard.vue';
  import { ChevronUpIcon } from '@heroicons/vue/24/solid';
  import { ref } from 'vue';

  const props = defineProps({
    data: {
      type: Object,
      required: true
    }
  });

  const isHide = ref(false);
  const emit = defineEmits(['next']);
</script>

<template>
  <div class="absolute top-0 left-0 w-full h-full">
    <div class="relative w-full h-full flex flex-col">
      <div class="flex-grow" @click="isHide = true"></div>
      <div class="h-auto overflow-y-auto w-full rounded-t-xl md:w-[512px]" v-if="!isHide">
        <DepartmentCard :data="props.data" @next="emit('next')" />
      </div>
      <div
        class="bg-white w-full py-3 rounded-t-xl flex items-center justify-center text-sm gap-2 text-slate-900"
        v-else
        @click="isHide = false"
      >
        Lihat Panel
        <ChevronUpIcon class="w-5 h-5 text-black" />
      </div>
    </div>
  </div>
</template>
