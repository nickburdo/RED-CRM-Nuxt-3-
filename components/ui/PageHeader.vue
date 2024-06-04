<script setup lang="ts">
interface Props {
  title: string;
  backLink?: string;
}

defineProps<Props>();
</script>

<template>
<header class="flex justify-between items-center mb-4">
  <div class="flex items-center">
    <NuxtLink v-if="backLink" :to="backLink">
      <button class="btn btn-outline btn-sm mr-4"><Icon name="material-symbols:arrow-back" /></button>
    </NuxtLink>

    <h1 class="text-3xl font-bold">{{ title }}</h1>
  </div>

  <slot />
</header>
</template>

<style scoped>

</style>