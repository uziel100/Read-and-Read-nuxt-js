<template>   
  <div>
    <user-auth-form :signGoogle="handleSignGoogle"  :onSubmit="handleLogin" :onForgotPasssword="handleEmailSend" ></user-auth-form>
    <!-- <div  id="">Google</div> -->
    <div id="google-signin-button" >
      <span class="icon"></span>
      <span class="buttonText">Google</span>
    </div>
    <v-btn @click="signOut" >Cerrar sesion</v-btn>
  </div>       
  
</template>

<script>
import { mapActions } from "vuex";

export default {  
  transition: "home",
  head: {
    title: "Comienza a leer ya",
    meta: [
      {
        name: 'google-signin-client_id',
        content: "451024139586-ngq240pmq03op37iro4o8d73o64g641f.apps.googleusercontent.com"
      }
    ],
    script: [
      {
        src: 'https://apis.google.com/js/platform.js',
        defer: true,
        async: true
      }
    ]
  },

  mounted(){
    gapi.signin2.render('google-signin-button', {
      onsuccess: this.onSignIn
    })
  },

  methods: {
    ...mapActions(["showNotification", "setUserRole"]),

   signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    },

    onSignIn (googleUser) {
      const profile = googleUser.getBasicProfile();
      console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
      // console.log('profile', profile);
    },

    async handleSignGoogle(){
      console.log('google')
      try {
        const res = await this.$auth.loginWith('google')
        console.log( res );
      } catch (err) {
        console.log( err )
      }
    },

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
    },

    isLoadingForm( form, value ) {
      form.loading = value;
      form.disabled = value;
    },

    async handleEmailSend( form ){
      const { email } = form;
      form.message = "Enviando email...";
      try {
        await this.sendEmail( {email} );
        form.message = "Email enviado, por favor revisa tu bandeja";
        form.status = false; 
      } catch (err) {
        const msg = err.response ? err.response.data.message : 'Ha ocurrido algun error';  
        form.message = msg;
      }
    },

    async sendEmail( data ){
      await this.$axios.$post('forgotPassword', data)
    }
    
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
      display: inline-block;
      background: white;
      color: #444;
      width: 190px;
      border-radius: 5px;
      border: thin solid #888;
      box-shadow: 1px 1px 1px grey;
      white-space: nowrap;
    }
    #google-signin-button:hover {
      cursor: pointer;
    }
    span.label {
      font-family: serif;
      font-weight: normal;
    }
    span.icon {
      background: url('/identity/sign-in/g-normal.png') transparent 5px 50% no-repeat;
      display: inline-block;
      vertical-align: middle;
      width: 42px;
      height: 42px;
    }
    span.buttonText {
      display: inline-block;
      vertical-align: middle;
      padding-left: 42px;
      padding-right: 42px;
      font-size: 14px;
      font-weight: bold;
      /* Use the Roboto font that is loaded in the <head> */
      font-family: 'Roboto', sans-serif;
    }

@media (max-width: 600px) {
  .imagen-login {
    background: none !important;
  }
}
</style>