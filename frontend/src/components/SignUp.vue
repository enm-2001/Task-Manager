<template>
  <div class="form">
    <form @submit.prevent="signup" action="/home">
      <!-- <label for="id">Id</label>
      <input type="text" id="id" v-model="formData.id" required />
      <br /> -->

      <label for="name">Full Name</label>
      <input type="text" id="name" v-model="formData.name" required />

      <label for="uname">Username</label>
      <input
        type="text"
        id="uname"
        v-model="formData.uname"
        v-on:blur="checkUsername(formData.uname)"
        required
      />
      <span class="error" v-if="usernameExists">Username already exists</span>
   

      <label for="email">Email</label>
      <input type="email" id="email" v-model="formData.email" required />

     
      <label for="pwd">Password</label>
      <input type="password" id="pwd" v-model="formData.pwd" required />



      <label for="type">User type</label>
      <div class="radio">
      <input type="radio" id="type" v-model="formData.type" value="admin"/>Admin
      <input type="radio" id="type" v-model="formData.type" value="user"/>User
      </div>
      <br />

      <button type="submit">Register</button>
    </form>
    <br>
    <div>Already a user?&nbsp; <router-link to="/login">Sign in</router-link></div>
  </div>
</template>

<script>
import axios from "axios";
import router from '@/routes/routes';
export default {
  name: "SignUp",
  data() {
    return {
      formData: {
        name: "",
        uname: "",
        email: "",
        pwd: "",
        type: "",
      },
      usernameExists : false
    };
  },
  methods: {
    signup() {
      axios
        .post("http://localhost:5000/users", this.formData)
        .then((response) => {
            console.log(response)
            router.push('/login')
        })
        .catch((err) => console.log(err));
      // console.log(this.formData);
    },
    checkUsername(username) {
      axios
        .post("http://localhost:5000/checkUsername", { username: username })
        .then((response) => {
          if (response.data.exists) {
            this.usernameExists = true
          } else {
            this.usernameExists = response.data.exists
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    if (localStorage.getItem("user")) {
      router.push("/home");
    }
  },
};
</script>

<style scoped>
</style>