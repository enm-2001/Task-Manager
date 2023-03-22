<template>
  <div>
    <!-- <div>
        <SideBar />
    </div> -->
    <div>
    <form @submit.prevent="create">
      <label for="title">Task Title</label>
      <input type="text" id="title" v-model="taskData.title" required />

      <label for="desc">Description</label>
      <input type="text" id="desc" v-model="taskData.desc" required />

      <label for="due">Due-date</label>
      <input type="date" id="due" v-model="taskData.due" />

      <label for="status">Status</label>
        <div class="radio">
      <input type="radio" name="status" value="Pending" v-model="taskData.status">Pending
      <input type="radio" name="status" value="In Progress" v-model="taskData.status">In Progress
      <input type="radio" name="status" value="Completed" v-model="taskData.status">Completed
      </div>
      <br>

      <button type="submit">Add Task</button>
    </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from '@/routes/routes';
// import SideBar from './SideBar.vue'
export default {
  name: "CreateTask",
  components: {
    // SideBar
  },
  data() {
    return {
        taskData: {
            title: '',
            desc: '',
            due: '',
            status: '',
            user_id: 0
        }
    };
  },
  methods: {
        create() {
            const item =  localStorage.getItem('user')
            const myItem = JSON.parse(item)
            this.taskData.user_id = myItem.user_id 
          axios
            .post("http://localhost:5000/tasks", this.taskData)
            .then((response) => {
              console.log(response);
              router.push('/tasklist')
            })
            .catch((err) => console.log(err));
        },
      },
      created(){
   const user = JSON.parse(localStorage.getItem('user'))
            if(!user){
                router.push('/login')
            }
            else if(user && user.user_type == 'admin'){
                router.push('/admin')
            }
      }
};
</script>

<style scoped>
</style>