<template>
  <Layout>
    <Sidebar></Sidebar>
    <v-main>
      <v-container>
        <h1 class="text-center">Difusiones</h1>
        <p class="text-center">Explora las difusiones de los usuarios del sitio</p>
      </v-container>
      <v-container>
        <broadcast-card v-for="bc in broadcasts" :broadcast="bc"></broadcast-card>
      </v-container>
    </v-main>
  </Layout>
</template>

<script setup lang="ts">
import Layout from './Layout.vue';
import Sidebar from '@/components/Sidebar.vue';
import BroadcastCard from '@/components/BroadcastCard.vue';
import { onMounted, ref } from 'vue';
import type { Broadcast } from '@/interfaces/broadcast';
import { getBroadcasts } from '@/services/collabChatApi';

const broadcasts = ref<Broadcast[]>([])

onMounted(async () => {
  try {
    broadcasts.value = (await getBroadcasts())
  } catch (error) {
    alert('Error al cargar las difusiones')
  }
})


</script>

<style scoped></style>