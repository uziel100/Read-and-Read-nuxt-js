<template>
  <v-dialog @input="$emit('update:show', false)" :value="show" max-width="600" min-width="290">
    <v-card>
      <v-card-title class="mt-3 mb-5">
        Seleciona un método para restablecer tu contraseña
      </v-card-title>

      <v-card-text class="d-flex justify-space-between">
        <v-card @click="$emit('showModal', 'email')" elevation="0" class="pa-3 mr-3 text-center hover-pointer">
          <img                                
            width="100%"
            src="../../assets/img/unirse/mail.svg"
            alt="Recuperar contraseña con algun correo electronico"
          />
          <p class="mt-2">Correo electrónico</p>
        </v-card>
        <v-card @click="$emit('showModal', 'msgText')"   elevation="0"  class="pa-3 mr-3 text-center hover-pointer">
          <img            
            width="100%"
            src="../../assets/img/unirse/phone-number-icon.svg"
            alt="Recuperar contraseña por mensaje de texto"
          />
          <p class="mt-2">Mensaje de texto</p>
        </v-card>
        <v-card @click="$emit('showModal', 'question')"   elevation="0" class="pa-3 text-center hover-pointer">
          <img
            width="100%"
            src="../../assets/img/unirse/question-secret.svg"
            alt="Recuperar contraseña por pregunta secreta"
          />
          <p class="mt-2">Pregunta secreta</p>
        </v-card>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" outlined text @click="$emit('update:show', false)">
          Cerrar    
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
    props: ['show'],
    methods:{
        input( value ){
         console.log('input: ',value)
        }
    }
};
</script>

<style>
</style>