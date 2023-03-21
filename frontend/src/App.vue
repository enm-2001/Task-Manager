<template>
  <div id="app">
    <div v-if="userLogged"><SideBar user = "user"/></div>
    <div v-if="adminLogged"><SideBar user = "admin"/></div>
    <div v-if="userNotLogged">
      <button><router-link to="/login">Login</router-link></button>&nbsp;
      <button><router-link to="/signup">Signup</router-link></button>
      <br>
      <h1>Welcome to Task Manager!</h1>
    </div>
    <div id="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { watch, ref } from "vue";
import { useRoute } from "vue-router";
import SideBar from "./components/SideBar";
import router from './routes/routes';
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
    let adminLogged = ref(false);
    let userNotLogged = ref(false);

    watch(
      () => route.fullPath,
      (newPath, oldPath) => {
        console.log("Route changed from", oldPath, "to", newPath);
        const user = JSON.parse(localStorage.getItem("user"))
        if (user && user.user_type == 'user') {
        // if (newPath != "/login" && newPath != "/signup" && newPath != '/admin') {
          userLogged.value = true;
          adminLogged.value = false;
          userNotLogged.value = false;
        } 
        else if(user && user.user_type == 'admin'){
          adminLogged.value = true;
          userLogged.value = false;
          userNotLogged.value = false;
        }
        else {
          if(newPath == '/'){
            userNotLogged.value = true;
          }
          else{
            userNotLogged.value = false;
          }
          userLogged.value = false;
          adminLogged.value = false;
        }
      }
    );

    return {
      userLogged,
      userNotLogged,
      adminLogged
    };
  },
  created() {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user && user.user_type == 'user') {
      router.push("/home");
    }
    else if(user && user.user_type == 'admin'){
      router.push("/admin")
    }
    this.userNotLogged = true;
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
