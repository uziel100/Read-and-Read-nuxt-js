<template>
  <v-dialog
    @input="$emit('update:show', false)"
    :value="show"
    transition="dialog-top-transition"
    :max-width="form.width"
  >
    <v-card>
      <v-toolbar color="primary" dark>Recuperación de contraseña</v-toolbar>
      <p class="text-center my-4">
        <img v-if="form.next === 'sms-send'" width="150px" src="../../assets/img/unirse/mail.svg" />
        <img v-else-if="form.next === 'sms-verify'" width="150px" src="../../assets/img/unirse/mail-code.svg" />
        <img v-else width="150px" src="../../assets/img/unirse/success.svg" />
      </p>
      <v-card-text>
        <v-form
          v-if="form.next === 'sms-send'"
          class="mt-4"
          v-model="form.valid"
          ref="form"
        >
          <p class="my-3">Coloca el correo electronico de tu cuenta</p>
          <v-text-field
            label="Correo electronico *"
            outlined
            type="email"
            color="accent"
            dense
            required
            v-model="form.email"
            :rules="[form.emailRequired, form.emailRules]"
          ></v-text-field>
          <p class="mb-3">Coloca el numero que has registrado</p>
          <v-text-field
            label="Numero de telefono *"
            outlined
            type="number"
            dense
            color="accent"
            v-model="form.phoneNumber"
            :rules="[form.numberRequired, form.numberRules]"
          ></v-text-field>
        </v-form>
        <v-form v-else-if="form.next === 'sms-verify'" class="mt-4" v-model="form.valid" ref="form">
          <v-text-field
            label="Coloca el código"
            outlined
            type="text"
            dense
            color="accent"
            class="text-h4 text-center"
            v-model="form.code"
            height="75px"
            :rules="[form.fieldRequired]"
          ></v-text-field>
          <div class="d-flex justify-center">
            <v-btn
              :loading="form.loadingVerify"
              :disabled="!form.valid"
              @click="handleVerifyCode"
              large
              class="text-none"
              color="accent"
              >Verificar código</v-btn
            >
          </div>
        </v-form>
        <div v-else>
          <h3>Se ha restablecido tu contraseña</h3>
          <p>No olvides cambiarlo lo mas pronto posible</p>
          <p>Nuevo password: </p>
          <p class="text-center text-h3" >{{ form.newPassword }}</p>
            <v-btn
            class="text-none"
            color="error"
            text
            @click="close"
            >Cerrar</v-btn
          >
        </div>
        <p class="text-center text-h6">{{ form.message }}</p>
      </v-card-text>
      <v-card-actions v-if="form.next === 'sms-send'" class="justify-end">
        <v-btn
          class="text-none"
          color="error"
          text
          @click="$emit('update:show', false)"
          >Cerrar</v-btn
        >
        <v-btn
          v-if="form.status"
          @click="handleSendMsgText"
          :disabled="!form.valid"
          class="text-none"
          color="accent"
          >Continuar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["show"],
  data() {
    return {
      form: {
        width: 400,
        valid: false,
        next: 'sms-send',
        code: "",
        email: "",
        phoneNumber: "",
        message: "",
        status: true,
        newPassword: '',
        loadingVerify: false,
        fieldRequired: (val) => !!val || "Campo obligatorio",
        emailRequired: (val) => !!val || "Correo obligatorio",
        emailRules: (val) => /.+@.+\..+/.test(val) || "Correo debe ser valido",
        numberRequired: (val) => !!val || "Numero telefonico obligatorio",
        numberRules: (val) =>
          val.length === 10 || "El número debe de tener 10 digitos",
      },
    };
  },
  methods: {
    async handleSendMsgText() {
      this.form.message = "Enviando mensaje de texto...";
      try {
        const { email, phoneNumber } = this.form;
        const res = await this.sendMsgText({
          email,
          phoneNumber: "52" + phoneNumber,
        });
        
        if (res.status) {
          this.form.message = '';
          this.form.next = 'sms-verify';
          this.$refs.form.resetValidation();
        }
      } catch (err) {
        const msg = err.response
          ? err.response.data.message
          : "Ha ocurrido algun error";
        this.form.message = msg;
      }
    },

    async sendMsgText(data) {
      return await this.$axios.$post("sms/send", data);
    },

    async handleVerifyCode(){
      const { code, phoneNumber, email } = this.form;     
      this.form.loadingVerify = true;
      try {
        const res = await this.sendVerifyCode({ code, phoneNumber: '52' + phoneNumber, email });        
        if(res.status){
          this.form.next = 'sms-end'
          this.form.newPassword = res.password;
        }
      } catch (err) {
        const msg = err.response
          ? err.response.data.message
          : "Ha ocurrido algun error";
        this.form.message = msg;
      }finally{
        this.form.loadingVerify = false;
      }
    },

    async sendVerifyCode(data){
      return await this.$axios.$post('sms/verify', data)
    },

    close(){
      this.form.email = '';
      this.form.phoneNumber = '',
      this.form.newPassword = '',
      this.form.next = 'sms-send'
      this.form.code = '';
      this.$emit('update:show', false);
    }
  },
  
};
</script>

<style>
.input-code {
  width: 50px;
  height: 60px;
  font-size: 28px;
  border-radius: 10px;
  border: 1px solid #ccc;
}
</style>