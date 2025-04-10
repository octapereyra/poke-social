<template>
  <v-dialog v-model="dialog" max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-if="modalOption === 'create'" color="primary" icon="mdi-share-variant" class="share-btn"
        v-bind="activatorProps"></v-btn>
      <v-btn v-if="modalOption === 'edit'" icon="mdi-pencil-outline" class="share-btn" v-bind="activatorProps"></v-btn>
    </template>
    <v-card v-if="modalOption === 'create'" prepend-icon="mdi-share-variant" title="Nueva difusión">
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
    <v-card v-if="modalOption === 'edit' && editingBroadcast" prepend-icon="mdi-pencil-outline" title="Editar difusión">
      <v-card-text>
        <v-text-field v-model="editingBroadcast.title" :rules="[rules.required]" label="Título"></v-text-field>
        <v-textarea v-model="editingBroadcast.description" :rules="[rules.required, rules.max]"
          label="Descripción"></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text="Cancelar" variant="plain" @click="dialog = false"></v-btn>
        <v-btn color="primary" text="Editar" variant="tonal" @click="onEdit"></v-btn>
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
import { editBroadcast, setBroadcast } from '@/services/collabChatApi';
const dialog = shallowRef(false);

const props = defineProps<{
  modalOption: 'create' | 'edit',
  pokemonDetail?: PokemonDetails,
  editingBroadcast?: Broadcast
}>();

const broadcast = ref();

broadcast.value = {
  title: '',
  description: '',
}

const onSubmit = async () => {
  if (!broadcast.value.title || !broadcast.value.description) return;
  const newBroadcast: Broadcast = {
    app: 'ojpapp',
    title: `Difusión sobre ${props.pokemonDetail?.name || 'Pokémon desconocido'} - ${broadcast.value.title}`,
    description: broadcast.value.description,
    pokemonId: props.pokemonDetail?.id || 0,
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

const onEdit = async () => {
  if (!props.editingBroadcast) return;
  if (!props.editingBroadcast.title || !props.editingBroadcast.description) return;
  const editedBroadcast: Broadcast = {
    ...props.editingBroadcast,
    title: `${props.editingBroadcast.title}`,
    description: props.editingBroadcast.description,
  }
  dialog.value = false;
  try {
    await editBroadcast(editedBroadcast);
  } catch (error) {
    alert('Error al editar la difusión');
    return;
  }
}


</script>

<style scoped></style>