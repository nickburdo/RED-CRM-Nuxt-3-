<script setup lang="ts">
interface Props {
  modalId: string;
  title: string;
  closeBtnText?: string;
}

defineProps<Props>();
</script>

<template>
  <dialog :id="modalId" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 class="font-bold text-lg">{{ title }}</h3>
      <slot />
      <div class="modal-action">
        <form method="dialog">
          <button class="btn">{{ closeBtnText || 'Close' }}</button>
        </form>
        <slot name="action" />
      </div>
    </div>
  </dialog>
</template>

<style scoped>

</style>