<template>
  <main class="min-h-screen mt-8">
    <div class="container mx-auto">
      <div class="flex justify-center">
        <div class="w-full md:w-8/12">
          <div class="flex justify-between items-center">
            <h1 class="text-3xl font-semibold mb-4">
              Summary
              <small class="text-gray-500 text-lg">{{ selectedFilter.text }}</small>
            </h1>
          </div>
          <div class="flex justify-end">
            <SummaryFilter @update="setSelectedFilter" />
          </div>
          <div v-for="(tasks, description) in summaries" :key="description">
            <Summaries :tasks="tasks" :description="description" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
  import { useSummaryStore } from "../stores/summary";
  import { onMounted, reactive, watch } from "vue";
  import { storeToRefs } from "pinia";
  import Summaries from "../components/summaries/Summaries.vue";
  import SummaryFilter from "@/components/summaries/filter/SummaryFilter.vue";
  const store = useSummaryStore();
  const { summaries } = storeToRefs(store);
  const { fetchTasksSummary } = store;

  const selectedFilter = reactive({
    period: "",
    text: "",
  });

  // changing task summary according to filter selected
  //                                     keep reactivity
  const setSelectedFilter = (event) => Object.assign(selectedFilter, event);
  onMounted(async () => {
    await fetchTasksSummary();
  });

  watch(
    () => selectedFilter.period,
    async (period) => await fetchTasksSummary({ period })
  );
</script>
