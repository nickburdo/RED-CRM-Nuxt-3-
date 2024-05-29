<script setup lang="ts">

</script>

<template>
<div class="grid grid-cols-[minmax(200px,_1fr)_5fr]  min-h-screen bg-base-100">
  <LayoutSidebar />

  <main>
    <slot />
  </main>
</div>
</template>

<style scoped>

</style>