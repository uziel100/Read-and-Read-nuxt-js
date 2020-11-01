<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="4">
        <v-card ref="form">
          <v-card-text>
            <h2 class="pb-4 text-center">Registro</h2>
            <v-text-field            
              label="Nombre"
              outlined
              clearable
              v-model="user.name"
            ></v-text-field>
            <v-combobox
              label="Sexo"
              v-model="user.sexo"
              :items="sexos"
              clearable
              outlined
              small-chips
            ></v-combobox>
            <v-text-field
              label="Email"
              type="email"
              outlined
              clearable
              v-model="user.email"
            ></v-text-field>
            <v-text-field
              v-model="user.password"
              label="Password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              outlined
              clearable
              @click:append="show = !show"
            ></v-text-field>
            <v-text-field
              label="Domicilio"
              outlined
              clearable
              v-model="user.address"
            ></v-text-field>
            <v-text-field
              label="Telefono"
              outlined
              clearable
              type="number"
              v-model="user.phone"
            ></v-text-field>
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="user.date"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="user.date"
                  label="Fecha de nacimiento"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="user.date" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.dialog.save(user.date)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>

            <v-btn color="secondary" class="mr-4" @click="register"
              >Registrar</v-btn
            >
            <nuxt-link to="/users">Ver usuarios</nuxt-link>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      modal: false,
      sexos: ["Masculino", "Femenino"],
      user: {
        name: undefined,
        email: undefined,
        password: undefined,
        address: undefined,
        phone: undefined,
        date: new Date().toISOString().substr(0, 10),
        sexo: undefined,
      },
    };
  },
  methods: {
    async register() {
      try {
        const res = await this.$axios.$post("user", this.user);

        if (res.status) {
          alert(res.message);
          this.user.name = "";
          this.user.email = "";
          this.user.password = "";
          this.user.address = "";
          this.user.date = new Date().toISOString().substr(0, 10);
          this.user.phone = "";
          this.user.sexo = "";
        }
      } catch (err) {
        console.log(err.response.data);
      }
    },
  },
};
</script>

<style>
</style>