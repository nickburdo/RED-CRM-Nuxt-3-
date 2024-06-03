<script setup lang="ts">
  import { useDrawerState } from '~/composables/useDrawerState';

  interface Props {
    title: string;
    width?: string;
  }

  defineProps<Props>();

  const isOpen = useDrawerState();

  function toggleDrawer() {
    return isOpen.value = !isOpen.value;
  }

  watch(() => isOpen.value, () => {
    if (typeof window !== 'undefined' && window.document) {
      if (isOpen.value)
        document.body.style.overflow = 'hidden'
      else document.body.style.overflow = 'unset'
    }
  })
</script>

<template>
  <div id="appDrawer" class="drawer z-50" :class="{ show: isOpen }">
    <div class="drawer__overlay fixed top-0 right-0 z-50 h-screen w-0 bg-[#000000a6]" @click="toggleDrawer" />
    <div
      class="drawer__container invisible fixed top-0 right-0 z-50 flex h-screen w-0 flex-col overflow-hidden opacity-0"
      :class="isOpen && width ? `w-[${width}]` : 'w-[50vw]'"
    >
      <div class="drawer__header flex justify-between items-center pl-4 shadow-md">
        <UiH1 class="mb-0">{{ title }}</UiH1>
        <button
          type="button"
          class="p-4 hover:bg-slate-100"
          title="Close"
          @click="toggleDrawer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="drawer__content invisible relative h-auto flex-grow overflow-y-auto opacity-0 p-4">
        <slot />
      </div>
    </div>
  </div></template>

<style scoped>
.drawer {
  @keyframes show {
    from {
      clip-path: inset(0 0 0 100%);
    }
    to {
      clip-path: inset(0 0 0 0);
    }
  }
}
.drawer.show .drawer__overlay {
  animation: show 0.5s forwards;
  @apply w-[100vw];
}

.drawer.show .drawer__container {
  animation: show 0.5s forwards;
  @apply visible min-w-[20rem] bg-white opacity-100;
}

.drawer.show .drawer__content {
  animation: show 0.3s forwards;
  @apply visible opacity-100;
}
.drawer__overlay,
.drawer__container {
  transition: all 0.5s ease-in-out;
}
.drawer__content {
  transition: visibility 0s linear 0.5s, opacity 0.2s 0s;
}
</style>