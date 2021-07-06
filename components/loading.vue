<template>
  <div class="containerLoading">
    <v-progress-circular
      :size="70"
      :width="7"
      color="blue"
      indeterminate      
    ></v-progress-circular>
    <p class="ml-3">Cargando...</p>
  </div>
</template>

<script>
export default {};
</script>

<style>
.containerLoading{    
    display: flex;
    justify-content: center;
    align-items: center;    
    height: 100vh;
}
</style>