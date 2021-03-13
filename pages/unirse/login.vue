<template>
  <div>
    <user-auth-form
      :onSubmit="handleLogin"
      @showModalToOptionsRecoverPassword="handleModal"
    ></user-auth-form>
    <modal-verify-code :show.sync="modal.code" :email="email" :password="password" >
    </modal-verify-code>
    <modal-options-to-restore-password
      :show.sync="modal.root"
      @showModal="handleFormModal"
    ></modal-options-to-restore-password>
    <modal-form-to-restore-by-email :show.sync="modal.email">
    </modal-form-to-restore-by-email>
    <modal-form-to-restore-by-message-text :show.sync="modal.msgText">
    </modal-form-to-restore-by-message-text>
    <modal-form-to-restore-by-question :show.sync="modal.question" >
    </modal-form-to-restore-by-question>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ModalFormToRestoreByQuestion from '~/components/auth-form/ModalFormToRestoreByQuestion.vue';

export default {
  components: { ModalFormToRestoreByQuestion },
  transition: "home",
  head: {
    title: "Comienza a leer ya",
  },

  data() {
    return {
      email: "",
      password: "",
      modal: {
        root: false,
        email: false,
        msgText: false,
        code: false,
        question: false,
      },
    };
  },

  methods: {
    ...mapActions(["showNotification"]),

    async handleLogin(formData) {
      this.isLoadingForm(formData, true);
      try {
        const { email, password } = formData;
        console.log(email, password)
        const res = await this.login({ email, password });                
        this.email = email;
        this.password = password;
        this.modal.code = true;        
      } catch (err) {        
        const msg = err.response
          ? err.response.data.message
          : "Ha ocurrido un error";
        this.showNotification({ active: true, type: "error", msg });
      }finally{
        this.isLoadingForm(formData, false);
      }
    },

    async handleLogin2(formData) {
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

    async login(data){
      return await this.$axios.$post('login', data)
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

    handleModal(value) {
      this.modal.root = value;
    },

    handleFormModal(value) {
      this.modal.root = false;
      setTimeout(() => {
        this.modal[value] = true;
      }, 1000);
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
  width: calc(100% - 2px) !important;
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