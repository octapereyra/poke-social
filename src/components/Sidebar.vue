<template>
  <v-navigation-drawer>
    <v-list>
      <v-list-item v-for="item in menuItems" :key="item.title" link :to="item.to">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
const menuItems = [
  { title: 'Pokemones', icon: 'mdi-home', to: '/' },
  { title: 'Difusiones', icon: 'mdi-information', to: '/broadcasts' },
]
</script>

<style scoped></style>