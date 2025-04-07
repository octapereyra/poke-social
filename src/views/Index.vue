<template>
  <Layout>
    <Sidebar></Sidebar>
    <v-main>
      <v-container>
        <h1 class="text-center">Bienvenido a PokeSocial </h1>
        <p class="text-center">Aquí podrás ver, dar like y comentar tus pokemones favoritos</p>
      </v-container>
      <v-container class="card-container">
        <pokemon-card v-for="mp in mockPokemons" :key="mp.id" :pokemon-id="mp.pokemonId"
          :mock-id="mp.id"></pokemon-card>
      </v-container>
    </v-main>
  </Layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getMockPokemonsByUser } from '@/services/mockApi';
import Layout from './Layout.vue';
import pokemonCard from '@/components/PokemonCard.vue'
import Sidebar from '@/components/Sidebar.vue';
import type { Mock } from '@/interfaces/mock';

const mockPokemons = ref<Mock[]>([])

onMounted(async () => {
  const username = localStorage.getItem('username') || 'Anónimo'
  mockPokemons.value = await getMockPokemonsByUser(username)
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