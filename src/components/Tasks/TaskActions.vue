<template>
  <div
    class="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  >
    <div class="text-gray-500 text-sm">24 Feb 12:00</div>
    <button
      class="p-1.5 text-gray-500 bg-gray-100 rounded-full hover:bg-gray-200"
      aria-label="Edit task"
      @click="emit('editAction')"
    >
      <PencilIcon />
    </button>
    <button
      class="p-1.5 text-red-600 bg-red-100 rounded-full hover:bg-red-200"
      aria-label="Delete task"
      @click="emit('removeAction')"
    >
      <TrashIcon />
    </button>
  </div>
</template>

<script setup>
  import PencilIcon from "@/components/icons/PencilIcon.vue";
  import TrashIcon from "@/components/icons/TrashIcon.vue";

  const emit = defineEmits(["editAction", "removeAction"]);
</script>
