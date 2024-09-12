<script setup>
  import CheckIcon from "@/components/icons/CheckIcon.vue";

  const props = defineProps({
    text: {
      type: String,
      required: true,
    },
    selected: {
      type: Boolean,
      default: false,
    },
  });
</script>

<template>
  <span
    class="flex justify-between items-center"
    :class="{ 'text-blue-700 text-sm font-semibold': selected }"
  >
    {{ text }}
    <CheckIcon v-show="selected" class="relative" />
  </span>
</template>
