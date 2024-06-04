<script setup lang="ts">
import PageHeader from '~/components/ui/PageHeader.vue';
import { useCustomersQuery } from '~/queries/useCustomersQuery';

definePageMeta({
  middleware: ['auth'],
});
useHead({
  title: 'Customers | RED CRM'
});

const { data, isLoading, isFetching } = useCustomersQuery();
</script>

<template>
<div>
  <UiPageLoader v-if="isFetching || isLoading" />

  <PageHeader title="Customers" />

  <section class="overflow-x-auto">
    <table class="table">
      <!-- head -->
      <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>From</th>
      </tr>
      </thead>
      <tbody>
      <!-- row 1 -->
      <tr v-for="row in data?.documents">
        <td><div class="flex items-center gap-3">
          <div class="avatar">
            <div class="mask mask-squircle w-12 h-12">
              <img :src="row.avatar_url" alt="Avatar"/>
            </div>
          </div>
          <div>
            <NuxtLink :to="`/customers/${row.$id}`" class="font-bold">{{ row.name }}</NuxtLink>
          </div>
        </div></td>
        <td>{{ row.email }}</td>
        <td>{{ row.from_source }}</td>
      </tr>
      <!-- row 2 -->
      </tbody>
    </table>
  </section>

  <section class="w-[600px] overflow-auto">
<!--    <pre>{{ data }}</pre>-->
  </section>
</div>
</template>

<style scoped>

</style>