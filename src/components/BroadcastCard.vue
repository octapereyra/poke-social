<template>
  <v-card border="md" rounded="xl">
    <v-card-title>{{ broadcast.title }}
    </v-card-title>
    <v-card-text>{{ broadcast.description }}</v-card-text>
    <v-card-actions>
      <v-list-item class="w-100">
        <v-list-item-title>Difundido por {{ broadcast.username }}</v-list-item-title>
        <v-list-item-subtitle>{{ getDateTime(broadcast.createdAt) }}</v-list-item-subtitle>
        <template #append>
          <div class="justify-self-end">
            <v-btn prepend-icon="mdi-thumb-up-outline" class="like-btn">{{ broadcast.likes }}</v-btn>
            <v-btn prepend-icon="mdi-thumb-down-outline" class="like-btn">{{ broadcast.dislikes }}</v-btn>
            <v-btn icon="mdi-message-text-outline" @click="showComments"></v-btn>
            <v-btn v-if="checkCreationTime" icon="mdi-pencil-outline"></v-btn>
          </div>
        </template>
      </v-list-item>
    </v-card-actions>
  </v-card>
  <v-list v-if="commentActive">
    <v-list-item v-for="comment in broadcast.comments" :key="comment.id">
      <broadcast-comment :comment="comment"></broadcast-comment>
    </v-list-item>
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
import type Broadcast from '@/interfaces/broadcast';
import BroadcastComment from './BroadcastComment.vue';

const commentActive = ref(false)
const newComment = ref('')

const rules = {
  required: (value: string) => !!value || 'Este campo es requerido',
  max: (value: string) => value.length <= 500 || 'Máximo de 500 caracteres',
}
const broadcast: Broadcast = {
  id: "1",
  title: 'Charizard',
  description: 'Charizard es un Pokémon de tipo fuego/volador introducido en la primera generación. Es la evolución de Charmeleon. Es la forma evolucionada de Charmander. Es la mascota de la franquicia Pokémon, y es uno de los Pokémon más conocidos en la cultura popular.',
  pokemonId: 6,
  username: 'horacio',
  createdAt: new Date(),
  likes: 0,
  dislikes: 0,
  comments: [
    {
      id: "1",
      username: 'Anónimo',
      text: 'Charizard es mi pokémon favorito',
      createdAt: new Date(),
      likes: 0,
      dislikes: 0
    }
  ]
}

const showComments = () => {
  commentActive.value = !commentActive.value
}

const addComment = () => {
  if (!newComment.value) return
  broadcast.comments.push({
    id: (broadcast.comments.length + 1).toString(),
    username: 'Anónimo',
    text: newComment.value,
    createdAt: new Date(),
    likes: 0,
    dislikes: 0
  })
  newComment.value = ''
}

const getDateTime = (date: Date) => {
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
}

const checkCreationTime = new Date().getTime() - broadcast.createdAt.getTime() < 3600000

</script>

<style scoped></style>