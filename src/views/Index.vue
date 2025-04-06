<template>
  <Layout>
    <Sidebar></Sidebar>
    <v-main>
      <v-container>
        <h1 class="text-center">Bienvenido a PokeSocial </h1>
        <p class="text-center">Aquí podrás ver, dar like y comentar tus pokemones favoritos</p>
      </v-container>
      <v-container class="card-container">
        <pokemon-card v-for="p in pokemon" :key="p.id" :pokemon="p"
          :is-mocked="mockedPokemonsId.includes(p.id)"></pokemon-card>
      </v-container>
    </v-main>
  </Layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getPokemons } from '@/services/pokeApi'
import { getMockPokemonsByUser } from '@/services/mockApi';
import Layout from './Layout.vue';
import pokemonCard from '@/components/PokemonCard.vue'
import Sidebar from '@/components/Sidebar.vue';
import type { PokemonDetails } from '@/interfaces/pokemon';

const pokemon = ref([] as PokemonDetails[])
const mockedPokemonsId = ref([] as number[])

onMounted(async () => {
  pokemon.value = await getPokemons()
  mockedPokemonsId.value = await getMockPokemonsByUser(localStorage.getItem('username') || '')
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