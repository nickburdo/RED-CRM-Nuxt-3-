export function useModal(modalId: string, closeCB?:() => void) {
  const openModal = () => {
    if (process.client) {
      (document?.querySelector(`#${modalId}`) as HTMLDialogElement).showModal();
    }
  };

  const closeModal = () => {
    if (process.client) {
      (document?.querySelector(`#${modalId}`) as HTMLDialogElement).close();
    }
  };

  onMounted(() => {
    if (closeCB) {
      document?.querySelector(`#${modalId}`)?.addEventListener('close', closeCB);
    }
  })

  onUnmounted(() => {
    if (closeCB) {
      document?.querySelector(`#${modalId}`)?.removeEventListener('close', closeCB);
    }
  })

  return { openModal, closeModal };
}
