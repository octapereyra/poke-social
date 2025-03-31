<template>
  <v-navigation-drawer>
    <v-list>
      <v-list-item v-for="item in menuItems" :key="item.title" link>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
const menuItems = [
  { title: 'Pokemones', icon: 'mdi-home' },
  { title: 'Difusiones', icon: 'mdi-information' },
]
</script>

<style scoped></style>