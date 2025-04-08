<template>
  <v-dialog v-model="dialog" max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn color="primary" icon="mdi-share-variant" class="share-btn" v-bind="activatorProps"></v-btn>
    </template>
    <v-card prepend-icon="mdi-share-variant" title="Nueva difusión">
      <v-card-text>
        <v-text-field v-model="broadcast.title" :rules="[rules.required]" label="Título"></v-text-field>
        <v-textarea v-model="broadcast.description" :rules="[rules.required, rules.max]"
          label="Descripción"></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text="Cancelar" variant="plain" @click="dialog = false"></v-btn>
        <v-btn color="primary" text="Compartir" variant="tonal" @click="onSubmit"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { Broadcast } from '@/interfaces/broadcast';
import type { PokemonDetails } from '@/interfaces/pokemon';
import rules from '@/utils/rules';
import router from '@/router/router';
import { ref, shallowRef } from 'vue';
import { setBroadcast } from '@/services/collabChatApi';
const dialog = shallowRef(false);

const props = defineProps<{
  pokemonDetail: PokemonDetails
}>();
const broadcast = ref();

broadcast.value = {
  title: '',
  description: '',
}

const onSubmit = async () => {
  if (!broadcast.value.title || !broadcast.value.description) return;
  const newBroadcast: Broadcast = {
    title: `Difusión sobre ${props.pokemonDetail.name} - ${broadcast.value.title}`,
    description: broadcast.value.description,
    pokemonId: props.pokemonDetail.id,
    username: localStorage.getItem('username') || 'Anónimo',
    createdAt: new Date(),
    likes: 0,
    dislikes: 0,
    comments: [],
  }

  broadcast.value = {
    title: '',
    description: '',
  }
  dialog.value = false;

  try {
    await setBroadcast(newBroadcast);
  } catch (error) {
    alert('Error al crear la difusión');
    return;
  }
  router.push('/broadcasts');
}

</script>

<style scoped></style>