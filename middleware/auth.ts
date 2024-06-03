import { useAuthStore } from '~/store/auth.store';
import { account } from '~/utils/appwrite/appwrite';

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();

  if (!authStore.isAuth && !to.path.startsWith('/auth') && process.client) {
    // check current session
    try {
      const response = await account.get();
      if (response) {
        authStore.set({
          email: response.email,
          name: response.name,
          status: response.status,
        })
      }
    } catch (e) {
      return navigateTo('/auth/login');
    }
  }

  return;
});
