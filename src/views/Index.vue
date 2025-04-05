<template>
  <Layout>
    <Sidebar></Sidebar>
    <v-main>
      <v-container>
        <h1 class="text-center">Bienvenido a PokeSocial </h1>
        <p class="text-center">Aquí podrás ver, dar like y comentar tus pokemones favoritos</p>
      </v-container>
      <v-container class="card-container">
        <pokemon-card v-for="p in pokemon" :key="p.id" :pokemon="p"></pokemon-card>
      </v-container>
    </v-main>
  </Layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Layout from './Layout.vue';
import { getPokemons } from '@/services/pokeApi'
import type { PokemonDetails } from '@/interfaces/pokemon';
import pokemonCard from '@/components/PokemonCard.vue'
import Sidebar from '@/components/Sidebar.vue';

const pokemon = ref([] as PokemonDetails[])

onMounted(async () => {
  getPokemons().then((data: PokemonDetails[]) => {
    pokemon.value = data
  })

})
</script>

<style scoped>
.like-btn {
  margin-right: 10px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}
</style>