<template>
<div class="grid grid-cols-[minmax(13rem,_1fr)_5fr]  min-h-screen bg-base-100">
  <LayoutSidebar />

  <main class="p-6">
    <slot />
  </main>
</div>


  <VueQueryDevtools />
</template>

<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
</script>