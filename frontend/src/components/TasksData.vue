<template>
  <div>
    <div class="table">
      <h2>Tasks Data</h2>
      <table>
        <thead>
          <tr>
            <th>Task id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Due-date</th>
            <th>Status</th>
            <th>Name of user</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.task_id">
            <td>{{ task.task_id }}</td>
            <td>{{ task.title }}</td>
            <td>{{ task.description }}</td>
            <td>{{ task.due_date }}</td>
            <td>{{ task.status }}</td>
            <td>
            <div v-for="user in users" :key="user.user_id">
              <div class="td" v-if="user.user_id == task.user_id">
                {{ user.name }}
              </div>
            </div>
            </td>
            <td>
            <button @click="deleteTask(task.task_id)" class="delete">
              Delete
            </button>
          </td>
          <td><button @click="updateTask(task.task_id)" class="update">Update</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import router from '../routes/routes';
// import axios from 'axios';
// import router from '../routes/routes';
export default {
  name: "TasksData",
  data(){
    return{
      tasks: [],
      users: []
    }
  },
  methods: {
    deleteTask(task_id) {
      axios.post("http://localhost:5000/deleteTask", { task_id })
      .then(res => {
        console.log(res);
        const index = this.tasks.findIndex(item => item.task_id === task_id);
      if (index >= 0) {
        this.tasks.splice(index, 1);
      }
    })
      .catch(err => console.log(err))
    },
    updateTask(task_id){
      console.log(task_id);
      router.push(`/task/${task_id}`)
    }
  },
  created(){
            if(!localStorage.getItem('user')){
                router.push('/login')
            }
    axios
      .get("http://localhost:5000/users")
      .then((res) => (this.users = res.data))
      .catch((err) => console.log(err)),
      axios
        .get("http://localhost:5000/tasklist")
        .then((res) => {
          this.tasks = res.data
          this.tasks = this.tasks.sort((a,b) => {
            return a.task_id - b.task_id
          })
        })
        .catch((err) => console.log(err));
  }
};
</script>

<style scoped>
/* .td{
    width: 100%;
} */
</style>