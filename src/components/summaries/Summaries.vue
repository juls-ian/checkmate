<template>
  <div>
    <p class="uppercase my-5 font-bold">{{ description }}</p>
    <ul>
      <Summary v-for="task in tasks" :key="task.id" :task="task" />
    </ul>
  </div>
</template>

<script setup>
  import Summary from "./Summary.vue";
  defineProps({
    description: String,
    tasks: Array,
  });
</script>
