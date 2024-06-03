<script setup lang="ts">
import { useDrawerState } from '~/composables/useDrawerState';
import { useAddCommentMutation } from '~/queries/useAddCommentlMutation';
import { currencyFormat } from '~/utils/format/currency.format';
import { dateFormat } from '~/utils/format/date.format';
import { dealStatusLabel } from '../../constants/deals';

const props = defineProps(['deal']);

const isOpen = useDrawerState();

const commentCollapse = ref<HTMLDetailsElement | null>(null);
const commentInput = ref<HTMLInputElement | null>(null);
const newComment = ref('');

const { mutate, isPending } = useAddCommentMutation(
  () => commentCollapse.value?.removeAttribute('open')
);

function addComment() {
  if(props.deal) {
    mutate({ dealId: props.deal.$id, text: newComment.value });
  }
}

function handleCommentCollapceToggle
() {
  if (!commentCollapse.value) {
    return;
  }
  if (commentCollapse.value?.open) {
    commentInput.value?.focus();
  } else {
    newComment.value = '';
  }
}

onMounted(() => {
  commentCollapse.value?.addEventListener('toggle', handleCommentCollapceToggle);
});

onUnmounted(() => {
  commentCollapse.value?.removeEventListener('toggle', handleCommentCollapceToggle);
});
</script>

<template>
<UiDrawer title="Deal Details" width="30vw">
  <dl class="mb-2">
    <dt>Name:</dt>
    <dd class="text-lg font-semibold">{{ deal?.name }}</dd>
  </dl>
  <dl class="mb-2">
    <dt>Status:</dt>
    <dd><div class="badge" :class="dealStatusLabel[deal?.status]?.class">{{ dealStatusLabel[deal?.status]?.label }}</div></dd>
<!--    <dd><div class="badge" :class="'badge-success'">{{ dealStatusLabel[deal?.status]?.label }}</div></dd>-->
  </dl>
  <dl class="mb-2">
    <dt>Price:</dt>
    <dd class="text-primary">{{ currencyFormat(deal?.price) }}</dd>
  </dl>
  <dl class="mb-2">
    <dt>Company:</dt>
    <dd class="text-lg">{{ deal?.customer?.name }}</dd>
  </dl>
  <ddl class="mb-2">
    <dt>Last update:</dt>
    <dd class="text-info">{{ dateFormat(deal?.$updatedAt) }}</dd>
  </ddl>

  <div class="divider"></div>

  <details id="addComment" class="add-comment mb-4" ref="commentCollapse">
    <summary class="block relative cursor-pointer outline-none">Add your comment</summary>
    <div class="flex gap-2 pt-3">
      <input class="input input-bordered w-full" v-model="newComment" ref="commentInput" />
      <button
        class="btn btn-primary"
        :disabled="!newComment || isPending"
        @click="addComment"
      >
        <Icon name="material-symbols:add" class="text-2xl" />
      </button>
    </div>
  </details>

  <div>
    <div v-for="comment in deal?.comments" class="chat chat-start block">
        <div class="text-xs text-primary ml-2">{{ dateFormat(comment.$createdAt, 'MM/DD/YYYY hh:mm a') }}</div>
        <div class="chat-bubble chat-bubble-info mb-2">
          {{ comment.text }}
        </div>
      </div>
  </div>
</UiDrawer>
</template>

<style scoped>
summary::after {
  position: absolute;
  top: 0;
  right: 0;
  display: inline-block;
  content: url('data:image/svg+xml; utf8, <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8L18 9.4z"/></svg>');
  transition: 0.2s;
}
.add-comment[open] > summary::after {
  transform: rotate(180deg);
  margin-top: -5px;
}
.warning {
  @apply badge-warning;
}
.primary {
  @apply badge-primary;
}
.info {
  @apply badge-info;
}
.accent {
  @apply badge-accent;
}
.success {
  @apply badge-success text-white;
}
</style>