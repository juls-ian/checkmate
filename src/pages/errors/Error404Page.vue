<template>
  <div class="container h-screen flex flex-col items-center justify-center">
    <div class="py-5">
      <h1 class="text-blue-700 text-9xl">404</h1>
    </div>
    <div class="py-5">
      <p>
        Sorry, the page
        <code class="text-red-700 font-bold">{{ $route.params.notFound }}</code> you're looking for
        is not found.
      </p>
    </div>
    <router-link :to="{ name: 'tasks' }" class="mt-2 text-blue-500 hover:bg-none">
      Back to your tasks
    </router-link>
  </div>
</template>
