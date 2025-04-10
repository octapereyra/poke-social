const rules = {
  required: (value: string) => !!value || 'Este campo es requerido',
  max: (value: string) => value.length <= 500 || 'Máximo de 500 caracteres',
  usernameValidation: (v: string) => !!v || 'El nombre de usuario es requerido',
  avatarValidation: (v: string) =>
    v.endsWith('.png') || v.endsWith('.jpg') || 'El avatar debe ser una imagen PNG o JPG',
}

export default rules
