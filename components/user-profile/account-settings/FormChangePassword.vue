<template>
  <v-form v-model="form.valid" ref="form">
       
        <div class="py-8 px-2 px-md-16">

            <h2 class="text-center text-h5 title--text">
                Cambiar contraseña
            </h2>

            <v-divider class="my-3"></v-divider>

            <v-text-field
            label="Introduce tu contraseña actual"
            outlined
            dense
            v-model="user.oldPassword"
            :rules="[form.passwordRequired]"
            required
            ></v-text-field>
         
            <v-text-field
            label="Introduce la nueva contraseña"
            outlined
            dense 
            :append-icon="form.show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="form.show ? 'text' : 'password'"
            @click:append="form.show = !form.show"
            v-model="user.newPassword"
            :rules="[form.passwordRequired, form.passwordPattern]"
            required
            ></v-text-field>

            <v-text-field
              label="Confirma la nueva contraseña"
              outlined
              dense              
              :type="form.show ? 'text' : 'password'"
              v-model="user.confirmNewPassword"
              :rules="[form.passwordRequired, form.passwordMatch]"
              required
            ></v-text-field>
            
            <div class="text-right mt-2">
              <v-btn
                small
                text
                color="error"
                class="mr-0 mr-md-4 text-none"
                @click="$emit('update:show', false)"
                >Cancelar</v-btn
              >
              <v-btn
                small
                :disabled="!form.valid"
                @click="updatePassword"
                color="accent"
                class="mr-0 mr-md-4 text-none"
                >Guardar cambios</v-btn
              >
            </div>
        </div>
  </v-form>
</template>
<script>

import { mapActions } from "vuex";

export default {

  props: ["show","loading"],

  data() {
    return{
      modal: false,
      form: {
        show: false,
        valid: false,        
        disabled: false,
        passwordRequired: (val) => !!val || "Contraseña obligatoria",
        passwordPattern: (val) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&,.-_;(){}¡<>])([A-Za-z\d$@$!%*?&,.-_;(){}¡<>]|[^ ]){8,15}$/.test(
            val
          ) ||
          "Coloque al menos un numero, una letra minúscula, mayúscula, 1 caracter especial y sin espacios en blanco.",
         passwordMatch: (v) =>
          v === this.user.newPassword || "Las contraseñas no coinciden",
      },

      user: {
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      },
    };
  },

  methods: {
    ...mapActions(["showNotification"]),

    async updatePassword() {
      try {
        this.loadingForm(true);
        await this.$axios.$put(`changepassword/${this.$auth.user._id}`,this.user);
        this.showNotification({
          active: true,
          type: "accent",
          msg: 'Contraseña actualizada :)',
        });      
        this.clearFields();  
        this.$emit('update:show', false);
      } catch (err) {               
        const msg = err.response
        ? err.response.data.message
        : "Ha ocurrido un error";
        this.showNotification({ active:  true, type: "error", msg });
      }finally{
        this.loadingForm(false); 
      }
    },

    loadingForm(value) {
      this.$emit('update:loading', value);      
    },

    clearFields(){
      this.user.oldPassword = '';
      this.user.newPassword = '';
      this.user.confirmNewPassword = '';
    }
  },
};
</script>