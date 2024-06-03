<script setup lang="ts">
interface Props {
  title: string;
}

defineProps<Props>();
</script>

<template>
<header class="flex justify-between items-center mb-4">
  <h1 class="text-3xl font-bold">{{ title }}</h1>

  <slot />
</header>
</template>

<style scoped>

</style>