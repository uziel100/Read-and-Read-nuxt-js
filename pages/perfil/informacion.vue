<template>
  <div>
    <v-container
      fluid
      class="bannerProfile py-md-16 d-none d-sm-none d-md-block"
    >
    </v-container>
    <v-container>
      <v-row class="d-flex justify-center">
        <v-col cols="12" md="3" d-sm="6" class="mx-auto">
          <v-card class="mt-md-n16 mt-0" elevation="3">
            <v-card-text>              
              <div class="text-center d-block">
                <v-avatar class="ma-3" size="100">
                  <img
                    style="border: 1px solid #000"
                    :src="getImageProfile"
                    :alt="'Foto de perfil de' + $auth.user.email"
                    id="img-profile"
                  />
                </v-avatar>
                <v-file-input
                  v-show="form.profile"
                  chips
                  truncate-length="16"
                  style="width: 180px; margin: auto"
                  accept="image/png, image/jpeg, image/jpg"
                  placeholder="Cambiar foto"
                  prepend-icon="mdi-camera"
                  v-model="user.img"
                ></v-file-input>
              </div>              
              <v-row align-content="center" justify="center">
                <v-chip class="ma-2" color="primary" outlined pill>
                  {{ this.$auth.user.email }}
                  <v-icon right> mdi-account-outline </v-icon>
                </v-chip>
              </v-row>
              <v-divider class="d-md-block d-none mb-14"></v-divider>
              <v-btn
                block
                color="accent"
                class="ma-0 text-none btn-block"
                v-show="!form.profile"
                @click="form.profile = true"
              >
                Editar perfil
              </v-btn>
              <p class="d-flex justify-center">
                <v-btn
                  @click="uploadAvatar"
                  :loading="user.loading"
                  :disabled="user.disabled"
                  class="text-none"
                  v-show="form.profile"
                  rounded
                  color="secondary"
                  small
                  >Actualizar</v-btn
                >
              </p>
              <v-row class="d-sm-none">
                <div class="contenido mt-3 ml-4">
                  <v-list>
                    <v-list-item-group color="indigo">
                      <v-list-item
                        v-for="(option, i) in options"
                        :key="i"
                        @click="hiddenForm(option.name)"
                        :disabled="option.disabled"
                      >
                        <v-list-item-content>
                          <v-list-item-title
                            v-text="option.title"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </div>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card
            min-height="500px"
            elevation="1"
            :loading="form.loading"
            :disabled="form.loading"
          >
            <!-- CONTENT -->
            <keep-alive>
              <form-update-information
                v-if="form.profile"
                :show.sync="form.profile"
                :loading.sync="form.loading"
              ></form-update-information>
              <form-question
                v-else-if="form.question"
                :show.sync="form.question"
              ></form-question>
              <form-change-password
                v-else-if="form.password"
                :show.sync="form.password"
                :loading.sync="form.loading"
              >
              </form-change-password>
              <form-view-commets
                v-else-if="form.comment"
                :show.sync="form.comment"
              ></form-view-commets>
              <FormRequestBook
                v-else-if="form.requestBook"                
                :show.sync="form.requestBook"
                :loading.sync="form.loading"
              ></FormRequestBook>
            </keep-alive>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card class="text-right d-none d-md-flex">
            <v-card-text>
              <v-list>
                <v-list-item-group color="indigo">
                  <v-list-item
                    v-for="(option, i) in options"
                    :key="i"
                    @click="hiddenForm(option.name)"
                    :disabled="option.disabled"
                  >
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="option.title"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
import { mapState, mapGetters } from "vuex";

export default {
  layout: "user",
  transition: "home",
  head: {
    title: "Perfil",
  },

  data() {
    return {
      form: {
        profile: false,
        comment: false,
        loading: false,
        question: false,
        password: false,
        comment: false,
        requestBook: false,
      },
      user: {
        loading: false,
        img: null,
        disabled: true,
      },
      options: [
        {
          title: "Cambiar contraseña",
          name: "password",
          disabled: this.$auth.user.signWithGoogle,
        },
        {
          title: "Configurar pregunta secreta",
          name: "question",
          disabled: this.$auth.user.signWithGoogle,
        },
        {
          title: "Comentarios",
          name: "comment",
          disabled: false,
        },
        {
          title: "Solicitar libro",
          name: "requestBook",
          disabled: false,
        },
      ],
    };
  },

  methods: {
    async uploadAvatar() {
      this.user.loading = true;
      try {
        const file = new FormData();
        file.append("file", this.user.img);
        const res = await this.$axios.$post(
          "upload/avatar/" + this.$auth.user._id,
          file,
          {
            headers: { "content-type": "multipart/form-data" },
          }
        );
        const photo = res.urlName;
        const data = await this.$axios.$put(
          "user/avatar/" + this.$auth.user._id,
          { photo }
        );
        this.saveUserDataPersist({ ...this.$auth.user, photo });
        this.user.img = null;
        this.form.profile = false;
      } catch (err) {
        console.log(err);
      } finally {
        this.user.loading = false;
      }
    },

    saveUserDataPersist(data) {
      this.$auth.$storage.setLocalStorage("_user", data, true);
      this.$auth.setUser(data);
    },

    hiddenForm(formVisible) {
      const formsKeys = Object.keys(this.form);
      formsKeys.map(
        (name) => (this.form[name] = name == formVisible ? true : false)
      );
    },
  },

  computed: {
    ...mapState(["baseUrl"]),
    ...mapGetters(["getImageProfile"]),
  },

  watch: {
    "user.img"(value) {
      const imgPreview = document.getElementById("img-profile");
      if (value) {
        this.user.disabled = false;
        const reader = new FileReader();
        reader.onload = function () {
          const dataURL = reader.result;
          imgPreview.src = dataURL;
        };
        reader.readAsDataURL(value);
      } else {
        this.user.disabled = true;
      }
    },
  },
};
</script>

<style scoped>
.bannerProfile {
  background-image: url(../../assets/img/patron-1.png) !important;
  background-repeat: repeat-x, repeat-y;
}
</style>
