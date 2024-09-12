import { defineStore } from "pinia";
import { allTask, createTask, updateTask, completeTask, removeTask } from "@/http/task-api";

import { computed, reactive, ref } from "vue";

export const useTaskStore = defineStore("taskStore", () => {
  const tasks = ref([]);
  const task = reactive({
    id: null,
    name: null,
    is_completed: null,
  });

  //GETTER ---------------------
  //   filter from TasksPage.vue
  const completedTasks = computed(() => tasks.value.filter((task) => task.is_completed));
  const uncompletedTasks = computed(() => tasks.value.filter((task) => !task.is_completed));

  //ACTIONS --------------------------
  const fetchAllTasks = async () => {
    // all the takas in database
    const { data } = await allTask();
    tasks.value = data.data;
  };
  // ADDING TASK
  const handleAddTask = async (newTask) => {
    const { data: createdTask } = await createTask(newTask);
    tasks.value.unshift(createdTask.data);
  };

  // UPDATING TASK           //task=updatedTask from Task.vue
  const handleUpdatedTask = async (updatedTask) => {
    const { data: updatedData } = await updateTask(updatedTask.id, { name: updatedTask.name });
    // Find the current task in the local state (tasks.value) by its id
    const currentTask = tasks.value.find((item) => item.id === updatedTask.id);
    // Update the local task with the updated name from the server
    currentTask.name = updatedData.data.name;
  };

  // MARK TASK AS COMPLETE   ||       task to be marked
  const handleCompletedTask = async (task) => {
    const { data: dataResponse } = await completeTask(task.id, {
      is_completed: task.is_completed,
    });
    // finding current task to be marked
    const currentTask = tasks.value.find((item) => item.id === task.id);
    currentTask.is_completed = dataResponse.data.is_completed;
  };

  // REMOVING TASK
  const handleRemovedTask = async (task) => {
    await removeTask(task.id);
    const index = tasks.value.findIndex((item) => item.id === task.id);
    tasks.value.splice(index, 1);
  };

  return {
    completedTasks,
    uncompletedTasks,
    fetchAllTasks,
    handleAddTask,
    handleUpdatedTask,
    handleCompletedTask,
    handleRemovedTask,
  };
});
