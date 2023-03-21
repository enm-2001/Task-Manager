<template>
  <div>
    <!-- <div class="sidebar">
    <h2>Hello admin!</h2>
      <button class="button" @click="activeTab = 'UsersData'">Users Data</button>
      <br>
      <button class="button" @click="activeTab = 'TasksData'">Tasks Data</button>
      <br>
      <button class="signout" @click="signout"><router-link to="/login">Sign Out</router-link></button>
    </div>

    <component :is="activeTab" :users = 'users' :tasks = 'tasks'/> -->
    Hello {{ name }}!!
  </div>
</template>

<script>
import axios from "axios";
import router from '../routes/routes';
export default {
  name: "AdminPanel",
  data() {
    return {
      name: "",
    };
  },
  created() {
    if (!localStorage.getItem("user")) {
      router.push("/login");
    } else {
      const user = JSON.parse(localStorage.getItem("user"));
      this.name = user.name;
    }
    axios
      .get("http://localhost:5000/users")
      .then((res) => (this.users = res.data))
      .catch((err) => console.log(err)),
      axios
        .get("http://localhost:5000/tasklist")
        .then((res) => {
          this.tasks = res.data;
          this.tasks = this.tasks.sort((a, b) => {
            return a.task_id - b.task_id;
          });
        })
        .catch((err) => console.log(err));
  },
};
</script>

<style scoped>
.button {
  /* margin-top: 400px; */
  display: block;
  /* width: 100%; */
  padding: 0px;
  border: none;
  border-radius: 5px;
  background-color: #f5f5f5;
  /* color: white; */
  font-size: 16px;
  cursor: pointer;
}
</style>