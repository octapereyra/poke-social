<template>
  <Layout>
    <v-main>
      <v-container>
        <h1 class="text-center">Difusiones</h1>
        <p class="text-center">Explora las difusiones de los usuarios del sitio</p>
      </v-container>
      <v-container>
        <broadcast-card v-for="bc in broadcasts" :broadcast="bc"></broadcast-card>
        <v-alert v-if="broadcasts.length === 0 && !loading" text="No hay difusiones disponibles" title="Información"
          type="info" variant="tonal"></v-alert>
      </v-container>
    </v-main>
  </Layout>
</template>

<script setup lang="ts">
import Layout from './Layout.vue';
import BroadcastCard from '@/components/cards/BroadcastCard.vue';
import { onMounted, ref } from 'vue';
import type { Broadcast } from '@/interfaces/broadcast';
import { getBroadcasts } from '@/services/collabChatApi';

const broadcasts = ref<Broadcast[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    broadcasts.value = await getBroadcasts()
  } catch (error) {
    if (error instanceof Error) {
      broadcasts.value = []
    } else {
      alert('Error al cargar las difusiones')
    }
  }
  finally {
    loading.value = false
  }
})


</script>

<style scoped></style>