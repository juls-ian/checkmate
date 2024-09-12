<template>
  <div class="flex w-max justify-start items-start">
    <div class="flex items-center px-3">
      <BoltIcon />
    </div>
    <li class="w-max">{{ props.task.created_at }} | {{ props.task.name }}</li>
  </div>
</template>

<script setup>
  import BoltIcon from "../icons/BoltIcon.vue";

  const props = defineProps({
    task: Object,
  });
</script>
