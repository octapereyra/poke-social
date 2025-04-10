<template>
  <v-list-item>
    <v-text-field v-model="newComment" :rules="[rules.required, rules.max]"
      label="Escribe un comentario"></v-text-field>
    <template #append>
      <v-btn icon="mdi-send-variant-outline" color="primary" class="ml-3 mb-3" @click="addComment"></v-btn>
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
import rules from '@/utils/rules';
import { ref } from 'vue';

const emit = defineEmits(['addComment'])

const newComment = ref('')

const addComment = () => {
  if (newComment.value.trim() === '') {
    return
  }
  emit('addComment', newComment.value)
  newComment.value = ''
}



</script>

<style scoped></style>