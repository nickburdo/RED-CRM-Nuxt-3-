<script setup lang="ts">
import { useRouter } from '#imports';
import { AppwriteException } from 'appwrite';
import { v4 as uuid } from 'uuid';
import { account } from '~/utils/appwrite/appwrite';

definePageMeta({
  layout: 'auth',
  middleware: ['auth'],
});
useHead({
  title: 'Sign Up | RED CRM'
});

const name = ref('');
const email = ref('');
const password = ref('');
const isLoading = ref(false);

const router = useRouter();

const handleSubmit = async () => {
  try {
    isLoading.value = true;
    await account.create(uuid(), email.value, password.value, name.value);
    name.value = '';
    email.value = '';
    password.value = '';
    alert('Sign Up was success. Use your email and password to Log In')
    await router.push('/auth/login');
  } catch (e) {
    alert((e as AppwriteException).message);
  }
  isLoading.value = false;
};
</script>

<template>
  <UiH1 class="text-center">Sign Up</UiH1>
  <form @submit.prevent="handleSubmit">
    <div class="form-control mb-4">
      <label class="input input-bordered flex items-center gap-2">
        <Icon name="material-symbols:person" class="w-4 h-4 opacity-70" />
        <input type="text" class="grow" placeholder="Name" v-model="name" />
      </label>
    </div>

    <div class="form-control mb-4">
      <label class="input input-bordered flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
        <input type="email" class="grow" placeholder="Email" v-model="email" />
      </label>
    </div>

    <div class="form-control mb-4">
      <label class="input input-bordered flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path fill-rule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clip-rule="evenodd" /></svg>
        <input type="password" class="grow" placeholder="Password" v-model="password" />
      </label>
    </div>

    <button type="submit" class="btn btn-primary btn-wide mb-4" :disabled="isLoading">Sign Up</button>

    <p>Have account? <NuxtLink to="/auth/login">Log In</NuxtLink> </p>
  </form>
</template>

<style scoped>

</style>