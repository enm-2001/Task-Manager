<template>
  <div>
    <!-- <button class="signup">Signup</button> -->
    <form @submit.prevent="checkUser">
      <span v-if="!userExists">User does not exist</span>
      <span v-if="incorrect">Incorrect Password</span>
      <label for="uname">Username</label>
      <input type="text" id="uname" v-model="uname" required />
      <br />

      <label for="pwd">Password</label>
      <input type="password" id="pwd" v-model="password" required />

      <br />
      <button type="submit">Login</button>
    </form>
    <br>
    <div>Not a user? &nbsp;<router-link to="/signup">Sign up</router-link></div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../routes/routes";
export default {
  name: "LoGin",
  data() {
    return {
      uname: "",
      password: "",
      incorrect: false,
      userExists: true,
    };
  },
  methods: {
    checkUser() {
      axios
        .post("http://localhost:5000/checkUsername", { username: this.uname })
        .then((response) => {
          if (response.data.exists) {
            this.userExists = response.data.exists;
            this.checkPassword();
          } else {
            this.userExists = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    checkPassword() {
      axios
        .post("http://localhost:5000/login", {
          uname: this.uname,
          password: this.password,
        })
        .then((res) => {
            // console.log(res.data);
            if(!res.data.pcheck){
                this.incorrect = res.data.pcheck;
                localStorage.setItem("user", JSON.stringify(res.data));
                if(res.data.user_type == 'user'){
                  router.push("/");
                }
                else{
                  router.push("/admin")
                }
            }
            else{
                this.incorrect = true
            }
        })
        .catch(err => console.log(err));
    },
  },
};
</script>

<style scoped>
</style>