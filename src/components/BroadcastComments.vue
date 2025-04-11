<template>
  <span class="list-header">Comentarios</span>
  <v-list-item v-for="comment in comments" :key="comment.id" class="list-item" variant="elevated">
    <v-list-item-title>{{ comment.text }}</v-list-item-title>
    <v-list-item-subtitle>{{ comment.username + ' - ' + getDateTime(new Date(comment.createdAt))
    }}</v-list-item-subtitle>
    <template #append>
      <v-btn prepend-icon="mdi-thumb-up-outline" variant="flat" rounded="xl" :disabled="username === comment.username"
        @click="onCommentLike(comment.id)">{{
          comment.likes
        }}</v-btn>
      <v-btn prepend-icon="mdi-thumb-down-outline" variant="flat" rounded="xl" :disabled="username === comment.username"
        @click="onCommentDislike(comment.id)">{{
          comment.dislikes
        }}</v-btn>
      <v-btn prepend-icon="mdi-message-text-outline" variant="flat" rounded="xl" @click="showInput"></v-btn>
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
import type { BroadcastComment } from '@/interfaces/broadcast';
import { ref } from 'vue';
import { getDateTime } from '@/utils/utils';
import { editBroadcastComments } from '@/services/collabChatApi';

const props = defineProps<{
  broadcastId: string
  comments: BroadcastComment[]
}>()

const showCommentInput = ref(false)
const username = localStorage.getItem('username') || 'Anónimo'

const showInput = () => {
  showCommentInput.value = !showCommentInput.value
}

const onCommentLike = async (commentId: string) => {
  const comment = props.comments.find(c => c.id === commentId)
  if (comment) {
    comment.likes += 1
  }
  try {
    await editBroadcastComments(props.broadcastId, props.comments)
  }
  catch (error) {
    alert('Ha ocurrido un error al likear el comentario')
  }
}

const onCommentDislike = async (commentId: string) => {
  const comment = props.comments.find(c => c.id === commentId)
  if (comment) {
    comment.dislikes += 1
  }
  try {
    await editBroadcastComments(props.broadcastId, props.comments)
  }
  catch (error) {
    alert('Ha ocurrido un error al likear el comentario')
  }
}



</script>

<style scoped>
.list-header {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 5px;
}

.list-item {
  margin: 10px 0;
  padding: 10px;
  border-radius: 8px;
  background-color: #f9f9f9;
}
</style>