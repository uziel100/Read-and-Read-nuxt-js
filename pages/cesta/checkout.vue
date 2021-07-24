<template>
  <v-container v-if="!loading">
    <v-container>
      <v-row>
        <v-col class="pt-2" cols="12">
          <v-stepper non-linear value="2">
            <v-stepper-header>
              <v-stepper-step
                step="1"
                editable
                @click="$router.push(`/cesta`)"
                complete
              >
                Detalles de la orden
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="2"> Confirmar pago </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="3">Estado de la orden</v-stepper-step>
            </v-stepper-header>
          </v-stepper>
        </v-col>
      </v-row>
    </v-container>
    <v-row class="margin-vertical">
      <v-col cols="12" md="6">
        <p class="text-h5 font-weight-bold">Detalles de orden</p>
        <hr />
        <v-list :class="libro.exist? 'opacity5' : ''" two-line v-for="(libro, idx) in books" :key="idx">
          <v-card :elevation="0">
            <v-list-item class="margen">
              <v-list-item-action>
                <v-img
                  :src="`https://d3a1k1s7tqtsjr.cloudfront.net/imageBook/${libro.imgUrl}`"
                  height="100px"
                  max-width="90"
                ></v-img>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ !libro.exist? libro.title : 'Ya tienes este libro' }}</v-list-item-title>
                <v-list-item-subtitle
                  class="font-weight-bold py-5 text-h6 title--text"
                  :class="libro.exist? 'text-through': ''"
                  >${{ libro.price }} MX</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </v-card>
        </v-list>
      </v-col>
      <v-col cols="12" md="6">
        <p class="text-h5 font-weight-bold">Información del pago</p>
        <hr />
        <v-form v-model="form.valid" ref="form"  class="mt-6">
          <v-text-field
            label="Nombre de la tarjeta *"
            outlined
            type="text"
            color="accent"
            dense
            required
            name="cardName"
            v-model="data.nameCard"            
            :rules="[form.requiredField]"
          ></v-text-field>
          <v-row class="ma-0">
            <v-text-field
              label="Pais *"
              outlined
              type="text"
              color="accent"
              dense
              required
              name="country"
              class="mr-md-2"
              v-model="data.country"
              :rules="[form.requiredField]"
            ></v-text-field>
            <v-text-field
              label="Estado *"
              outlined
              type="text"
              color="accent"
              dense
              required
              name="state"
              v-model="data.state"
              :rules="[form.requiredField]"
            ></v-text-field>
            <v-text-field
              label="Codigo postal *"
              outlined
              type="number"
              color="accent"
              dense
              required
              name="cardName"
              v-model="data.postalCode"
              :rules="[form.requiredField]"
            ></v-text-field>
          </v-row>
          <stripe-element-card
            iconStyle="solid"
            ref="stripe"
            :pk="pulishableKey"
            @token="tokenCreated"
            hidePostalCode
          />
          <v-btn
            :loading="loadingPayment"
            :disabled="!form.valid || totalPayment == 0"
            @click="submit"
            color="error"            
            block
            >Pagar ($ {{ totalPayment }})</v-btn
          >
        </v-form>
      </v-col>
    </v-row>
  </v-container>
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
import { StripeElementCard } from "@vue-stripe/vue-stripe";
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "checkout",
  head: {
    title: "Metodo de pago",
  },
  components: {
    StripeElementCard,
  },
  async created() {
    this.$axios.setHeader("token", this.$auth.strategy.token.get());    
    await this.getUserBooks();
    await this.getProductsCart();
  },
  data() {
    return {
      loading: false,
      loadingPayment: false,
      pulishableKey:
        "pk_test_51IHhWfCIDQWOdpTOheb9MMYHnUgKn6e96NACwVbKx4mVhdEYmlGBw13GMvj5LNvqmN8efsykiInPpR3v9lnQAiTy00p3DoOfHI",
      token: null,
      books: [],
      userBook: [],
      totalPayment: 0,
      data: {
        country: "",
        state: "",
        nameCard: "",
        postalCode: "",
      },
      form:{
        valid: false,
        requiredField: (val) => !!val || "Campo obligatorio",
      }
    };
  },
  methods: {
    ...mapActions(["showNotification"]),
    ...mapActions("cart", ["getCartProuct", "clearCart"]),
    ...mapActions("user", ["setWishList"]),

    submit() {
      this.loadingPayment = true;
      this.$refs.stripe.submit();
    },
    async tokenCreated(token) {
      const products = this.books.filter(book => book.exist === false)
      const data = {
        ...this.data,
        products,
        tokenStripe: token.id,
      };      
      try {
        const request = await this.$axios.$post("payment", data);
        if (request.status) {
          this.removeBookIfItWasInWishlist()
          await this.clearCart();
          this.$router.push("/cesta/status");
        }
      } catch (error) {
        const msg =
          error.response?.data?.message ||
          "Ha ocurrido un error, intentelo de nuevo";
        this.showNotification({ active: true, type: "error", msg });
      } finally {
        this.loadingPayment = false;
      }
    },

    async getProductsCart() {
      this.loading = true;
      const cart = await this.getCartProuct();
      this.books = [];
      this.totalPayment = 0;
      for (const id of cart) {
        const bookIsBought = this.userBook.find( item => item.book._id === id);
        const data = await this.$axios.$get(`book/${id}`);
        if(!bookIsBought){
          this.books.push( {...data.book, exist: false } );
          this.totalPayment += data.book.price;
        }else{
          this.books.push({...data.book, exist: true});
        }
      }
      this.totalPayment = this.totalPayment.toFixed(2);
      this.loading = false;
    },

    async getUserBooks(){
      const data = await this.$axios.$get(`/user/${this.$auth.user._id}/book`);
      this.userBook = data.books;
    },

    removeBookIfItWasInWishlist() {
      let tempWihslist = [...this.wishlist];
      for (const book of this.books) {
        const bookWasAtWishlist = tempWihslist.find(
          (item) => item.bookId._id === book._id
        );
        if (bookWasAtWishlist) {
          tempWihslist = tempWihslist.filter(
            (item) => item.bookId._id !== book._id
          );
        }
      }
      this.setWishList(tempWihslist);      
    },
  },

  computed: {
    ...mapState("user", ["wishlist"]),
    ...mapGetters("user", ["getWishList"]),
  },
};
</script>


<style>
.container-loading {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.margin-vertical {
  margin: 5vh 0 20vh;
}
.text-through{
  text-decoration: line-through;  
}
.opacity5{
  opacity: 0.5;
}
</style>