<script setup lang="ts">
import { useForm } from 'vee-validate';
import { useModal } from '~/hooks/ui/useModal';
import { useCreateDealMutation } from '~/queries/useCreateDealMutation';
import type { CreateDealContext } from '~/types/deals.types';
import { createDealSchema, type FormFields } from '~/utils/validation-schemas/createDeal.schema';

const { errors, defineField, handleSubmit, resetForm } = useForm<FormFields>({
  validationSchema: createDealSchema,
});
const [name, nameAttrs] = defineField('name');
const [price, priceAttrs] = defineField('price');
const [customerName, customerNameAttrs] = defineField('customerName');
const [customerEmail, customerEmailAttrs] = defineField('customerEmail');

const modalId = 'create_deal_modal';
const onModalClose = () => {
  resetForm();
};
const { openModal, closeModal } = useModal(modalId, onModalClose);


const { mutate, isPending } = useCreateDealMutation(closeModal);

const onSubmit = handleSubmit(values => {
  const { name, price, customerName, customerEmail, ...rest} = values;
  const context: CreateDealContext = {
    name,
    price: +price,
    customer: {
      name: customerName,
      email: customerEmail
    }
  }
  console.log('SUBMIT', context);
  mutate(context);
})
</script>

<template>
  <button class="btn btn-primary" @click="openModal">
    <Icon name="material-symbols:add" class="text-[20px]" />
    Add Deal
  </button>

  <UiModal :modal-id="modalId" title="Create Deal" close-btn-text="Cancel" >
    <template #default>
      <form id="create_deal_form" @submit="onSubmit">
        <div class="form-control mb-4">
          <label class="form-control w-full ">
            <div class="label">
              <span class="label-text">Name</span>
            </div>
            <input
              type="text"
              placeholder="Name"
              :class="`input input-bordered w-full ${errors.name && 'input-error'}`"
              v-model="name"
              v-bind="nameAttrs"
            />
            <div class="label" v-if="errors.name">
              <span class="label-text-alt text-error">{{ errors.name }}</span>
            </div>
          </label>
        </div>

        <div class="form-control mb-4">
          <label class="form-control w-full ">
            <div class="label">
              <span class="label-text">Price</span>
            </div>
            <input
              type="text"
              placeholder="Price"
              :class="`input input-bordered w-full ${errors.price && 'input-error'}`"
              v-model="price"
              v-bind="priceAttrs"
            />
            <div class="label" v-if="errors.price">
              <span class="label-text-alt text-error">{{ errors.price }}</span>
            </div>
          </label>
        </div>

        <div class="form-control mb-4">
          <label class="form-control w-full ">
            <div class="label">
              <span class="label-text">Customer name</span>
            </div>
            <input
              type="text"
              placeholder="Customer name"
              :class="`input input-bordered w-full ${errors.customerName && 'input-error'}`"
              v-model="customerName"
              v-bind="customerNameAttrs"
            />
            <div class="label" v-if="errors.customerName">
              <span class="label-text-alt text-error">{{ errors.customerName }}</span>
            </div>
          </label>
        </div>

        <div class="form-control mb-4">
          <label class="form-control w-full ">
            <div class="label">
              <span class="label-text">Customer email</span>
            </div>
            <input
              type="email"
              placeholder="Customer email"
              :class="`input input-bordered w-full ${errors.customerEmail && 'input-error'}`"
              v-model="customerEmail"
              v-bind="customerEmailAttrs"
            />
            <div class="label" v-if="errors.customerEmail">
              <span class="label-text-alt text-error">{{ errors.customerEmail }}</span>
            </div>
          </label>
        </div>
      </form>
    </template>

    <template #action>
      <button type="submit" class="btn btn-primary" form="create_deal_form" :disabled="isPending" >
        Add Deal
      </button>
    </template>
  </UiModal>
</template>

<style scoped>

</style>