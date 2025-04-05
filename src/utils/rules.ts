const rules = {
  required: (value: string) => !!value || 'Este campo es requerido',
  max: (value: string) => value.length <= 500 || 'Máximo de 500 caracteres',
  usernameValidation: (v: string) => !!v || 'El nombre de usuario es requerido',
  avatarValidation: (v: string) => !!v || 'El avatar es requerido',
}

export default rules
