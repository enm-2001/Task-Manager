<template>
  <div>
    <form @submit.prevent="update">
      <label for="title">Task Title</label>
      <input type="text" id="title" v-model="task.title" required />

      <label for="desc">Description</label>
      <input type="text" id="desc" v-model="task.description" required />

      <label for="due">Due-date</label>
      <input type="date" id="due" v-model="task.due_date" required />

      <label for="status">Status</label>
        <div class="radio">
      <input type="radio" name="status" value="Pending" v-model="task.status">Pending
      <input type="radio" name="status" value="In Progress" v-model="task.status">In Progress
      <input type="radio" name="status" value="Completed" v-model="task.status">Completed
      </div>
      <br>

      <button type="submit">Update Task</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from '@/routes/routes';
export default {
  name: "UpdateTask",
  data() {
    return {
      task: {},
    };
  },
  methods: {
    update(){
        // console.log(this.task.task_id);
        axios.put(`http://localhost:5000/tasks/${this.task.task_id}`, this.task )
        .then(res => {
            console.log(res.data),
            router.push('/tasklist')
        })
        .catch(err => console.log(err))
    }
  },
  mounted() {
    const id = this.$route.params.id;
    axios
      .get(`http://localhost:5000/task/${id}`)
      .then((res) => (this.task = res.data[0]));
  },
};
</script>

<style scoped>
</style>