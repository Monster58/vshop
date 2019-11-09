<template>
  <div id="app">
    <router-view />
    <tabBar />
  </div>
</template>

<script>
import tabBar from "./components/tabBar/tabBar.vue";
import { mapActions } from "vuex";
export default {
  components: {
    tabBar
  },
  mounted() {
    this.getAddress();
    this.getShops();
    this.getCategorys();
  },
  methods: {
    ...mapActions(["getAddress", "getCategorys", "getShops"])
  }
};
</script>

<style lang="stylus">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f5f5f5;
}
</style>
