<template>
  <div class="w-full max-w-lg mx-auto">
    <input
      type="text"
      class="form-control w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
      placeholder="+ Add new task. Press enter to save."
      @keydown.enter="addNewTask"
    />
  </div>
</template>

<script setup>
  import { reactive } from "vue";

  //   REACTIVE Object
  const newTask = reactive({
    name: "",
    is_completed: false,
  });

  const emit = defineEmits(["addTask"]);
  const addNewTask = (event) => {
    // checks if input field has non-empty value
    if (event.target.value.trim()) {
      newTask.name = event.target.value;
      //   resets input field to empty string
      event.target.value = "";
      //   emitting to parent component
      emit("addTask", newTask);
    }
  };
</script>
