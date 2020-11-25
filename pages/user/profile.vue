<template>
  <div>
    <v-container
      fluid
      class="d-none bannerProfile py-md-16 d-sm-none d-md-block"
    >
    </v-container>
    <v-container>
      <v-row class="d-flex justify-center">
        <v-col cols="12" md="3" d-sm="6" class="mx-auto">
          <v-card class="mt-md-n16 mt-0" elevation="3">
            <v-card-text>
              <v-row justify="center">
                <v-avatar class="ma-3" size="100">
                  <img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                    alt="John"
                  />
                </v-avatar>
              </v-row>
              <v-row align-content="center" justify="center">
                <p class="text-center  title--text pa-1 mb-8">{{ this.$auth.user.email  }}</p>
              </v-row>
              <v-divider class="d-md-block d-none mb-14"></v-divider>
              <v-btn
                block
                color="accent"
                class="ma-0 text-none btn-block"
                v-show="showButtonEdit"
                @click="showFormEditUser"
              >
                Editar perfil
              </v-btn>
              <v-row class="d-sm-none">
                <div class="contenido mt-3 ml-4">
                  <a href="#"><p class="miFuente">Comentarios</p></a>
                  <a href="#"><p class="miFuente">Seguridad de la cuenta</p></a>
                  <a href="#"><p class="miFuente">Metodo de pago</p></a>
                  <a href="#"><p class="miFuente">Privacidad</p></a>
                  <a href="#"><p class="miFuente">Cerrar sesion</p></a>
                </div>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card class="pt-6" min-height="500px" elevation="1">
            <v-divider></v-divider>
            <div v-if="showFormEdit" class="py-8 px-16">
              <v-text-field
                label="Nombre"
                v-model="user.name"
                outlined
                type="text"
                dense
                color="accent"
                required
              ></v-text-field>
              <v-text-field              
                label="Apellidos"
                v-model="user.lastName"
                outlined
                type="text"
                dense
                color="accent"
                required
              ></v-text-field>
              <v-combobox
                dense
                label="Genero"
                v-model="user.gender"
                :items="genres"
                clearable
                outlined
                small-chips
              ></v-combobox>
              <v-text-field
                label="Domicilio"
                v-model="user.address"
                outlined
                type="text"
                dense
                color="accent"
                required
              ></v-text-field>
              <v-text-field
                dense
                label="Telefono"
                outlined
                clearable
                type="number"
                v-model="user.phone"
              ></v-text-field>
              <v-dialog
                ref="dialog"
                v-model="modal"
                :return-value.sync="user.birthDate"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="user.birthDate"
                    label="Fecha de nacimiento"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="user.birthDate" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog.save(user.birthDate)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>              
              <div class="text-center mt-2">
                <v-btn color="error" class="mr-4" @click="hiddenFormEditUser"
                  >Cancelar</v-btn
                >
                <v-btn @click="saveData" color="secondary" class="mr-4"
                  >Guardar cambios</v-btn
                >
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card class="text-right d-none d-md-flex">
            <v-card-text>
              <div class="contenido mt-3 ml-2">
                <a href="#"><p class="miFuente2 title--text">Comentarios</p></a>
                <a href="#"><p class="miFuente2 title--text">Seguridad de la cuenta</p></a>
                <a href="#"><p class="miFuente2 title--text">Metodo de pago</p></a>
                <a href="#"><p class="miFuente2 title--text">Privacidad</p></a>
                <a href="#"><p class="miFuente2 title--text">Cerrar sesion</p></a>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>


import { mapActions } from 'vuex'

export default {
  layout: "user",
  transition: "home",
  data() {
    return {
      modal: false,
      showFormEdit: false,
      showButtonEdit: true,
      user: {
        name: null, 
        lastName: null, 
        address: null, 
        phone: null, 
        birthDate: new Date().toISOString().substr(0, 10), 
        gender: null,                
      },
      genres: ["Masculino", "Femenino"],
    };
  },

  methods: {
    ...mapActions(["showNotification"]),
    showFormEditUser() {
      this.showFormEdit = true; 
      this.showButtonEdit = false;
    },
    hiddenFormEditUser(){
      this.showFormEdit = false; 
      this.showButtonEdit = true;
    },
    
    async saveData(){      
      try {
        const res = await this.$axios.$put(`user/${ this.$auth.user._id }`, this.user)
        console.log(res);
        this.showNotification( { active: true, type: 'accent', msg: res.message } );   
        this.hiddenFormEditUser();
      } catch (err) {
        const msg = err.response ? err.response.data.message : 'Ha ocurrido un error';              
        this.showNotification( { active: true, type: 'error', msg } );   
      }
    }
  },
};
</script>

<style scoped>
.bannerProfile {
  background-image: url(../../assets/img/bannerProfile.png) !important;
  background-size: 100% 150px;
}
.miFuente3 {
  font-size: 18px;
  color: #000000;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.miFuente2 {
  font-size: 16px;
  color: #000000;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.miFuente {
  font-size: 14px;
  color: #000000;

  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
