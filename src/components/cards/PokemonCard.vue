<template>
  <v-card v-if="pokemonDetails" :key="mock.pokemonId" variant="elevated" elevation="3" rounded="xl">
    <v-img :src="pokemonDetails.sprite" height="200"></v-img>
    <v-card-title>{{ capitalize(pokemonDetails.name) }}</v-card-title>
    <v-card-actions>
      <v-btn color="primary" :prepend-icon="like ? 'mdi-heart' : 'mdi-heart-outline'" @click="onLike()"
        class="like-btn">{{ likesAmount }}</v-btn>
      <comments-modal btn-color="primary" :btn-variant="undefined" :mock-id="mock.id" :comments="mock.comments" />
      <broadcast-modal :modal-option="'create'" :pokemon-detail="pokemonDetails" />
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { PokemonDetails } from '@/interfaces/pokemon'
import CommentsModal from '../modals/CommentsModal.vue';
import BroadcastModal from '../modals/BroadcastModal.vue';
import { getLikeByUser, getLikesByPokeId, setPokemonLike } from '@/services/likeApi';
import { getPokemon } from '@/services/pokeApi';
import type { Mock } from '@/interfaces/mock';

const props = defineProps<
  { mock: Mock }
>()
const pokemonDetails = ref<PokemonDetails>()
const like = ref(false)
const likesAmount = ref(0)

onMounted(async () => {
  try {
    pokemonDetails.value = await getPokemon(props.mock.pokemonId)

    const user = localStorage.getItem('username') || 'Anónimo'
    like.value = await getLikeByUser(props.mock.pokemonId, user)
    likesAmount.value = await getLikesByPokeId(props.mock.pokemonId)
  }
  catch (error) {
    alert('Error al cargar los detalles del Pokémon')
  }
})

const onLike = async () => {
  like.value = !like.value
  likesAmount.value += like.value ? 1 : -1
  await setPokemonLike(props.mock.id, like.value)
}

const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

</script>

<style scoped></style>