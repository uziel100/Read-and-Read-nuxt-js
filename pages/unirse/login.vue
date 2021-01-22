<template>          
  <user-auth-form  :onSubmit="handleLogin" ></user-auth-form>
</template>

<script>
import { mapActions } from "vuex";

export default {  
  transition: "home",
  head: {
    title: "Comienza a leer ya",
  },

  methods: {
    ...mapActions(["showNotification", "setUserRole"]),

    async handleLogin( formData ) {
      this.isLoadingForm(formData, true );
      try {
        const { email, password } = formData;
        const response = await this.loginNormal({ email, password });
        await this.saveUserDataPersist(response.data.user);        
        this.isLoadingForm(formData, false );
        this.$router.push("/perfil");
      } catch (err) {
        this.isLoadingForm(formData, false );
        const msg = err.response
          ? err.response.data.message
          : "Ha ocurrido un error";
        this.showNotification({ active: true, type: "error", msg });
      }
    },

    async loginNormal(loginInf) {
      return await this.$auth.loginWith("local", {
        data: {
          email: loginInf.email,
          password: loginInf.password,
        },
      });
    },

    saveUserDataPersist(data) {
      this.$auth.$storage.setLocalStorage("_user", data, true);
      this.$auth.setUser(data);
      // this.setUserRole(data.role)
    },

    isLoadingForm( form, value ) {
      form.loading = value;
      form.disabled = value;
    },
    
  },
};
</script>

<style>
.imagen-login {
  background-image: url(../../assets/img/login.svg) !important;
  background-size: 90% 90%;
  background-position-x: 300px;
  background-position-y: 30px;
}

@media (max-width: 600px) {
  .imagen-login {
    background: none !important;
  }
}
</style>