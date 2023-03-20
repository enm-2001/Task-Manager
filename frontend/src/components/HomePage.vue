<template>
    <h2>Welcome {{name}} !!</h2>
</template>

<script>
import router1 from '@/routes/routes'
    export default {
        name: 'HomePage',
        data(){
            return{
                name: ''
            }
        },
        created(){
            if(!localStorage.getItem('user')){
                router1.push('/login')
            }
            else{
                const user = JSON.parse(localStorage.getItem('user'))
                this.name = user.name
            }
        }
    }
</script>

<style scoped>

</style>