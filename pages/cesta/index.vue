<template >
  <div>
    <section class="pa-0 accent">
      <v-container>
        <v-row>
          <v-col class="pt-2 pt-md-5" cols="12" sm="10">
            <h2 class="text-center text-sm-left font-weight-bold white--text">
              Cesta
            </h2>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="mb-12 container">
      <h5 class="text-left text-h6 bold">3 Ebooks en la cesta</h5>
      <v-row>
        <v-col cols="12" lg="8">
          <v-list two-line v-for="(libro, idx) in libros" :key="idx">
            <v-hover v-slot:default="{ hover }" open-delay="50">
              <v-card :elevation="hover ? 5 : 0">
                <v-list-item class="margen">
                  <v-list-item-action>
                    <v-img
                      :src="libro.img"
                      height="130px"
                      max-width="120"
                    ></v-img>
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title>{{ libro.title }}</v-list-item-title>
                    <v-list-item-title
                      >Por: {{ libro.autor }}</v-list-item-title
                    >
                    <v-list-item-subtitle
                      class="font-weight-bold py-5 title--text"
                      >${{ libro.pre }} MX</v-list-item-subtitle
                    >
                  </v-list-item-content>

                  <v-list-item-icon>
                    <v-btn text icon color="#FE6150">
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
                $ 520 MX
              </h4>
            </v-card-text>
            <v-btn color="error" dark block>Pagar</v-btn>
          </v-card>
        </v-col>
      </v-row>
    </section>
  </div>
</template>

<script>
export default {
  transition: "home",
  head: {
    title: "Adquiere tus ebooks",
  },
  data() {
    return {
      libros: [
        {
          title: "Psicologia del color",
          img: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
          autor: "Anderson Helvica",
          pre: 190.0,
        },
        {
          title: "Psicologia del color",
          img: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
          autor: "Anderson Helvica",
          pre: 190.0,
        },
        {
          title: "Psicologia del color",
          img: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
          autor: "Anderson Helvica",
          pre: 190.0,
        },
      ],
    };
  },

  methods: {},
};
</script>
<style>
.margen {
  margin-top: -10px;
}
</style>