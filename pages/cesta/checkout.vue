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
        <v-list two-line v-for="(libro, idx) in books" :key="idx">
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
                <v-list-item-title>{{ libro.title }}</v-list-item-title>
                <v-list-item-subtitle
                  class="font-weight-bold py-5 text-h6 title--text"
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
        <form class="mt-6">
          <v-text-field
            label="Nombre de la tarjeta *"
            outlined
            type="text"
            color="accent"
            dense
            required
            name="cardName"
            v-model="data.nameCard"
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
            ></v-text-field>
          </v-row>
        </form>
        <stripe-element-card
          iconStyle="solid"
          ref="stripe"
          :pk="pulishableKey"
          @token="tokenCreated"
          hidePostalCode
        />
        <v-btn :loading="loadingPayment" @click="submit" color="error" dark block
          >Pagar ($ {{ totalPayment }})</v-btn
        >
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
import { mapActions } from "vuex";

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
      totalPayment: 0,
      data: {
        country: "",
        state: "",
        nameCard: "",
        postalCode: "",
      },
    };
  },
  methods: {
    ...mapActions(["showNotification"]),
    ...mapActions("cart", ["getCartProuct", "clearCart"]),

    submit() {
      this.loadingPayment = true;
      this.$refs.stripe.submit();
    },
    async tokenCreated(token) {      
      const data = { ...this.data, products: this.books, tokenStripe: token.id };
      try {
        const request = await this.$axios.$post('payment', data);        
        if(request.status){
          await this.clearCart();
          this.$router.push('/cesta/status');
        }
      } catch (error) {
        const msg = error.response?.data?.message || 'Ha ocurrido un error, intentelo de nuevo'     
        this.showNotification({ active: true, type: "error", msg });
      }finally{
        this.loadingPayment = false;
      }      
    },

    async getProductsCart() {
      this.loading = true;
      const cart = await this.getCartProuct();
      this.books = [];
      this.totalPayment = 0;
      for (const id of cart) {
        const data = await this.$axios.$get(`book/${id}`);
        this.books.push(data.book);
        this.totalPayment += data.book.price;
      }
      this.totalPayment = this.totalPayment.toFixed(2);
      this.loading = false;
    },
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
</style>