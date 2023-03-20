<template>
    <div>
        <p>Name: {{person.name}}</p>
        <p>Username: {{person.username}}</p>
        <p>Email: {{person.email}}</p>
        <p>Password: {{person.password}}</p>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        name: 'ProfilePage',
        data(){
            return{
                person: {
                    name: '',
                    username: '',
                    email: '',
                    password: ''
                }
            }
        },
        mounted(){
            const item =  localStorage.getItem('user')
            const myItem = JSON.parse(item)
            axios.get(`http://localhost:5000/users/${myItem.user_id}`)
            .then(res => {
                this.person = res.data[0]
                // console.log(this.person);
            })
            .catch(err => console.log(err))
        }
    }
</script>

<style scoped>

</style>