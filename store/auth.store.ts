import { defineStore } from '#imports';
import * as buffer from 'buffer';
import { authStoreKey } from '~/utils/keys';

interface AuthStore {
  email: string;
  name: string;
  status: boolean;
}

const defaultValue: AuthStore = {
  email: '',
  name: '',
  status: false,
}

export const useAuthStore = defineStore(authStoreKey, () =>{
  const user = ref(defaultValue);

  const isAuth = computed(() => user.value.status);
  const userName = computed(() => user.value.name);

  function clear() {
    user.value = defaultValue;
  }

  function set(value: AuthStore) {
    user.value = value;
  }

  return { user, isAuth, userName, clear, set }
});
