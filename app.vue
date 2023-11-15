<script setup lang="ts"></script>

<template>
  <TheHeader />
  <main class="main">
    <NuxtPage />
  </main>
</template>

<style lang="scss" scoped>
.main {
  min-height: calc(100vh - 40px);

  @media screen and (min-width: 900px) {
    min-height: calc(100vh - 48px);
  }
}
</style>
