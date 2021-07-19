<template>
  <div style="background: #ccc" class="d-flex justify-center">
    <client-only>
      <pdf        
        style="width: 900px"
        :src="`https://read-and-read-bck.s3.us-west-1.amazonaws.com/fileBook/${ $route.query.q }`"
        @loaded="loaded"
        @progress="progress"
        @num-pages="pageCount = $event"
        @page-loaded="pageLoaded"
        :page="nextPage"
      ></pdf>
      <v-row
        class="loading fill-height"
        v-if="loading"        
        align-content="center"
        justify="center"
      >
        <v-col class="text-subtitle-1 text-center" cols="12">
          Cargando libro...
        </v-col>
        <v-col cols="6">
          <v-progress-linear
            color="deep-purple accent"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
        </v-col>
      </v-row>
    </client-only>
    <div class="snackbar-pdf-controls">
      <v-btn
        :disabled="disabledBtnBack"
        small
        color="white"
        fab
        @click="nextPage = nextPage - 1"
      >
        <v-icon color="black">mdi-arrow-left-circle</v-icon>
      </v-btn>
      <div class="box-pages-count">{{ currentPage }} / {{ pageCount }}</div>
      <v-btn
        :disabled="disabledBtnNext"
        small
        fab
        color="white"
        @click="nextPage = nextPage + 1"
      >
        <v-icon color="black">mdi-arrow-right-circle</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
var pdf;
if (process.browser) {
  pdf = require("vue-pdf").default;
}

export default {
  layout: "user",
  components: {
    pdf,
  },

  async created(){
    const { id } =  this.$route.params;
    try {
      const data =  await this.$axios.$get(`/user/book/${ id }`)    
      this.nextPage = data.book.currentPage;  
      this.flagFirstRender = true;
    } catch (error) {
      console.log(error)
    }
  },

  data() {
    return {
      currentPage: 0,
      pageCount: 0,
      nextPage: 0,
      disabledBtnBack: true,
      disabledBtnNext: false,
      loading: true,
      flagFirstRender: false
    };
  },

  methods: {
    pageLoaded(page) {
      this.currentPage = page;     
    },
    loaded() {
      this.loading = false;
    },
    progress() {
      this.loading = true;
    },

    updateChangePage(pag){
      const { id } =  this.$route.params;
      this.$axios.$put(`/user/book/${ id }`, { currentPage: pag })
    }

  },

  watch: {
    nextPage(val) {      
      this.$vuetify.goTo(0);            
      console.log(val)
      if (val === 1) {
        this.disabledBtnBack = true;
        this.disabledBtnNext = false;
      } else if (val >= this.pageCount) {
        this.disabledBtnBack = false;
        this.disabledBtnNext = true;
      } else {
        this.disabledBtnBack = false;
        this.disabledBtnNext = false; 
      }

      if(this.flagFirstRender) {
        this.flagFirstRender = false;
        return;
      };

      this.updateChangePage(val)

    },
  },
};
</script>

<style scoped>
.snackbar-pdf-controls {
  position: fixed;
  bottom: 30px;
  left: 30px;
  width: 300px;
  background: #fff;
  box-shadow: 5px 5px 8px #555;
  padding: 10px 5px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
}

.box-pages-count {
  padding: 5px 10px;
  border: 1px solid #555;
  text-align: center;
  font-weight: bold;
  border-radius: 4px;
  margin: 0 10px;
}

.loading {
  height: auto;
  width: 300px;
  position: fixed;
  background: #fff;
  top: 50vh;
}
</style>