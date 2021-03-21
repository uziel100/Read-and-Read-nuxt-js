<template>
  <div style="background: #ccc" class="d-flex justify-center">
    <no-ssr>
      <pdf
        style="width: 900px"
        src="https://d3a1k1s7tqtsjr.cloudfront.net/fileBook/example-book-js.pdf"
        @num-pages="pageCount = $event"
        @page-loaded="currentPage = $event"
        :page="nextPage"
      ></pdf>
    </no-ssr>
    <div class="snackbar-pdf-controls">
      <v-btn :disabled="disabledBtnBack" small color="white" fab @click="nextPage = nextPage - 1">
        <v-icon color="black">mdi-arrow-left-circle</v-icon>
      </v-btn>
      <div class="box-pages-count">{{ currentPage }} / {{ pageCount }}</div>
      <v-btn :disabled="disabledBtnNext" small fab color="white" @click="nextPage = nextPage + 1">
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
  data() {
    return {
      currentPage: 0,
      pageCount: 0,
      nextPage: 1,
      disabledBtnBack: true,
      disabledBtnNext: false,
    };
  },

  watch:{
    nextPage( val ){
      console.log(val)
      if(val === 1){
        this.disabledBtnBack = true;
        this.disabledBtnNext = false;
      }else if(val >= this.pageCount){
        this.disabledBtnBack = false;
        this.disabledBtnNext = true;
      }else{
        this.disabledBtnBack = false;
        this.disabledBtnNext = false;
      }
    }
  },
  
};
</script>

<style>
.snackbar-pdf-controls{
  position: fixed;
  bottom: 40px;  
  width: 300px;  
  background: #fff;
  box-shadow: 5px 5px 8px #ccc, 5px 5px 4px #ccc ;
  padding: 10px 5px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
}

.box-pages-count{
  padding: 5px 10px;
  border: 1px solid #555;
  text-align: center;
  font-weight: bold;
  border-radius: 4px;
  margin: 0 10px;
}
</style>