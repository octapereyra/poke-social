<template>
  <Layout>
    <Sidebar></Sidebar>
    <v-main>
      <v-container>
        <h1 class="text-center">Difusiones</h1>
        <p class="text-center">Explora las difusiones de los usuarios del sitio</p>
      </v-container>
      <v-container class="card-container">
        <broadcast-card></broadcast-card>
      </v-container>
    </v-main>
  </Layout>
</template>

<script setup lang="ts">
import Layout from './Layout.vue';
import Sidebar from '@/components/Sidebar.vue';
import BroadcastCard from '@/components/BroadcastCard.vue';



</script>

<style scoped></style>