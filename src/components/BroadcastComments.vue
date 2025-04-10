<template>
  <v-list-item v-for="comment in commentsRef" :key="comment.id" class="list-item" variant="elevated">
    <v-list-item-title>{{ comment.text }}</v-list-item-title>
    <v-list-item-subtitle>{{ comment.username + ' - ' + comment.createdAt.toLocaleString() }}</v-list-item-subtitle>
    <template #append>
      <v-btn prepend-icon="mdi-thumb-up-outline" variant="flat" rounded="xl" @click="onCommentLike(comment.id)">{{
        comment.likes
      }}</v-btn>
      <v-btn prepend-icon="mdi-thumb-down-outline" variant="flat" rounded="xl" @click="onCommentDislike(comment.id)">{{
        comment.dislikes
      }}</v-btn>
      <v-btn prepend-icon="mdi-message-text-outline" variant="flat" rounded="xl" @click="showInput"></v-btn>
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
import type { BroadcastComment } from '@/interfaces/broadcast';
import { onMounted, ref } from 'vue';

const props = defineProps<{
  comments: BroadcastComment[]
}>()

const commentsRef = ref<BroadcastComment[]>([])
const showCommentInput = ref(false)
const commentLikes = ref(0)
const commentDislikes = ref(0)

onMounted(() => commentsRef.value = props.comments)


const showInput = () => {
  showCommentInput.value = !showCommentInput.value
}

const onCommentLike = async (commentId: string) => {
  const comment = commentsRef.value.find(c => c.id === commentId)
  if (comment) {
    comment.likes += 1
  }
}

const onCommentDislike = async (commentId: string) => {
  const comment = commentsRef.value.find(c => c.id === commentId)
  if (comment) {
    comment.dislikes += 1
  }
}

</script>

<style scoped>
.list-item {
  margin: 10px 0;
  padding: 10px;
  border-radius: 8px;
  background-color: #f9f9f9;
}
</style>