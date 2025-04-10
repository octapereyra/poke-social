<template>
  <v-card border="md" rounded="xl" class="my-4" elevation="2">
    <v-card-title>{{ broadcast.title }}
    </v-card-title>
    <v-card-text>{{ broadcast.description }}</v-card-text>
    <v-card-actions>
      <v-list-item class="w-100">
        <v-list-item-title class="comment-author">Creado por {{ broadcast.username }}</v-list-item-title>
        <v-list-item-subtitle>{{ getDateTime(new Date(broadcast.createdAt)) }}</v-list-item-subtitle>
        <template #append>
          <div class="justify-self-end">
            <v-btn :prepend-icon="like ? ' mdi-thumb-up' : 'mdi-thumb-up-outline'" @click="onLike">{{ broadcast.likes
            }}</v-btn>
            <v-btn :prepend-icon="dislike ? 'mdi-thumb-down' : 'mdi-thumb-down-outline'" @click="onDislike">{{
              broadcast.dislikes }}</v-btn>
            <v-btn icon="mdi-message-text-outline" @click="showComments"></v-btn>
            <broadcast-modal v-if="checkCreationTime" :modal-option="'edit'"
              :editing-broadcast="broadcast"></broadcast-modal>
          </div>
        </template>
      </v-list-item>
    </v-card-actions>
  </v-card>
  <v-list v-if="commentActive">
    <broadcast-comments :comments="broadcast.comments"></broadcast-comments>
    <comment-input @add-comment="addComment"></comment-input>
  </v-list>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Broadcast } from '@/interfaces/broadcast';
import { getDateTime } from '@/utils/utils';
import { editBroadcast } from '@/services/collabChatApi';
import CommentInput from '../inputs/CommentInput.vue';
import BroadcastComments from '../BroadcastComments.vue';
import BroadcastModal from '../modals/BroadcastModal.vue';

const commentActive = ref(false)
const like = ref(false)
const dislike = ref(false)

const props = defineProps<{
  broadcast: Broadcast
}>()

const showComments = () => {
  commentActive.value = !commentActive.value
}

const addComment = async (commentText: string) => {
  props.broadcast.comments.push({
    id: (props.broadcast.comments.length + 1).toString(),
    username: localStorage.getItem('username') || 'Anónimo',
    text: commentText,
    createdAt: new Date(),
    likes: 0,
    dislikes: 0
  })

  try {
    await editBroadcast({
      ...props.broadcast,
      comments: props.broadcast.comments,
    })
  } catch (error) {
    alert('Error al agregar el comentario')
  }
}

const onLike = async () => {
  like.value = !like.value
  props.broadcast.likes += like.value ? 1 : -1
  if (props.broadcast.id) {
    await editBroadcast({
      ...props.broadcast,
      likes: props.broadcast.likes,
    })
  } else {
    alert('Error al editar la difusión')
  }
}
const onDislike = async () => {
  dislike.value = !dislike.value
  props.broadcast.dislikes += dislike.value ? 1 : -1
  if (props.broadcast.id) {
    await editBroadcast({
      ...props.broadcast,
      likes: props.broadcast.likes,
    })
  } else {
    alert('Error al editar la difusión')
  }
}

const checkCreationTime = new Date().getTime() - new Date(props.broadcast.createdAt).getTime() < 3600000

</script>

<style scoped>
.comment-author {
  font-size: 0.9rem;
}
</style>