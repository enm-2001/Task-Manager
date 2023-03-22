<template>
  <div>
    <div class="table" v-if="tasks.length">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due-date</th>
            <th>Status</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.task_id">
            <td>{{ task.title }}</td>
            <td>{{ task.description }}</td>
            <td>{{ task.due_date }}</td>
            <td>{{ task.status }}</td>
            <td>
              <button @click="deleteTask(task.task_id)" class="delete">
                Delete
              </button>
            </td>
            <td>
              <button @click="updateTask(task.task_id)" class="update">
                Update
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <h1 v-else>No Tasks</h1>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/routes/routes";
export default {
  name: "TaskList",

  data() {
    return {
      tasklist: [],
      tasks: [],
      newList: null,
    };
  },
  methods: {
    deleteTask(task_id) {
      axios
        .post("http://localhost:5000/deleteTask", { task_id })
        .then((res) => {
          console.log(res);
          const index = this.tasks.findIndex(
            (item) => item.task_id === task_id
          );
          if (index >= 0) {
            this.tasks.splice(index, 1);
          }
        })
        .catch((err) => console.log(err));
    },

    updateTask(task_id) {
      console.log(task_id);
      router.push(`/task/${task_id}`);
    },
  },
  created() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      router.push("/login");
    } else if (user && user.user_type == "admin") {
      router.push("/admin");
    }
  },
  mounted() {
    axios
      .get("http://localhost:5000/tasklist")
      .then((res) => {
        this.tasklist = res.data;
        const item = localStorage.getItem("user");
        const myItem = JSON.parse(item);
        this.tasks = this.tasklist.filter(
          (item) => item.user_id == `${myItem.user_id}`
        );
        this.tasks = this.tasks.sort((a, b) => {
            return a.task_id - b.task_id;
          });
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style>
table {
  border-collapse: collapse;
  width: 100%;
}

.table {
  margin-left: 250px;
}

th,
td {
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}
</style>