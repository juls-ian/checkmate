<template>
  <nav
    class="bg-white dark:bg-gray-900 w-full fixed z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600"
  >
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <!-- Logo and UL in the same flex container -->
      <div class="flex items-center space-x-14">
        <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/67/Microsoft_To-Do_icon.png"
            class="h-8"
            alt="Flowbite Logo"
          />
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            >CheckMate</span
          >
        </a>

        <!-- ONLY SHOW THESE IF USER = LOGGED IN -->
        <div
          v-if="store.isLoggedIn"
          class="items-center justify-start hidden w-full md:flex md:w-auto"
        >
          <ul
            class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
          >
            <li>
              <router-link
                :to="{ name: 'tasks' }"
                class="block font-bold py-2 px-3 dark:text-white text-black bg-white rounded md:bg-transparent md:p-0"
                >Tasks</router-link
              >
            </li>
            <li>
              <router-link
                :to="{ name: 'summary' }"
                class="block font-bold py-2 px-3 dark:text-white text-black bg-white rounded md:bg-transparent md:p-0"
                >Summary</router-link
              >
            </li>
          </ul>
        </div>
      </div>

      <!-- RIGHT BUTTONS -->
      <div class="flex space-x-10 md:space-x-5 rtl:space-x-reverse">
        <ul class="flex justify-around space-x-5">
          <template v-if="!store.isLoggedIn">
            <li
              class="list-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <router-link :to="{ name: 'login' }">Login</router-link>
            </li>
            <li
              class="list-none text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <router-link :to="{ name: 'register' }">Register</router-link>
            </li>
          </template>
          <template v-else>
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              type="button"
              aria-expanded="false"
              class="flex justify-center items-center"
            >
              {{ store.user.name }}
              <DownIcon />
            </button>

            <!-- Dropdown menu -->
            <div
              id="dropdown"
              class="z-99 hidden focus:bg-white divide-y divide-gray-100 shadow w-44 dark:bg-gray-700"
            >
              <ul
                class="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 dark:hover:bg-gray-600 dark:hover:text-white"
                    @click.prevent="logout"
                    >Logout</a
                  >
                </li>
              </ul>
            </div>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
  import { useRouter, useRoute } from "vue-router";
  import { useAuthStore } from "@/stores/auth";
  import { onMounted, ref, watch } from "vue";
  import { initDropdowns } from "flowbite";
  import DownIcon from "./icons/DownIcon.vue";
  const store = useAuthStore();
  const router = useRouter();
  const route = useRoute();

  const logout = async () => {
    await store.handleLogout();

    router.push({ name: "login" });
  };

  onMounted(() => {
    initDropdowns();
  });

  // Reinitialize Flowbite after route changes
  watch(route, () => {
    initDropdowns();
  });
</script>
