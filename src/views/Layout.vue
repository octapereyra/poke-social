<template>
  <v-app>
    <!-- Barra de navegación superior -->
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>PokeSocial</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text>
        {{ user }}
      </v-btn>
      <v-btn icon @click="logout">
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>
    <slot></slot>
    <v-footer class="d-flex align-center justify-center ga-2 flex-wrap flex-grow-1 py-3" color="surface-light">
      <v-btn v-for="link in links" :key="link" :text="link" variant="text" rounded></v-btn>

      <div class="flex-1-0-100 text-center mt-2">
        {{ new Date().getFullYear() }} — <strong>Octavio Pereyra</strong>
      </div>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import router from '@/router/router'

const links = [
  'Sobre mí',
  'Contactame',
]

const user = localStorage.getItem('username')

const logout = () => {
  localStorage.removeItem('username')
  localStorage.removeItem('avatar')
  router.push('/login')
}
</script>

<style scoped></style>