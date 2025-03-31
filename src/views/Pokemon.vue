<template>
  <Layout>
    <v-container>
      <pokemon-card :pokemon="pokemon"></pokemon-card>
    </v-container>
  </Layout>
</template>

<script setup lang="ts">
import type { PokemonDetails } from '@/interfaces/pokemon';
import Layout from './Layout.vue';
import { onMounted, ref } from 'vue';
import { getPokemon } from '@/services/pokemonApi';

const props = defineProps<{ id: string }>()
const pokemon = ref({} as PokemonDetails | null)

onMounted(async () => {
  try {
    pokemon.value = await getPokemon(props.id)
  }
  catch {
    console.log('Error al cargar el pokemon')
  }
})

</script>

<style scoped></style>