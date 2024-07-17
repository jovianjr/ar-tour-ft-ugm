<script setup>
import DepartmentCard from "@/components/DepartmentCard.vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["next"]);
</script>

<template>
  <div
    class="absolute bottom-0 left-1/2 h-[45svh] w-full -translate-x-1/2 overflow-hidden rounded-t-xl md:w-[512px]"
  >
    <DepartmentCard :data="props.data" @next="emit('next')" />
  </div>
</template>
