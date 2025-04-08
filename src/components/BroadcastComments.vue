<template>
  <v-list-item v-for="comment in comments" :key="comment.id">
    <v-list-item-title>{{ comment.username }}</v-list-item-title>
    <v-list-item-subtitle>{{ comment.text }}</v-list-item-subtitle>
    <template #append>
      <v-btn prepend-icon="mdi-thumb-up-outline" variant="flat">{{ comment.likes }}</v-btn>
      <v-btn prepend-icon="mdi-thumb-down-outline" variant="flat">{{ comment.dislikes }}</v-btn>
      <comments-modal btn-color="" btn-variant="flat" :comments="[]" :mock-id="'1'"></comments-modal>
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
import type { BroadcastComment } from '@/interfaces/broadcast';
import CommentsModal from './CommentsModal.vue';


const props = defineProps<{
  comments: BroadcastComment[]
}>()

</script>

<style scoped></style>