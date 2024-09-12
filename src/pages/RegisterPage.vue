<template>
  <main class="min-h-screen flex items-center justify-center">
    <form class="w-full max-w-sm mx-auto my-10 flex flex-col mt-8" @submit.prevent="handleSubmit">
      <h1 class="text-6xl font-bold text-blue-700 mb-8 hover:text-green-300 text-center">
        Checkmate
      </h1>
      <h1 class="text-2xl font-bold text-white dark:text-white mb-8 text-center">Please sign in</h1>
      <!-- NAME -->
      <label for="name" class="block mb-2 mt-5 text-sm font-medium text-gray-900 dark:text-white"
        >Your name</label
      >
      <div class="relative mb-2">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <UserIcon />
        </div>
        <input
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          :class="{ 'invalid-field': errors.name && errors.name[0] }"
          v-model="form.name"
          placeholder="Jean Grey"
        />
        <div
          class="absolute inset-y-0 end-0 flex items-center pe-3.5"
          v-if="errors.name && errors.name[0]"
        >
          <ErrorIcon />
        </div>
      </div>
      <!-- error message -->
      <div
        class="relative mb-2 block invalid-text"
        role="alert"
        id="username-error"
        v-if="errors.name && errors.name[0]"
      >
        {{ errors.name && errors.name[0] }}
      </div>

      <!-- EMAIL -->
      <label
        for="email-error"
        class="block mb-2 mt-5 text-sm font-medium text-gray-900 dark:text-white"
        >Email</label
      >
      <div class="relative mb-2">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <MailIcon />
        </div>
        <input
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          :class="{ 'invalid-field': errors.email && errors.email[0] }"
          v-model="form.email"
          placeholder="jean.grey@xmen.com"
        />
        <div
          class="absolute inset-y-0 end-0 flex items-center pe-3.5"
          v-if="errors.email && errors.email[0]"
        >
          <ErrorIcon />
        </div>
      </div>
      <!-- error message -->
      <div
        class="relative mb-2 block invalid-text"
        role="alert"
        id="username-error"
        v-if="errors.email && errors.email[0]"
      >
        {{ errors.email && errors.email[0] }}
      </div>

      <!-- PASSWORD -->
      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Password</label
      >
      <div class="relative mb-2">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <LockIcon />
        </div>
        <input
          type="password"
          id="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          :class="{ 'invalid-field': errors.password && errors.password[0] }"
          v-model="form.password"
          :errors
        />
        <div
          class="absolute inset-y-0 end-0 flex items-center pe-3.5"
          v-if="errors.password && errors.password[0]"
        >
          <ErrorIcon />
        </div>
      </div>
      <!-- error message -->
      <div
        class="relative mb-2 invalid-text"
        role="alert"
        v-if="errors.password && errors.password[0]"
      >
        {{ errors.password && errors.password[0] }}
      </div>

      <!-- CONFIRM PASSWORD -->
      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Confirm password</label
      >
      <div class="relative mb-2">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <LockIcon />
        </div>
        <input
          type="password"
          id="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          :class="{ 'invalid-field': errors.password && errors.password[0] }"
          v-model="form.password_confirmation"
          :errors
        />
        <div
          class="absolute inset-y-0 end-0 flex items-center pe-3.5"
          v-if="errors.password && errors.password[0]"
        >
          <ErrorIcon />
        </div>
      </div>

      <button
        type="submit"
        class="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Register
      </button>
    </form>
  </main>
</template>

<script setup>
  import { useRouter } from "vue-router";
  import { useAuthStore } from "@/stores/auth";
  import { reactive } from "vue";
  import MailIcon from "@/components/icons/MailIcon.vue";
  import LockIcon from "@/components/icons/LockIcon.vue";
  import { storeToRefs } from "pinia";
  import ErrorIcon from "@/components/icons/ErrorIcon.vue";
  import UserIcon from "@/components/icons/UserIcon.vue";

  const router = useRouter();
  const store = useAuthStore();
  const form = reactive({ name: "", email: "", password: "", password_confirmation: "" });

  // accessing error messages in error state
  const { isLoggedIn, errors } = storeToRefs(store);

  const handleSubmit = async () => {
    await store.handleRegister(form);
    // directly log in upon sign up
    if (isLoggedIn.value) router.push({ name: "tasks" });
  };
</script>
