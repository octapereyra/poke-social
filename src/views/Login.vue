<template>
  <v-container fluid class="logo-container">
    <v-img src="/pokemon.png" max-height="400" max-width="300"></v-img>
  </v-container>
  <login-form />
</template>

<script setup lang="ts">
import LoginForm from '@/components/forms/LoginForm.vue'
</script>

<style scoped>
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}
</style>