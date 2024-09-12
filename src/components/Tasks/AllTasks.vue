<template>
  <div
    class="card mt-4 bg-white border border-blue-400 rounded-lg shadow"
    v-if="tasks.length && show"
  >
    <ul class="list-none">
      <!--                        :Task.vue prop -->
      <Task
        v-for="task in tasks"
        :task="task"
        :key="task.id"
        @task-updated="$emit('taskUpdated', $event)"
        @task-completed="$emit('taskCompleted', $event)"
        @task-removed="$emit('taskRemoved', $event)"
      />
      <!-- AllTasks re-emits the caught updateTask to TaskPage -->
    </ul>
  </div>
</template>

<script setup>
  import Task from "./Task.vue";
  const props = defineProps({
    // all tasks
    tasks: Array,
    show: {
      type: Boolean,
      default: true,
    },
  });
</script>
