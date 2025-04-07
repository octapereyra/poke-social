<template>
  <v-card v-if="pokemonDetails" :key="pokemonId" variant="elevated" rounded="xl">
    <v-img :src="pokemonDetails.sprite" height="200"></v-img>
    <v-card-title>{{ capitalize(pokemonDetails.name) }}</v-card-title>
    <v-card-actions>
      <v-btn color="primary" :prepend-icon="like ? 'mdi-heart' : 'mdi-heart-outline'" @click="onLike()"
        class="like-btn">{{ likesAmount }}</v-btn>
      <comments-modal btn-color="primary" :btn-variant="undefined" :mock-id="mockId" />
      <broadcast-modal :pokemon-detail="pokemonDetails" />
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type { PokemonDetails } from '@/interfaces/pokemon'
import { onMounted, ref } from 'vue'
import CommentsModal from './CommentsModal.vue';
import BroadcastModal from './BroadcastModal.vue';
import { getLikeByUser, getLikesByPokeId, setPokemonLike } from '@/services/likeApi';
import { getPokemon } from '@/services/pokeApi';

const props = defineProps({
  pokemonId: {
    type: Number,
    required: true
  },
  mockId: {
    type: String,
    required: true
  }
})
const pokemonDetails = ref<PokemonDetails>()
const like = ref(false)
const likesAmount = ref(0)

onMounted(async () => {
  pokemonDetails.value = await getPokemon(props.pokemonId)

  const user = localStorage.getItem('username') || 'Anónimo'
  like.value = await getLikeByUser(props.pokemonId, user)
  likesAmount.value = await getLikesByPokeId(props.pokemonId)
})

const onLike = async () => {
  like.value = !like.value
  likesAmount.value += like.value ? 1 : -1
  await setPokemonLike(props.mockId, like.value)
}

const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

</script>

<style scoped></style>