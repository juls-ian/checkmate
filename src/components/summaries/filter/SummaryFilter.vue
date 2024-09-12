<template>
  <Dropdown
    :filter-items="filterItems"
    :active-filter-key="activeFilterKey"
    @filter="filter"
    @close="closeDropdown"
  />
</template>

<script setup>
  import { computed, onMounted, ref } from "vue";
  import { startOfWeek, endOfWeek, subWeeks, format } from "date-fns";
  import Dropdown from "../../dropdown/Dropdown.vue"; // Updated Dropdown path
  import { useRouter } from "vue-router";
  // handling query params
  const router = useRouter();
  // emit update event
  const emit = defineEmits(["update"]);

  // dropdown content
  const filterItems = computed(() => {
    const thisWeekStart = format(startOfWeek(new Date()), "d MMM");
    const thisWeekEnd = format(endOfWeek(new Date()), "d MMM");
    const lastWeekStart = format(startOfWeek(subWeeks(new Date(), 1)), "d MMM");
    const lastWeekEnd = format(endOfWeek(subWeeks(new Date(), 1)), "d MMM");
    return {
      today: "Today",
      yesterday: "Yesterday",
      "this-week": `This week (${thisWeekStart} - ${thisWeekEnd})`,
      "last-week": `Last week (${lastWeekStart} - ${lastWeekEnd})`,
      "this-month": "This month",
      "last-month": "Last month",
    };
  });

  // active item in the dropdown
  const activeFilterKey = ref("this-week");

  // returning currently selected filter
  const activeFilter = computed(
    () => filterItems.value[activeFilterKey.value] || filterItems.value["this-week"]
  );

  // filter method updates the activeFilterKey
  const filter = (period) => {
    activeFilterKey.value = period;
    router.push({ name: "summary", query: { period } });
    emit("update", { text: activeFilter.value, period: activeFilterKey.value });
  };

  // emit update on mount
  onMounted(() => emit("update", activeFilter.value));
</script>
