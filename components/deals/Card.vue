<script setup lang="ts">
import { currencyFormat } from '../../utils/format/currency.format';

interface Props {
  title: string;
  price: number;
  company: string;
  date: string;
}

defineProps<Props>();
defineEmits(['viewDetails']);

</script>

<template>
  <div class="card bg-base-100 shadow-xl mb-4" draggable="true">
    <div class="card-body">
      <button class="btn btn-outline btn-info btn-xs absolute top-2 right-2 w-7 h-7 p-0" @click="$emit('viewDetails')">
        <Icon name="clarity:details-line" class="text-lg" />
      </button>
      <h3 class="card-title">{{ title }}</h3>
      <p class="text-primary">{{ currencyFormat(price) }}</p>
      <div class="card-actions justify-end">
        <p>
          <span class="text-sm block">Company:</span>
          {{ company }}
        </p>
        <p class="text-info">{{ date }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>