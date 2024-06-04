<script setup lang="ts">
import { useRoute } from '#app';
import { useForm } from 'vee-validate';
import PageHeader from '~/components/ui/PageHeader.vue';
import { useCustomerDetailsQuery } from '~/queries/useCustomerDetails';
import { useCustomerUpdateMutation } from '~/queries/useCustomerUpdateMutation';
import { useUploadImageMutation } from '~/queries/useUploadImageMutation';
import type { Customer, CustomerUpdateContext } from '~/types/customers';
import { customerSchema, type FormFields } from '~/utils/validation-schemas/customer.schema';

definePageMeta({
  middleware: ['auth'],
});
useHead({
  title: 'Customer Deals | RED CRM'
});

const route = useRoute();
const customerId = computed(() => route.params.id as string);

const { data, isSuccess, isFetching, isLoading } = useCustomerDetailsQuery(customerId.value);
const { mutate: updateCustomer, isPending } = useCustomerUpdateMutation();
const { mutate: uploadImage, isPending: isUploadPending } = useUploadImageMutation(onFileUploaded);

const { errors, defineField, handleSubmit, resetForm, setValues, setFieldValue } = useForm<FormFields>({
  validationSchema: customerSchema,
});
const [name, nameAttrs] = defineField('name');
const [email, emailAttrs] = defineField('email');
const [avatarUrl, avatarUrlAttrs] = defineField('avatarUrl');
const [fromSource, fromSourceAttrs] = defineField('fromSource');

if (isSuccess) {
  setFormData();
}

const onSubmit = handleSubmit(values => {
  const { name, email, avatarUrl, fromSource} = values;
  const context: CustomerUpdateContext = {
    id: customerId.value,
    name,
    email,
    avatar_url: avatarUrl,
    from_source: fromSource,
  }

  updateCustomer(context);
});

const onFileSelect = (event: Event) => {
  const el = event.target as HTMLInputElement;
  if (!el.files) {
    return;
  }

  uploadImage(el.files[0]);
}

watch(() => isSuccess.value, () => {
  setFormData();
})

function setFormData() {
  const customer = data.value as unknown as Customer;
  if (!customer) {
    return;
  }

  const { name, email, avatar_url, from_source } = data.value as unknown as Customer;
  setValues({
    name,
    email,
    avatarUrl: avatar_url,
    fromSource: from_source,
  });
}

function onFileUploaded(url: URL) {
  setFieldValue('avatarUrl', url.href);
}
</script>

<template>
  <UiPageLoader v-if="isFetching || isLoading" />

  <PageHeader :title="data?.name" back-link="/customers" />

  <div class="grid lg:grid-cols-[minmax(200px,_24em)_1fr] gap-4">
    <form id="customer_update_form" class="max-w-sm" @submit="onSubmit">
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
            <span class="label-text">Email</span>
          </div>
          <input
            type="email"
            placeholder="Email"
            :class="`input input-bordered w-full ${errors.email && 'input-error'}`"
            v-model="email"
            v-bind="emailAttrs"
          />
          <div class="label" v-if="errors.email">
            <span class="label-text-alt text-error">{{ errors.email }}</span>
          </div>
        </label>
      </div>

      <div class="form-control mb-4">
        <label class="form-control w-full ">
          <div class="label">
            <span class="label-text">From</span>
          </div>
          <input
            type="text"
            placeholder="From"
            :class="`input input-bordered w-full ${errors.fromSource && 'input-error'}`"
            v-model="fromSource"
            v-bind="fromSourceAttrs"
          />
          <div class="label" v-if="errors.fromSource">
            <span class="label-text-alt text-error">{{ errors.fromSource }}</span>
          </div>
        </label>
      </div>

      <div class="form-control mb-4 flex-row justify-end">
        <button type="submit" class="btn btn-primary" :disabled="isPending">
          <span v-if="isPending" class="loading loading-spinner"></span>
          Update
        </button>
      </div>

    </form>

    <div>
      <div v-if="avatarUrl" class="mb-4 max-w-[33vw]">
        <img :src="avatarUrl" alt="avatar" />
      </div>

      <input
        type="file"
        class="file-input file-input-bordered file-input-primary w-full max-w-xs"
        accept="image/*"
        :disabled="isUploadPending"
        @change="onFileSelect"
      />
    </div>
  </div>
</template>

<style scoped>

</style>