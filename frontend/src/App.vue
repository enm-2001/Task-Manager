<template>
  <div id="app">
    <div v-if="userLogged"><SideBar /></div>
    <div id="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { watch, ref } from "vue";
import { useRoute } from "vue-router";
import SideBar from "./components/SideBar";
export default {
  name: "App",
  components: {
    SideBar,
  },
  // data() {
  //   return {
  //     userLogged: false,
  //   };
  // },
  setup() {
    const route = useRoute();
    let userLogged = ref(false);

    watch(
      () => route.fullPath,
      (newPath, oldPath) => {
        console.log("Route changed from", oldPath, "to", newPath);
        // if (localStorage.getItem("user")) {
        if (newPath != "/login" && newPath != "/signup" && newPath != '/admin') {
          userLogged.value = true;
        } else {
          userLogged.value = false;
        }
      }
    );

    return {
      userLogged,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 55px;
}
</style>
