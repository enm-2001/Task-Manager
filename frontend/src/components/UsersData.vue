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
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.user_id">
            <td>{{ user.user_id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.user_type }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
</template>

<script>
    export default {
        name: 'UsersData',
        props: {
            users: [],
            tasks: []
        }
    }
</script>

<style scoped>

</style>