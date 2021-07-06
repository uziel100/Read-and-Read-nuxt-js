<template>
  <v-card    
    :class="margin"
    height="auto"
    :width="width"    
    :title="title"   
    color="cards"               
  >
    <v-img
      @click="goDetailBook"
      :src="img"
      height="240"
      style="cursor: pointer"
    ></v-img>
    <v-card-text>
      <div>{{ title | spliceText }}</div>
      <v-card-title class="pa-0 text-black">$ {{ price }} MX</v-card-title>
    </v-card-text>
    <v-btn @click="handleAddProductCart(idBook)" color="red" dark class="text-none" block>Agregar al carrito</v-btn>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    idBook: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },    

    active:{
      type: Boolean,
      required: false
    },
    
    img: {
      type: String,
      required: true
    },
    margin: {
      type: String,
      required: false,
      default: 'ma-0'
    },

    width: {
      type: Number,
      required: false,
      default: 250
    }
  },
  methods:{
    ...mapActions(["showNotification"]),
    ...mapActions("cart", ["addProductToCart"]),

    goDetailBook(){
      this.$router.push(`/libro/${ this.idBook }`)
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
          type: "accent",
        });
      }
    },
  },

  filters: {
    spliceText(value){
      if(value.length > 17){
        value = value.slice(0, 17) + "..."
      }
      return value;
    }
  }
};
</script>
