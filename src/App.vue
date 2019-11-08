<template>
  <div id="app">
    <router-view />
    <tabBar />
  </div>
</template>

<script>
import tabBar from "./components/tabBar/tabBar.vue";
// import { reqFoodsTypes } from "./api";
import { mapActions } from 'vuex'
export default {
  components: {
    tabBar
  },
  // async mounted() {
  //   const res = await reqFoodsTypes()
  //   console.log(res)
  // }
  mounted() {
    this.getAddress()
  },
  methods: {
    ...mapActions(['getAddress'])
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
