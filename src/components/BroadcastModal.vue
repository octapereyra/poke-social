<template>
  <v-dialog v-model="dialog" max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn color="primary" icon="mdi-share-variant" class="share-btn" v-bind="activatorProps"></v-btn>
    </template>
    <v-card prepend-icon="mdi-share-variant" title="Nueva difusión">
      <v-card-text>
        <v-text-field v-model="broadcast.title" label="Título"></v-text-field>
        <v-textarea v-model="broadcast.description" label="Descripción"></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text="Cancelar" variant="plain" @click="dialog = false"></v-btn>
        <v-btn color="primary" text="Compartir" variant="tonal" @click="dialog = false"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue';
const dialog = shallowRef(false);

const broadcast = ref();

broadcast.value = {
  title: '',
  description: '',
}

</script>

<style scoped></style>