<template>
  <v-app id="app">
    <navigation-card />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavigationCard from "./components/NavigationCard.vue";

export default {
  components: {
    NavigationCard
  }
};
</script>

<style scoped>
</style>