<script setup>
import Mission from "@/components/Mission.vue";
import { InformationCircleIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="absolute bottom-0 w-full px-5 pb-4">
    <Mission
      :icon="InformationCircleIcon"
      :title="props.title"
      description="Ikuti petunjuk pada aplikasi"
    />
  </div>
</template>
