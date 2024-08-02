<script setup>
  import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
  import { ExclamationCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/vue/24/solid';

  const props = defineProps({
    status: { type: String, required: false },
    title: { type: String, required: true },
    isShow: { type: Boolean, required: true },
    cancelText: { type: String, required: false },
    okText: { type: String, required: false },
    className: { type: String, required: false }
  });

  const emit = defineEmits(['toggleShow', 'toggleOK']);
</script>

<template>
  <TransitionRoot appear :show="props.isShow" as="template">
    <Dialog as="div" @close="emit('toggleShow')" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md text-xs transform overflow-hidden rounded-2xl flex flex-col gap-4 bg-white p-6 text-left align-middle shadow-xl transition-all"
              :class="props.className"
            >
              <div class="h-10 aspect-square" v-if="props.status">
                <InformationCircleIcon v-if="props.status === 'info'" class="text-blue-500 h-[inherit] aspect-square" />
                <ExclamationTriangleIcon
                  v-if="props.status === 'warning'"
                  class="text-yellow-500 h-[inherit] aspect-square"
                />
                <ExclamationCircleIcon
                  v-if="props.status === 'danger'"
                  class="text-red-500 h-[inherit] aspect-square"
                />
              </div>
              <DialogTitle v-if="props.title" as="h3" class="flex text-slate-900 text-base font-semibold items-center">
                {{ props.title }}
              </DialogTitle>
              <slot></slot>
              <div class="flex gap-4 items-center justify-end">
                <button v-if="cancelText" class="py-2 px-3 text-xs font-semibold" @click="emit('toggleShow')">
                  {{ cancelText }}
                </button>
                <button
                  v-if="okText"
                  class="py-2 px-3 text-xs font-semibold bg-blue-700 text-white rounded-full"
                  @click="
                    emit('toggleOK');
                    emit('toggleShow');
                  "
                >
                  {{ okText }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
