<template>
  <v-dialog max-width="500">
    <template #activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" :color="btnColor" :variant="btnVariant" icon="mdi-message-text-outline"></v-btn>
    </template>

    <template #default="{ isActive }">
      <v-card>
        <v-card-title>Comentarios</v-card-title>
        <v-card-text>
          <v-list lines="two">
            <v-list-item v-for="comment in comments" :key="comment.id" :title="comment.username" variant="elevated"
              base-color="blue-lighten-4" rounded="xl" class="my-1">
              <template #prepend>
                <v-avatar>
                  <v-img :src="comment.avatar"></v-img>
                </v-avatar>
              </template>
              <template #append v-if="comment.username === username">
                <v-btn icon="mdi-pencil-outline" variant="elevated" size="small" @click="onEdit(comment.id)"
                  class="mx-1"></v-btn>
                <v-btn icon="mdi-trash-can-outline" variant="elevated" size="small"
                  @click="onDelete(comment.id)"></v-btn>
              </template>
              <v-card-text>{{ comment.text }}</v-card-text>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-text-field v-model="newComment" :rules="[rules.required, rules.max]"
            label="Escribe un comentario"></v-text-field>
          <v-btn icon="mdi-send-variant-outline" color="primary" @click="addComment"></v-btn>
        </v-card-actions>
      </v-card>

    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import type Commentary from '@/interfaces/commentary'
import { setPokemonComment } from '@/services/commentApi';
import rules from '@/utils/rules'
import { onMounted, ref } from 'vue'

const props = defineProps<{
  btnColor: string,
  btnVariant: "flat" | "tonal" | "elevated" | undefined,
  mockId: string,
  comments: Commentary[],
}>()

const comments = ref<Commentary[]>([])
const newComment = ref()
const username = localStorage.getItem('username') || 'Anónimo'

onMounted(() => {
  comments.value = props.comments
})

const addComment = async () => {
  if (!newComment.value) return
  comments.value.push({
    id: comments.value.length + 1,
    avatar: localStorage.getItem('avatar') || 'https://cdn.vuetifyjs.com/images/john.jpg',
    username: username,
    text: newComment.value,
  })
  await setPokemonComment(props.mockId, comments.value)
  newComment.value = ''
}

const onEdit = async (id: number) => {
  const index = comments.value.findIndex((comment) => comment.id === id)
  newComment.value = comments.value[index].text
  comments.value.splice(index, 1)
}

const onDelete = async (id: number) => {
  const index = comments.value.findIndex((comment) => comment.id === id)
  comments.value.splice(index, 1)
  try {
    await setPokemonComment(props.mockId, comments.value)
  }
  catch (error) {
    alert('Error al eliminar el comentario')
  }
}


</script>

<style scoped></style>