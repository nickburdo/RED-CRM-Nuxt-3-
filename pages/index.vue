<script setup lang="ts">
import DealCard from '~/components/deals/Card.vue';
import CreateDeal from '~/components/deals/CreateDeal.vue';
import Details from '~/components/deals/Details.vue';
import PageHeader from '~/components/ui/PageHeader.vue';
import { useDrawerState } from '~/composables/useDrawerState';
import { useDealsQuery } from '~/queries/useDealsQuery';
import { useDealStatusChangeMutation } from '~/queries/useDealStatusChangeMutation';
import { type Deal, DealStatus } from '~/types/deals.types';
import { dateFormat } from '~/utils/format/date.format';
import { generateColumnsBackground } from '~/utils/generateColumnsBackground';

definePageMeta({
  middleware: ['auth'],
});
useHead({
  title: 'Deals Board | RED CRM'
});

const isDetailsOpen = useDrawerState();

const dealToView = ref<Deal | null>(null);
const movedDeal = ref({
  id: '',
  from: DealStatus.inbox,
})

const { data, isFetching, isLoading } = useDealsQuery();
const { mutate } = useDealStatusChangeMutation();

const handleDragStart = (id: string, from: DealStatus) => {
  movedDeal.value = { id, from }
}

const handleDrop = (to: DealStatus) => {
  mutate({ ...movedDeal.value, to });
}

const viewDetails = (deal: Deal) => {
  dealToView.value = deal;
  isDetailsOpen.value = true;
};

watch(() => data.value, (value) => {
    if (value && dealToView.value) {
      const deal = value?.[dealToView.value.status].deals.find((deal) => deal.$id === dealToView.value?.$id);
      if (deal) {
        dealToView.value = deal as unknown as Deal;
      }
    }
})

</script>

<template>
<div>
  <UiPageLoader v-if="isFetching || isLoading" />

  <PageHeader title="Deals Board">
    <CreateDeal />
  </PageHeader>

  <section class="grid grid-cols-5 gap-4">
    <div
      v-for="(column, index) in data"
      @dragover.prevent
      @drop="() => handleDrop(column.id)"
    >
      <h2 class="text-xl text-center" :style="generateColumnsBackground(+index, data.length)">{{ column?.title }}</h2>

      <DealCard
        v-for="deal in column?.deals"
        :title="deal.name"
        :price="deal.price"
        :company="deal.customer?.name"
        :date="dateFormat(deal.$updatedAt)"
        @dragstart="() => handleDragStart(deal.$id, column.id)"
        @view-details="() => viewDetails(deal)"
      />
    </div>
  </section>

  <Details :deal="dealToView" />
</div>
</template>

<style scoped>

</style>