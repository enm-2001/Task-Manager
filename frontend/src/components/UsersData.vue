<template>
  <div>
    <div class="table">
      <h2>Users Data</h2>
      <table>
        <thead>
          <tr>
            <th>User id</th>
            <th>Name of user</th>
            <th>Username</th>
            <th>User Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.user_id">
            <td>{{ user.user_id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.user_type }}</td>
            <td>
              <button @click="deleteUser(user.user_id)" class="delete">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from '../routes/routes';
export default {
  name: "UsersData",
  data() {
    return {
      users: [],
    };
  },
  methods: {
    deleteUser(user_id) {
      axios
        .post("http://localhost:5000/deleteUserTask", { user_id })
        .then((res) => {
          axios.post("http://localhost:5000/deleteUser", { user_id });
          console.log(res);
          const index = this.users.findIndex(
            (item) => item.user_id === user_id
          );
          if (index >= 0) {
            this.users.splice(index, 1);
          }
        })
        .catch((err) => console.log(err));
    },
  },
  created() {
            if(!localStorage.getItem('user')){
                router.push('/login')
            }
    axios
      .get("http://localhost:5000/users")
      .then((res) => (this.users = res.data))
      .catch((err) => console.log(err));
  },
};
</script>

<style scoped>
</style>