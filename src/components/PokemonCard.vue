<template>
  <v-card :key="pokemon.name" class="pokemon-card">
    <v-img :src="pokemon.sprite" height="200"></v-img>
    <v-card-title>{{ pokemon.name }}</v-card-title>
    <v-card-actions>
      <v-btn color="primary" :prepend-icon="like ? 'mdi-heart' : 'mdi-heart-outline'" @click="onLike(pokemon.name)"
        class="like-btn">{{ likesAmount }}</v-btn>
      <v-btn color="primary" icon="mdi-message-text-outline" class="comment-btn" @click="onComment(pokemon.id)"></v-btn>
      <v-btn color="primary" icon="mdi-share-variant" class="share-btn"></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getLikes, getLikeByUser } from '@/services/likeApi'
import type { PokemonDetails } from '@/interfaces/pokemon'
import router from '@/router/router';

const props = defineProps<{ pokemon: PokemonDetails }>()
const like = ref(false)
const likesAmount = ref(0)

onMounted(async () => {
  const user = localStorage.getItem('username')
  //like del user actual
  //like.value = await getLikeByUser(props.pokemon.id, user)
  //cantidad de likes 
  //likesAmount.value = await getLikes(props.pokemon.id)
})

const onLike = (name: string) => {
  like.value = !like.value
  likesAmount.value += like.value ? 1 : -1
}

const onComment = (id: string) => {
  router.push({ name: 'PokemonDetails', params: { id } })
}


</script>

<style scoped></style>