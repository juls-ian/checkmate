<template>
  <Menu as="div" class="relative inline-block text-left" v-slot="{ open }">
    <div>
      <!-- button for the dropdown trigger -->
      <MenuButton
        class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        {{ activeFilter }}
        <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
      </MenuButton>
    </div>

    <!-- dropdown transitions  -->
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <!-- menu items for the dropdown content -->
      <MenuItems
        v-if="open"
        class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="py-1">
          <!-- Loop through filterItems for dropdown options -->
          <MenuItem v-for="(value, key) in filterItems" :key="key">
            <!-- Use v-slot for active class -->
            <template #default="{ active }">
              <a
                href="#"
                :class="[
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'block px-4 py-2 text-sm',
                ]"
                @click.prevent="selectFilter(key)"
              >
                <FilterItem :text="value" :selected="key === activeFilterKey" />
              </a>
            </template>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup>
  import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
  import { ChevronDownIcon } from "@heroicons/vue/20/solid";
  import { computed, ref } from "vue";
  import { startOfWeek, endOfWeek, subWeeks, format } from "date-fns";
  import { useRouter } from "vue-router";
  import FilterItem from "../summaries/filter/FilterItem.vue";

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

  const activeFilterKey = ref("this-week");
  const activeFilter = computed(
    () => filterItems.value[activeFilterKey.value] || filterItems.value["this-week"]
  );
  const emit = defineEmits(["filter", "close"]);

  // update filter and close dropdown
  const selectFilter = (period) => {
    activeFilterKey.value = period;
    emit("filter", period); // emit filter selection
    emit("close"); // emit close event to close the dropdown
  };
</script>
