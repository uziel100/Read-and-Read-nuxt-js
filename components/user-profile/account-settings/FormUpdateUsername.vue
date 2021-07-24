<template>
  <v-form v-model="form.valid" ref="form">
    <div class="py-8 px-2 px-md-16">
      <h2 class="text-center text-h5 title--text">Cambiar nombre de usuario</h2>

      <v-divider class="my-8"></v-divider>

      <v-text-field
        label="Escribe tu nuevo username"
        outlined
        dense
        required
        v-model="user.username"
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
          @click="updateUsername"
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
  name: "FormUpdateUsername",
  props: ["show", "loading"],

  async created() {
    await this.init();
  },
  data() {
    return {
      modal: false,
      form: {
        show: false,
        valid: false,
      },

      user: {
        username: "",
      },
    };
  },

  methods: {
    ...mapActions(["showNotification"]),

    async init() {
      this.loadingForm(true);
      const data = await this.$axios.$get(
        `user/username/${this.$auth.user._id}`
      );
      this.user.username = data?.username? data.username : '';
      this.loadingForm(false);      
    },

    async updateUsername() {                        
        try {
            this.loadingForm(true);
            await this.$axios.$put(`user/username/${ this.$auth.user._id }`, this.user);
            const data = await this.$auth.$storage.getLocalStorage('_user'); 
            await this.$auth.$storage.setLocalStorage("_user", {...data, username: this.user.username  }, true);
            this.$auth.user.username = this.user.username;
            this.showNotification({ active: true, type: "accent", msg: 'Username actualizado :)' });
            this.$emit('update:show', false)
        } catch (error) {
            let msg = error?.response?.data?.message ? 'Este username ya esta siendo utilizado por otro usuario' : 'Ha ocurrio un error al actualizar los datos' ;        
            this.showNotification({ active: true, type: "error", msg });
        }finally{
            this.loadingForm(false);
        }
    },

    loadingForm(value) {
      this.$emit("update:loading", value);
    },
  },
};
</script>