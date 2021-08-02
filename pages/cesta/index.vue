<template >
  <div v-if="!loading">
    <section v-if="books.length" class="pa-0">
      <v-container>
        <v-row>
          <v-col class="pt-2 pt-md-5" cols="12">
            <v-stepper value="1">
              <v-stepper-header>
                <v-stepper-step step="1"> Detalles de la orden </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="2"> Confirmar pago </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="3">Estado de la orden</v-stepper-step>
              </v-stepper-header>
            </v-stepper>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="mb-12 container" v-if="books.length">
      <h5 class="text-left text-h6 bold">
        {{ `${0 + books.length}` }} productos en la cesta
      </h5>
      <v-row>
        <v-col cols="12" lg="8">
          <v-list two-line v-for="(book, idx) in books" :key="idx">
            <v-hover v-slot:default="{ hover }" open-delay="50">
              <v-card :elevation="hover ? 5 : 0">
                <v-list-item class="margen">
                  <v-list-item-action>
                    <v-img
                      :src="`${baseUrl.images}${book.imgUrl}`"
                      height="130px"
                      max-width="120"
                    ></v-img>
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title>{{ book.title }}</v-list-item-title>
                    <v-list-item-subtitle
                      class="font-weight-bold py-5 title--text text-h5"
                      >${{ book.price }} MX</v-list-item-subtitle
                    >
                  </v-list-item-content>

                  <v-list-item-icon>
                    <v-btn
                      @click="handleRemoveProductCart(book._id)"
                      text
                      icon
                      color="#FE6150"
                    >
                      <v-icon class="align-end" color="red" medium
                        >mdi-backspace</v-icon
                      >
                    </v-btn>
                  </v-list-item-icon>
                </v-list-item>
                <v-divider></v-divider>
              </v-card>
            </v-hover>
          </v-list>
        </v-col>
        <v-col cols="12" lg="3">
          <v-card elevation="2" ref="form">
            <v-card-text>
              <h5 class="text-left text-h5 mb-4 bold">Total:</h5>
              <h4 class="text-left text-h4 mb-4 font-weight-bold title--text">
                $ {{ totalṔayment }} MX
              </h4>
            </v-card-text>
            <v-btn @click="handlePaymentProccess" color="error" dark block
              >Procesar pago</v-btn
            >
          </v-card>
        </v-col>
      </v-row>
    </section>
    <section class="mb-12 container text-center" v-else>
      <img
        width="400"
        src="@/assets/img/shopping-cart-empty.svg"
        alt="Carrito vacio"
      />
      <p class="text-h4 mt-8">No hay productos agregados</p>
    </section>
  </div>
  <section class="mb-12 container container-loading text-center" v-else>
    <v-progress-circular
      :size="70"
      :width="7"
      indeterminate
      color="primary"
    ></v-progress-circular>
    <p class="ml-6">Cargando productos</p>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  transition: "home",
  head: {
    title: "Metodo de pago",
  },
  data() {
    return {
      books: [],
      loading: false,
      totalṔayment: 0,
      e1: 1,
    };
  },

  async mounted() {
    await this.getProductsCart();
  },

  methods: {
    ...mapActions(["showNotification"]),
    ...mapActions("cart", ["deleteProductCart", "getCartProuct"]),

    async getProductsCart() {
      this.loading = true;
      const cart = await this.getCartProuct();
      this.books = [];
      this.totalṔayment = 0;
      try {
        const data = await this.$axios.$post("payment/book", { books: cart });
        for (const book of data.books) {
          this.totalṔayment += book.price;
        }
        this.totalṔayment = this.totalṔayment.toFixed(2);
        this.books = data.books;
      } catch (error) {
        this.showNotification({
          active: true,
          msg: "Ha ocurrido un error al recuperar los productos",
          type: "error",
        });
      } finally {
        this.loading = false;
      }
    },

    async handleRemoveProductCart(idBook) {
      const isDeleted = await this.deleteProductCart(idBook);
      if (isDeleted) {
        await this.getProductsCart();
      }
    },

    handlePaymentProccess() {
      if (!this.$auth.loggedIn) {
        this.showNotification({
          active: true,
          msg: "Necesitas registrarte o iniciar sesion para seguir con el proceso de pago :(",
          type: "accent",
        });
      } else {
        this.$router.push("/cesta/checkout");
      }
    },
  },

  computed: {
    ...mapState(["baseUrl"]),
  },
};
</script>
<style>
.margen {
  margin-top: -10px;
}
.container-loading {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>