<template>
  <user-auth-form :isLogin="false" :onSubmit="handleRegister"></user-auth-form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  head: {
    title: "Comienza ahora",
  },

  methods: {
    ...mapActions(["showNotification"]),

    async handleRegister(form) {
      const { email, password, username } = form;
      try {
        this.isLoadingForm(form, true);
        const res = await this.register({ email, password, username });
        this.isLoadingForm(form, false);
        this.showNotification({
          active: true,
          msg: res.message,
          type: "#57aa60",
        });
        this.$router.push("/unirse/login");
      } catch (err) {
        this.isLoadingForm(form, false);
        let msg = "", msg2 = "";
        if( err?.response?.data?.message?.email || err?.response?.data?.message?.username ){
          msg = err?.response?.data?.message?.email && "El email ya esta registrado por otro usuario "
          msg2 = err?.response?.data?.message?.username && "El nombre de usuario ya esta ocupado por otro usuario"
        }else{
          msg = "Ha ocurrido un error, intentelo de nuevo";
        }
        
        this.showNotification({ active: true, msg, msg2, type: "error" });
      }
    },

    async register(userInf) {
      // logica de registro
      return await this.$axios.$post("register", userInf);
    },

    isLoadingForm(form, value) {
      form.loading = value;
      form.disabled = value;
    },
  },
};
</script>

<style>
.imagen-registro {
  background-image: url(../../assets/img/unirse/img-registro.svg) !important;
  background-size: 90% 90%;
  background-position-x: -100px;
  background-position-y: 30px;
}

@media (max-width: 600px) {
  .imagen-registro {
    background: none !important;
  }
}
</style>