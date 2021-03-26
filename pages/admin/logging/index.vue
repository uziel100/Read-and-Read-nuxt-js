<template>
  <section>
    <v-simple-table fixed-header height="400px">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Tipo</th>
            <th class="text-left">Descripción</th>
            <th class="text-left">Direc. ip</th>
            <th class="text-left">User</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="log in logs" :key="log._id">
                <th>{{ log.type }}</th>
                <th>{{ log.description }}</th>
                <th>{{ log.ip }}</th>
                <th>{{ log.user }}</th>
            </tr>
        </tbody>
      </template>
    </v-simple-table>
  </section>
</template>

<script>
export default {
  layout: "admin",
  async asyncData({ error, $axios }) {
    try {
      const logs = await $axios.$get("logging");
      return {
        logs: logs.data,
      };
    } catch (err) {
      console.log(err)
    }
  },
};
</script>

<style>
</style>