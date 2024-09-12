<script setup>
  import Navbar from "./components/Navbar.vue";
  import TasksPage from "./pages/TasksPage.vue";
  import Footer from "./components/Footer.vue";
</script>

<template>
  <Navbar />
  <router-view class="py-12" />
  <Footer />
</template>

<style scoped></style>

/
<!-- <template>
  <Navbar />
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
  <Footer />
</template>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style> -->
*/
