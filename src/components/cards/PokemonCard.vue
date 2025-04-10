<template>
  <v-card v-if="pokemonDetails" :key="mock.pokemonId" variant="elevated" elevation="3" rounded="xl"
    :class="['pokemon-card', `pokemon-card-${pokemonColor}`]">
    <v-img :src="pokemonDetails.sprite" height="200"></v-img>
    <v-card-title class="card-title">{{ capitalize(pokemonDetails.name) }}</v-card-title>
    <v-card-actions>
      <v-btn color="primary" :prepend-icon="like ? 'mdi-heart' : 'mdi-heart-outline'" @click="onLike()"
        class="like-btn">{{ likesAmount }}</v-btn>
      <comments-modal btn-color="primary" :btn-variant="undefined" :mock-id="mock.id" :comments="mock.comments" />
      <broadcast-modal :modal-option="'create'" :pokemon-detail="pokemonDetails" />
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { PokemonDetails } from '@/interfaces/pokemon'
import CommentsModal from '../modals/CommentsModal.vue';
import BroadcastModal from '../modals/BroadcastModal.vue';
import { getLikeByUser, getLikesByPokeId, setPokemonLike } from '@/services/likeApi';
import { getPokemon } from '@/services/pokeApi';
import type { Mock } from '@/interfaces/mock';
import { getColor } from '@/utils/pokemons';

const props = defineProps<
  { mock: Mock }
>()
const pokemonDetails = ref<PokemonDetails>()
const like = ref(false)
const likesAmount = ref(0)
const user = localStorage.getItem('username') || 'Anónimo'

onMounted(async () => {
  try {
    pokemonDetails.value = await getPokemon(props.mock.pokemonId)

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
  await setPokemonLike(props.mock.id, like.value, user)
}

const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const pokemonColor = computed(() => {
  if (pokemonDetails.value) {
    return getColor(pokemonDetails.value.type[0])
  }
  return ''
})

</script>

<style scoped>
.card-title {
  user-select: none;
}

.pokemon-card:hover {
  transform: scale(1.05);
  transition: transform 0.2s;
}

.pokemon-card-green:hover {
  background-color: #a5d6a7;
}

.pokemon-card-red:hover {
  background-color: #ef9a9a;
}

.pokemon-card-blue:hover {
  background-color: #90caf9;
}

.pokemon-card-grey:hover {
  background-color: #e0e0e0;
}

.pokemon-card-light-green:hover {
  background-color: #c5e1a5;
}
</style>