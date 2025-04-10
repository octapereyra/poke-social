<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>PokeSocial</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text>
        <template #prepend>
          <v-avatar size="32" rounded="xl" color="grey lighten-2" :image="avatar || ''">
          </v-avatar>
        </template>
        {{ user }}
      </v-btn>
      <v-btn :text="$vuetify.display.mobile ? '' : 'Cerrar sesión'" @click="logout">
        <template #prepend>
          <v-icon>mdi-exit-to-app</v-icon>
        </template>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'bottom' : undefined" temporary>
      <v-list>
        <v-list-item v-for="item in menuItems" :key="item.title" link :to="item.to" rounded>
          <template #prepend>
            <v-icon>{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <slot></slot>
    <Footer></Footer>
  </v-app>
</template>

<script setup lang="ts">
import router from '@/router/router'
import Footer from '@/components/Footer.vue'
import { ref } from 'vue'

const menuItems = [
  { title: 'Pokemones', icon: 'mdi-pokeball', to: '/' },
  { title: 'Difusiones', icon: 'mdi-share-variant', to: '/broadcasts' },
]

const drawer = ref(false)

const user = localStorage.getItem('username')
const avatar = localStorage.getItem('avatar')

const logout = () => {
  localStorage.removeItem('username')
  localStorage.removeItem('avatar')
  router.replace('/login')
}
</script>

<style scoped></style>