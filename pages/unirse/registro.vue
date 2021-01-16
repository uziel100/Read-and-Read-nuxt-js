<template>
  <user-auth-form :isLogin="false"  :onSubmit="handleRegister" ></user-auth-form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  head: {
    title: "Comienza ahora",
  },
    
  methods: {
    ...mapActions(["showNotification"]),

     async handleRegister( form ) {
      const { email, password } =  form ;
      try {        
        this.isLoadingForm(form, true);
        const res = await this.register({ email, password });
        this.isLoadingForm(form, false);
        this.showNotification({ active: true, msg: res.message, type: "success" });
        this.$router.push('/unirse/login')
      } catch (err) {
        this.isLoadingForm(form, false);
        const msg = err.response ? err.response.data.message : 'Ha ocurrido un error, intentelo de nuevo';              
        this.showNotification({ active: true, msg, type: "error" });
      }
    },

    async register( userInf ) {
      // logica de registro
      return await this.$axios.$post("user", userInf );      
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