<script setup lang="ts">
const progress = ref();

const duration = 2000;
let done = false;
let rafId: number;

function getProgress (duration: number, elapsed: number): number {
  const completionPercentage = elapsed / duration * 100
  return (2 / Math.PI * 100) * Math.atan(completionPercentage / 50)
}

onMounted(() => {
  done = false;
  let start: number | null = null;

  function step(timestamp: number) {
    if (done) {
      return
    }
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    progress.value = Math.max(0, Math.min(100, getProgress(duration, elapsed)));
    if (process.client) {
      rafId = requestAnimationFrame(step);
    }
  }

  if (process.client) {
    rafId = requestAnimationFrame(step);
  }
});
onUnmounted(() => {
  done = true;
  if (process.client) {
    cancelAnimationFrame(rafId);
  }
});
</script>

<template>
<div
  class="fixed top-0 right-0 left-0 pointer-events-none w-auto h-[3px] bg-[linear-gradient(to_right,rgb(0,153,255)_0%,rgb(102,255,102)_100%)] z-[99999999] origin-[left_center] scale-x-0"
  :style="`transform: scaleX(${progress}%); background-size: ${(100 / progress) * 100}% auto`"
></div>
</template>

<style scoped>

</style>
