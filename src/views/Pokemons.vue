<template>
  <Layout>
    <v-main>
      <v-container>
        <h1 class="text-center">Bienvenido a PokeSocial </h1>
        <p class="text-center">Aquí podrás ver, dar like y comentar tus pokemones favoritos</p>
      </v-container>
      <v-container class="card-container">
        <pokemon-card v-for="mp in mockPokemons" :key="mp.id" :mock="mp"></pokemon-card>
      </v-container>
    </v-main>
  </Layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getMockPokemons } from '@/services/mockApi';
import Layout from './Layout.vue';
import PokemonCard from '@/components/cards/PokemonCard.vue';
import type { Mock } from '@/interfaces/mock';

const mockPokemons = ref<Mock[]>([])

onMounted(async () => {
  const username = localStorage.getItem('username') || 'Anónimo'
  try {
    mockPokemons.value = await getMockPokemons()
  }
  catch (error) {
    alert('Error al cargar los pokemones')
  }
}
)

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