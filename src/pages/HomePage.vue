<template>
  <main class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <h1 class="text-6xl font-bold text-blue-700 mb-8 hover:text-green-300">Checkmate</h1>
    <p class="italic text-lg">Stay organized, be productive</p>

    <div class="flex justify-center space-x-4 py-10">
      <router-link
        :to="{ name: 'register' }"
        class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >Sign up</router-link
      >

      <router-link
        :to="{ name: 'login' }"
        class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >Sign up</router-link
      >
    </div>
  </main>
</template>

<script setup></script>
