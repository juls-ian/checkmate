<template>
  <!-- List of tasks -->
  <li class="p-4 border-b border-gray-200 flex justify-between items-center group">
    <div class="flex items-center justify-content-around align-middle">
      <!-- checkbox -->
      <input
        class="form-check-input h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        type="checkbox"
        :class="completedClass"
        :checked="task.is_completed"
        @change="markTaskAsCompleted"
      />
      <div
        class="ml-3 flex-grow text-lg"
        title="Double click the text to edit or remove"
        :class="completedClass"
        @dblclick="isEdit = true"
      >
        <!-- EDIT INPUT FIELD -->
        <div class="" v-if="isEdit">
          <input
            class="h-9 focus:outline-none focus:ring-0 outline-none focus:border-none border-none font-semibold"
            type="text"
            @keyup.esc="undo"
            v-model="taskName"
            v-focus="vFocus"
            @keyup.enter="updateTask"
          />
        </div>
        <span v-else>{{ task.name }}</span>
      </div>
    </div>
    <!-- EDIT AND DELETE BUTTONS-->
    <TaskActions @edit-action="isEdit = true" v-show="!isEdit" @remove-action="removeTask" />
  </li>
</template>

<script setup>
  import { computed, ref } from "vue";
  import TaskActions from "./TaskActions.vue";
  const props = defineProps({
    // individual task will be bind in AllTasks.vue
    task: Object,
  });

  const isEdit = ref(false);
  const emit = defineEmits(["taskUpdated", "taskCompleted", "taskRemoved"]);
  const taskName = ref(props.task.name);
  const completedClass = computed(() => (props.task.is_completed ? "completed" : ""));

  const vFocus = {
    mounted: (el) => el.focus(),
  };

  const undo = () => {
    isEdit.value = false;
    // resets value to orig value of props
    taskName.value = props.task.name;
  };
  // UPDATING TASK EMIT
  const updateTask = (event) => {
    //                    copy of task,  updating the props.name from input field from keyup event
    const updatedTask = { ...props.task, name: event.target.value };
    // exiting edit mode
    isEdit.value = false;
    // emitting updated task to the parent
    emit("taskUpdated", updatedTask);
  };

  // MARK TASK AS COMPLETE EMIT
  const markTaskAsCompleted = (event) => {
    const markedTask = { ...props.task, is_completed: !props.task.is_completed };
    emit("taskCompleted", markedTask);
  };

  // REMOVING TASK
  const removeTask = () => {
    if (confirm("Delete this task?")) {
      emit("taskRemoved", props.task);
    }
  };
</script>
