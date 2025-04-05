<template>
  <v-card :key="pokemon.name" variant="elevated" rounded="xl">
    <v-img :src="pokemon.sprite" height="200"></v-img>
    <v-card-title>{{ capitalize(pokemon.name) }}</v-card-title>
    <v-card-actions>
      <v-btn color="primary" :prepend-icon="like ? 'mdi-heart' : 'mdi-heart-outline'" @click="onLike(pokemon.name)"
        class="like-btn">{{ likesAmount }}</v-btn>
      <comments-modal btn-color="primary" :btn-variant="undefined" />
      <broadcast-modal :pokemon-detail="pokemon" />
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { PokemonDetails } from '@/interfaces/pokemon'
import CommentsModal from './CommentsModal.vue';
import BroadcastModal from './BroadcastModal.vue';
import { getLikeByUser, getLikesByPokeId, setPokemonLike } from '@/services/likeApi';

const props = defineProps<{ pokemon: PokemonDetails }>()
const like = ref(false)
const likesAmount = ref(0)

onMounted(async () => {
  const user = localStorage.getItem('username') || 'Anónimo'
  //like del user actual
  like.value = await getLikeByUser(props.pokemon.id, user)
  //cantidad de likes 
  likesAmount.value = await getLikesByPokeId(props.pokemon.id)
})

const onLike = async (name: string) => {
  like.value = !like.value
  likesAmount.value += like.value ? 1 : -1

  await setPokemonLike(props.pokemon.id, like.value)
}

const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}


</script>

<style scoped></style>