<template>
  <main class="min-h-[50vh] mt-8">
    <div class="container mx-auto">
      <div class="flex justify-center">
        <div class="space-y-5">
          <!-- Add new Task -->
          <AddNewTask @add-task="handleAddTask" />

          <!-- List of uncompleted       | updatedTask received from Task.vue, triggers handleUpdatedTask    -->
          <AllTasks
            :tasks="uncompletedTasks"
            @task-updated="handleUpdatedTask"
            @task-completed="handleCompletedTask"
            @task-removed="handleRemovedTask"
          />

          <!-- show toggle button -->
          <div class="text-center my-3" v-show="showToggleCompleteBtn">
            <button
              type="button"
              class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              @click="showCompletedTasks = !showCompletedTasks"
            >
              <span v-if="!showCompletedTasks">Show completed </span>
              <span v-else>Hide completed</span>
            </button>
          </div>

          <!-- List of completed tasks -->
          <AllTasks
            :tasks="completedTasks"
            :show="completedTasksVisible && showCompletedTasks"
            @task-updated="handleUpdatedTask"
            @task-completed="handleCompletedTask"
            @task-removed="handleRemovedTask"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
  import { computed, onMounted, ref } from "vue";
  import AllTasks from "@/components/Tasks/AllTasks.vue";
  import AddNewTask from "@/components/Tasks/AddNewTask.vue";
  import { useTaskStore } from "@/stores/task";
  import { storeToRefs } from "pinia";

  // STORE
  const store = useTaskStore();
  const {
    fetchAllTasks,
    handleAddTask,
    handleUpdatedTask,
    handleCompletedTask,
    handleRemovedTask,
  } = store;
  const { completedTasks, uncompletedTasks } = storeToRefs(store);
  onMounted(async () => {
    fetchAllTasks();
  });

  // SHOWING & HIDING BUTTON
  const showToggleCompleteBtn = computed(
    () => uncompletedTasks.value.length > 0 && completedTasks.value.length
  );
  // SHOW COMPLETED TASK
  const completedTasksVisible = computed(
    () => uncompletedTasks.value.length === 0 || completedTasks.value.length > 0
  );
  // HIDE COMPLETED TASKS
  const showCompletedTasks = ref(false);
</script>
