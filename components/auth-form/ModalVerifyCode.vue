<template>
  <v-dialog
    @input="$emit('update:show', false)"
    :value="show"
    transition="dialog-top-transition"
    max-width="300"
  >
    <v-card>
      <v-toolbar color="primary" dark>Verificación del código</v-toolbar>
      <p class="text-center my-4">
        <img width="150px" src="../../assets/img/unirse/mail-code.svg" />
      </p>
      <v-card-text>
        <v-form class="mt-4" v-model="form.valid" ref="form">
          <v-text-field
            label="Coloca el código"
            outlined
            type="text"
            dense
            color="accent"
            class="text-h5 text-center"
            v-model="form.code"
            height="80px"
            :rules="[form.fieldRequired]"
          ></v-text-field>
          <div class="d-flex justify-center">
            <v-btn
              :loading="form.loading"
              :disabled="!form.valid"
              @click="handleVerifyCode"
              large
              class="text-none"
              color="accent"
              >Verificar código</v-btn
            >
          </div>
        </v-form>
        <p class="text-center text-h6">{{ form.message }}</p>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["show", "email"],
  data() {
    return {
      form: {
        code: "",
        email: "",
        width: 400,
        valid: false,
        message: "",
        status: true,
        loading: false,
        fieldRequired: (val) => !!val || "Campo obligatorio",
      },
    };
  },

  methods: {
    ...mapActions(["showNotification"]),
    ...mapActions('user',["setWishList"]),

    async handleVerifyCode() {
      this.form.loading = true;
      try {
        const { code } = this.form;
        const data = {
          email: this.email,
          code,
        };
        const res = await this.loginNormal(data);
        this.saveUserDataPersist(res.data.user);
        const list = await this.getWishList( res.data.user._id );                    
        this.setWishList( list );     
        this.$emit("update:show", false);
        this.goLayoutByRole( res.data.user.role )        
      } catch (err) {
        const msg = err.response
          ? err.response.data.message
          : "Ha ocurrido un error";
        this.showNotification({ active: true, type: "error", msg });
      } finally {
        this.form.loading = false;
      }
    },

    async loginNormal(data) {
      return await this.$auth.loginWith("local", {
        data: {
          email: data.email,
          code: data.code,
        },
      });
    },

    async getWishList(userId){
      const res = await this.$axios.$get(`wishlist/user/${ userId }`)
      return res.data
    },

    saveUserDataPersist(data) {
      this.$auth.$storage.setLocalStorage("_user", data, true);
      this.$auth.setUser(data);
    },

    goLayoutByRole( role ){
      let layout = '';
      switch (role) {
        case 'USER_ROLE':          
          layout = '/perfil'
          break;
        case 'ADMIN_ROLE':          
          layout = '/admin'
          break;
        default:
          layout = '/perfil'
          break;
      }
      this.$router.push( layout );
    }
  },
};
</script>

<style>
</style>






