<template>
  <v-footer class="text-center d-flex flex-column ga-2 py-4" color="blue-grey-lighten-4">
    <div class="d-flex ga-3">
      <v-btn v-for="icon in icons" :key="icon" :icon="icon" density="comfortable" variant="text"></v-btn>
    </div>

    <v-divider class="my-2" thickness="2" width="50"></v-divider>

    <div>
      {{ new Date().getFullYear() }} — <strong>Octavio Pereyra</strong>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
const icons = [
  'mdi-facebook',
  'mdi-twitter',
  'mdi-linkedin',
  'mdi-instagram',
]
</script>