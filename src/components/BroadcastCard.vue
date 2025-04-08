<template>
  <v-card border="md" rounded="xl" class="my-4" elevation="2">
    <v-card-title>{{ broadcast.title }}
    </v-card-title>
    <v-card-text>{{ broadcast.description }}</v-card-text>
    <v-card-actions>
      <v-list-item class="w-100">
        <v-list-item-title>Difundido por {{ broadcast.username }}</v-list-item-title>
        <v-list-item-subtitle>{{ getDateTime(new Date(broadcast.createdAt)) }}</v-list-item-subtitle>
        <template #append>
          <div class="justify-self-end">
            <v-btn :prepend-icon="like ? ' mdi-thumb-up' : 'mdi-thumb-up-outline'" @click="onLike">{{ broadcast.likes
            }}</v-btn>
            <v-btn :prepend-icon="dislike ? 'mdi-thumb-down' : 'mdi-thumb-down-outline'" @click="onDislike">{{
              broadcast.dislikes }}</v-btn>
            <v-btn icon="mdi-message-text-outline" @click="showComments"></v-btn>
            <v-btn v-if="checkCreationTime" icon="mdi-pencil-outline" @click=""></v-btn>
          </div>
        </template>
      </v-list-item>
    </v-card-actions>
  </v-card>
  <v-list v-if="commentActive">
    <broadcast-comments :comments="broadcast.comments"></broadcast-comments>
    <v-list-item>
      <v-text-field v-model="newComment" :rules="[rules.required, rules.max]"
        label="Escribe un comentario"></v-text-field>
      <template #append>
        <v-btn icon="mdi-send-variant-outline" color="primary" @click="addComment"></v-btn>
      </template>
    </v-list-item>
  </v-list>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Broadcast } from '@/interfaces/broadcast';
import BroadcastComments from './BroadcastComments.vue';
import { getDateTime } from '@/utils/utils';
import rules from '@/utils/rules';

const commentActive = ref(false)
const newComment = ref('')
const like = ref(false)
const dislike = ref(false)

const props = defineProps<{
  broadcast: Broadcast
}>()

const showComments = () => {
  commentActive.value = !commentActive.value
}

const addComment = () => {
  if (!newComment.value) return
  props.broadcast.comments.push({
    id: (props.broadcast.comments.length + 1).toString(),
    username: 'Anónimo',
    text: newComment.value,
    createdAt: new Date(),
    likes: 0,
    dislikes: 0
  })
  newComment.value = ''
}

const onLike = async () => {
  like.value = !like.value
  props.broadcast.likes += like.value ? 1 : -1
  //await setPokemonLike(props.mock.id, like.value)
}
const onDislike = () => {
  dislike.value = !dislike.value
  props.broadcast.dislikes += dislike.value ? 1 : -1
  //await setPokemonLike(props.mock.id, like.value)
}



const checkCreationTime = new Date().getTime() - new Date(props.broadcast.createdAt).getTime() < 3600000

</script>

<style scoped></style>