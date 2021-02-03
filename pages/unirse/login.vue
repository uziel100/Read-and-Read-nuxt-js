<template>
    <user-auth-form
      :onSubmit="handleLogin"
      :onForgotPasssword="handleEmailSend"
    ></user-auth-form>

</template>

<script>
import { mapActions } from "vuex";

export default {
  transition: "home",
  head: {
    title: "Comienza a leer ya",
  },

  

  methods: {
    ...mapActions(["showNotification"]),

    async handleLogin(formData) {
      this.isLoadingForm(formData, true);
      try {
        const { email, password } = formData;
        const response = await this.loginNormal({ email, password });
        this.saveUserDataPersist(response.data.user);
        this.isLoadingForm(formData, false);
        this.$router.push("/perfil");
      } catch (err) {
        this.isLoadingForm(formData, false);
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
    },

    isLoadingForm(form, value) {
      form.loading = value;
      form.disabled = value;
    },

    async handleEmailSend(form) {
      const { email } = form;
      form.message = "Enviando email...";
      try {
        await this.sendEmail({ email });
        form.message = "Email enviado, por favor revisa tu bandeja";
        form.status = false;
      } catch (err) {
        const msg = err.response
          ? err.response.data.message
          : "Ha ocurrido algun error";
        form.message = msg;
      }
    },

    async sendEmail(data) {
      await this.$axios.$post("forgotPassword", data);
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

#google-signin-button {
  display: flex;
  background: white;
  color: #444;
  width: 190px;
  border-radius: 5px;
  border: thin solid #888;
  box-shadow: 2px 2px 2px grey;
  width: 100%;
  justify-content: center;
}
#google-signin-button > div {
  width: calc( 100% - 2px )  !important;
  box-shadow: 0px !important;
}

#google-signin-button:hover {
  cursor: pointer;
}


@media (max-width: 600px) {
  .imagen-login {
    background: none !important;
  }
}
</style>