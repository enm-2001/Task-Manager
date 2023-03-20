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
            <div v-for="user in users" :key="user.user_id">
              <td class="td" v-if="user.user_id == task.user_id">
                {{ user.name }}
              </td>
            </div>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "TasksData",
  props: {
    users: [],
    tasks: [],
  },
};
</script>

<style scoped>
/* .td{
    width: 100%;
} */
</style>