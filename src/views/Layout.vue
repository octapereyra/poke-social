<template>
  <v-app>
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
  </v-app>
</template>

<script setup lang="ts">
import router from '@/router/router'

const user = localStorage.getItem('username')

const logout = () => {
  localStorage.removeItem('username')
  localStorage.removeItem('avatar')
  router.replace('/login')
}
</script>

<style scoped></style>