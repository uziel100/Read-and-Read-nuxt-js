<template>
  <div>
    <v-container fluid class="pa-0 bannerDetailBook py-md-1">
      <v-container>
        <div class="text-center text-md-left">
          <v-breadcrumbs
            dark
            class="pl-0 pt-2 pb-4 text-center"
            :items="breadcumbs"
          ></v-breadcrumbs>
        </div>

        <v-row class="d-flex">
          <v-col
            class="pt-2 pl-0 pt-md-8 order-1 order-md-0"
            cols="12"
            sm="12"
            md="8"
          >
            <h1
              class="
                text-lg-h4 text-xs-h7
                font-weight-black
                white--text
                text-center text-sm-left
                mb-4
                d-none d-md-block
              "
            >
              {{ book.title }}
            </h1>
            <div class="text-center text-md-left">
              <div class="d-sm-flex d-block justify-sm-center justify-md-start">
                <div class="d-flex justify-center">
                  <p class="white--text d-block">{{ score.average }}</p>
                  <v-rating
                    :value="score.average"
                    color="warning"
                    readonly
                    size="15px"
                    class="mx-1"
                    dense
                    half-increments
                  ></v-rating>
                </div>
                <p class="white--text d-block mt-0">
                  ({{ evaluations }} calificaciones)
                </p>
              </div>
              <div class="text-center text-md-left">
                <p class="white--text">
                  <span class="font-weight-bold"> Autor(s): </span>
                  <span>{{ stringAuthors }}</span>
                </p>
                <p class="white--text">
                  <span class="font-weight-bold">Editorial:</span>
                  {{ stringEditorials }}
                </p>
                <p class="white--text">
                  <span class="font-weight-bold">Idioma: </span>
                  {{ book.lang.name }}
                </p>
              </div>

              <v-btn
                :loading="loading"
                @click="hasBook ? null : ifBookAddedToWishList ? null : handleAddtoWishList()"
                class="mt-10 text-none"
                rounded
                color="error"
                dark
              >
                <v-icon left> mdi-heart </v-icon>
                {{
                  hasBook
                    ? "Ya compraste este libro"
                    : ifBookAddedToWishList
                      ? "En lista de deseos"
                      : "Añadir a la lista de deseos"
                }}
              </v-btn>
            </div>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="4"
            class="text-center order-0 order-md-1"
          >
            <h1
              class="
                text-h5
                font-weight-black
                white--text
                text-center
                mb-4
                d-block d-md-none
              "
            >
              {{ book.title }}
            </h1>
            <div class="d-flex justify-center">
              <v-card color="cards" height="450px" width="300px">
                <v-img
                  :src="
                    book.imgUrl
                      ? baseUrl.images + book.imgUrl
                      : '/img/libro.jpg'
                  "
                  height="350px"
                ></v-img>
                <v-card-text>
                  <v-card-title class="pa-0 text-black"
                    >$ {{ book.price }} MX</v-card-title
                  >
                </v-card-text>
                <v-btn
                  color="error"                  
                  class="text-none"
                  block
                  @click="!hasBook? handleAddProductCart(book._id) : $router.push(`/perfil/read/${ book.fileName }`) "
                  >{{ !hasBook? 'Agregar al carrito' : 'Leer libro'  }}</v-btn
                >
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <!-- Detail book -->
    <v-container>
      <!-- Details Book -->
      <v-row>
        <v-col class="pt-2 pt-md-10" cols="12" sm="12" md="8">
          <v-card flat>
            <v-card-actions class="justify-space-between">
              <h2 class="font-weight-black title--text ml-2">
                Descripción de libro
              </h2>
              <v-btn icon @click="show = !show">
                <v-icon>{{
                  show ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <v-card-text v-show="show">
                <v-divider class="mb-2"></v-divider>

                <p class="pa-0">
                  {{ book.summary }}
                </p>
                <h2 class="font-weight-black title--text mb-4">
                  Detalles del libro
                </h2>
                <v-divider class="mb-2"></v-divider>
                <p>
                  <span class="font-weight-black title--text">ISBN: </span>
                  {{ book.ISBN }}
                </p>
                <p>
                  <span class="font-weight-black title--text">Idioma: </span>
                  {{ book.lang.name }}
                </p>
                <p>
                  <span class="font-weight-black title--text">Paginas: </span>
                  {{ book.numPages }}
                </p>
                <p>
                  <span class="font-weight-black title--text">Editorial: </span>
                  {{ stringEditorials }}
                </p>
                <p>
                  <span class="font-weight-black title--text">Autores: </span>
                  {{ stringAuthors }}
                </p>
              </v-card-text>
            </v-expand-transition>
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>

      <v-row>
        <v-col class="pt-2" cols="12" sm="12" md="8">
          <v-card flat>
            <v-card-text>
              <h2 class="font-weight-bold title--text mb-4">
                Comentarios del los lectores
              </h2>
              <v-row>
                <v-col col="12" sm="3" md="4" class="text-center pt-5">
                  <p class="font-weight-bold text-h4">{{ score.average }}</p>
                  <v-rating
                    :value="score.average"
                    color="warning"
                    readonly
                    size="15px"
                    half-increments
                    dense
                  ></v-rating>
                  <p>Valoración del libro</p>
                </v-col>
                <v-col sm="9" md="8" class="d-none d-sm-block">
                  <div
                    v-for="item in score.points"
                    :key="item.counter"
                    class="d-flex align-center"
                  >
                    <v-progress-linear
                      color="primary"
                      rounded
                      :value="item.value"
                      height="6"
                    ></v-progress-linear>
                    <v-rating
                      :value="item.counter"
                      color="warning"
                      readonly
                      size="15px"
                    ></v-rating>
                  </div>
                </v-col>
              </v-row>

              <div class="text-center text-sm-left">
                <v-btn
                  @click="handleSendComment"
                  class="text-none"
                  rounded
                  color="accent"
                  >Escribir mi opinión</v-btn
                >
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>

      <v-row>
        <v-col class="pt-2 pt-md-10" cols="12" sm="12" md="8">
          <v-card class="py-6" v-if="!evaluations" color="cards" flat>
            <div class="ml-3">
              <p class="title--text ma-0">No hay ningún comentario</p>
            </div>
          </v-card>
          <v-card
            v-else
            color="cards"
            v-for="comment in getComments"
            :key="comment._id"
            flat
          >
            <v-card-text>
              <div class="d-flex">
                <v-avatar>
                  <img :src="comment.user.photo" alt="Foto de perfil" />
                </v-avatar>
                <div class="ml-3">
                  <p class="font-weight-black title--text ma-0">
                    {{ comment.user.email }}
                  </p>
                  <v-rating
                    :value="comment.score"
                    color="warning"
                    readonly
                    size="18px"
                    dense
                  ></v-rating>
                  <v-card-text class="pa-0">
                    {{ comment.content }}
                  </v-card-text>
                </div>
              </div>
            </v-card-text>
            <v-divider></v-divider>
          </v-card>

          <!-- <v-btn
            class="mt-16 d-sm-block text-none"
            rounded
            outlined
            color="primary"
            dark
            block
          >
            Ver mas comentarios
          </v-btn> -->
        </v-col>
      </v-row>
    </v-container>
    <modal-book-rating
      @updateComment="update"
      :scoreAll="book.score"
      :show.sync="modal.rating"
    ></modal-book-rating>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  head: {
    title: "Un libro es el mejor regalo",
  },

  async asyncData({ $axios, route, error, $auth }) {
    try {
      const res = await $axios.$get(`book/${route.params.idBook}`);
      const comments = await $axios.$get(`comment/book/${route.params.idBook}`); 
      let requestBook = null;
      if($auth.loggedIn){
        requestBook = await $axios.$get(`user/book/${route.params.idBook}`); 
      } 
                 
      return {
        book: res.book,
        comments: comments.data,
        evaluations: comments.data.length,
        hasBook: requestBook?.hasBook || false
      };
    } catch (err) {      
      const code = err.response?.status || 500
      error({ statusCode: code });
    }
  },

  data() {
    return {
      breadcumbs: [],
      show: true,
      score: [],
      loading: false,
      modal: {
        rating: false,
      },
    };
  },

  created() {
    this.setItemsBreadcumb();
    this.loadScore();
  },

  methods: {
    ...mapActions(["showNotification"]),
    ...mapActions("user", ["setWishList"]),
    ...mapActions("cart", ["addProductToCart"]),

    setItemsBreadcumb() {
      const links = [
        {
          text: "Inicio",
          disabled: false,
          to: "/",
        },
        {
          text: this.book.subCategory.name,
          disabled: false,
          to: "/" + this.book.subCategory.niceName,
        },
        {
          text:
            this.book.title.length > 40
              ? this.book.title.slice(0, 40) + "..."
              : this.book.title,
          disabled: true,
          to: "/libro/" + this.book._id,
        },
      ];
      this.breadcumbs = links;
    },

    async update(val) {
      if (val) {
        this.evaluations++;
        const newComment = {
          content: val.content,
          score: val.score,
          user: {
            email: this.$auth.user.email,
            photo: this.$auth.user.photo,
          },
        };
        this.comments.unshift(newComment);
        this.loadScore();
      }
    },

    loadScore() {
      const { score } = this.book;

      const scoreKeys = Object.keys(score);
      const totalScores = this.evaluations === 0 ? 1 : this.evaluations;

      let counter = 1,
        scoreTotal = 0;

      const points = scoreKeys.map((namePropertly) => {
        let value = (score[namePropertly] * 100) / totalScores;
        scoreTotal += counter * score[namePropertly];
        const obj = {
          value,
          counter: counter++,
        };
        return obj;
      }, []);

      const average = scoreTotal / totalScores;
      this.score = {
        average: parseFloat(average.toFixed(1)),
        points: points.reverse(),
      };
    },

    async handleAddtoWishList() {
      if (!this.$auth.loggedIn) {
        this.showNotification({
          active: true,
          msg: "Necesitas tener una cuenta :(",
          type: "accent",
        });
      } else {
        try {
          this.loading = true;
          const data = await this.addToWishList();
          await this.updateWishList(data.book);
          this.showNotification({
            active: true,
            msg: data.message,
            type: "accent",
          });
        } catch (err) {
          console.log(err);
          const msg = err.response
            ? err.response.data.message
            : "Ha ocurrido un error";
          this.showNotification({ active: true, type: "error", msg });
        } finally {
          this.loading = false;
        }
      }
    },

    async addToWishList() {
      const data = {
        userId: this.$auth.user._id,
        bookId: this.$route.params.idBook,
      };
      return await this.$axios.$post("wishlist", data);
    },

    handleSendComment() {
      if (!this.$auth.loggedIn) {
        this.$router.push("/unirse/login");
      } else {
        this.modal.rating = true;
      }
    },

    setImgProfile(photo) {
      const url = this.baseUrl.avatar;
      if (!photo) {
        return url + "avatar-default.png";
      } else if (photo.startsWith("https://")) {
        return photo;
      } else {
        return url + photo;
      }
    },

    async updateWishList() {
      const res = await this.$axios.$get(
        `wishlist/user/${this.$auth.user._id}`
      );
      this.setWishList(res.data);
    },

    async handleAddProductCart(idBook) {
      const isAdded = await this.addProductToCart(idBook);      
      if (!isAdded) {
        this.showNotification({
          active: true,
          msg: "Ya tienes agregado este libro",
          type: "error",
        });
      } else {
        this.showNotification({
          active: true,
          msg: "Producto agregado al carrito",
          type: "success",
        });
      }
    },
  },

  computed: {
    ...mapState(["baseUrl"]),
    ...mapState("user", ["wishlist"]),
    ...mapGetters("user", ["getWishList"]),    

    stringAuthors() {
      return this.book.author.map((author) => author.name).join(", ");
    },
    stringEditorials() {
      return this.book.publisher.map((publis) => publis.name).join(", ");
    },
    getComments() {
      return this.comments.map((item) => {
        item.user.photo = item.user.photo
          ? this.setImgProfile(item.user.photo)
          : this.setImgProfile(false);
        return item;
      });
    },

    ifBookAddedToWishList() {
      const bookId = this.$route.params.idBook;
      return this.getWishList.includes(bookId);
    },
  },
};
</script>


<style scoped>
.bannerDetailBook {
  background-image: url(../../../assets/img/bannerDetailBook4.png) !important;
  background-size: cover;
}
</style>