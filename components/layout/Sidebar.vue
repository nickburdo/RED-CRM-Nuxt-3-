<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/store/auth.store';
import { account } from '~/utils/appwrite/appwrite';
import { mainMenuItems } from '~/utils/mainMenuItems';

const items = mainMenuItems;
const router = useRouter();
const authStore = useAuthStore();

const isLoading = ref(false);

const logout = async () => {
  isLoading.value = true;
  try {
    await account.deleteSession('current');
  } catch (e) {}
  authStore.clear();
  await router.push('/auth/login');
  isLoading.value = false;
};

</script>

<template>
  <aside class="p-4 border-r shadow-md flex flex-col">
    <NuxtLink to="/" active-class="logo-active">
      <NuxtImg src="/logo.svg" width="100" class="block mx-auto mb-4" />
    </NuxtLink>

    <ul class="menu text-base grow">
      <li v-for="item in items">
        <NuxtLink :to="item.linkTo" class="hover:text-primary mb-1">
          <Icon :name="item.icon" />
          {{item.title}}
        </NuxtLink>
      </li>
    </ul>

    <div>
      <p class="px-6 flex items-center">
        <Icon name="material-symbols:person" class="mr-2" />
        {{authStore.userName}}
      </p>

      <button
        class="text-left px-4 py-2 m-2 rounded-lg flex items-center gap-2 hover:text-primary hover:bg-[var(--fallback-bc,oklch(var(--bc)/0.1))]"
        @click="logout"
        :disabled="isLoading"
      >
        <Icon name="mdi:logout" />
        Logout
      </button>

    </div>
  </aside>
</template>

<style scoped>
.menu li > *:not(ul, .menu-title, details, .btn):active {
  @apply bg-[var(--fallback-bc,oklch(var(--bc)/0.1))] text-primary
}
.router-link-active {
  @apply bg-[var(--fallback-bc,oklch(var(--bc)/0.1))] font-bold text-primary
}
</style>