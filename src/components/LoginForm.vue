<template>
  <v-container class="fill-height justify-center">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-8">
          <v-card-title class="text-h5 text-center mb-6">
            Iniciar Sesión
          </v-card-title>
          <v-form @submit.prevent="login" ref="form">
            <v-text-field v-model="username" label="Nombre de usuario" type="text" :rules="[rules.usernameValidation]"
              required variant="outlined" class="mb-4"></v-text-field>
            <v-text-field v-model="avatar" label="Avatar" type="text" :rules="[rules.avatarValidation]" required
              variant="outlined" class="mb-6"></v-text-field>
            <v-btn type="submit" color="primary" block size="large" :disabled="loading">
              Ingresar
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import router from '@/router/router'
import { loadPokemons } from '@/services/mockApi'
import rules from '@/utils/rules'
import { ref } from 'vue'
import type { VForm } from 'vuetify/components'

const username = ref('')
const avatar = ref('')
const loading = ref(false)
const form = ref<typeof VForm | null>(null)

const login = async () => {
  if (!form.value) return

  const { valid } = await form.value.validate()

  if (valid) {
    loading.value = true
    try {
      localStorage.setItem('username', username.value)
      localStorage.setItem('avatar', avatar.value)
      await loadPokemons(username.value)
      router.push('/')

    } finally {
      loading.value = false
    }
  }
}
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}
</style>