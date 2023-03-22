<template>
    <div class="sidebar">
      <div v-if="user == 'user'">
    <h2>Hello {{user}}!</h2>
    <ul>
      <!-- <li><router-link to="/">Home</router-link></li> -->
      <li><router-link to="/profile">Profile</router-link></li>
      <li><router-link to="/createtask">Create Task</router-link></li>
      <li><router-link to="/tasklist">Task List</router-link></li>
      <button class="signout" @click="signout"><router-link to="/login">Sign Out</router-link></button>
    </ul>
    </div>
    <div v-else>
        <h2>Hello {{user}}!</h2>
    <ul>
      <li><router-link to="/admin">Home</router-link></li>
      <li><router-link to="/usersdata">Users Data</router-link></li>
      <li><router-link to="/tasksdata">Tasks Data</router-link></li>
      <button class="signout" @click="signout"><router-link to="/login">Sign Out</router-link></button>
    </ul>
    </div>
  </div>
</template>

<script>
import router from '../routes/routes'
    export default {
        name: 'SideBar',
        props: ['user'],
        methods : {
            signout(){
                localStorage.removeItem('user')
                router.push('/login')
            }
        },
      
    }
</script>

<style>
.sidebar {
  background-color: #f5f5f5;
  width: 200px;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  padding: 20px;
  text-align: left;
}

.sidebar h2 {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  margin-bottom: 10px;
}

.sidebar a {
  text-decoration: none;
  color: #333;
}

.signout {
    margin-top: 400px;
    font-size: 1.0rem;
}
</style>