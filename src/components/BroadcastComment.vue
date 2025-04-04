<template>
  <v-list-item-title>{{ comment.username }}</v-list-item-title>
  <v-list-item-subtitle>{{ comment.text }}</v-list-item-subtitle>
</template>

<script setup lang="ts">

const props = defineProps<{
  comment: { username: string, text: string }
}>()

</script>

<style scoped></style>