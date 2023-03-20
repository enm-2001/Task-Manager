import LoGin from '../components/LoGin'
import SignUp from '../components/SignUp'
import HomePage from '../components/HomePage'
import TaskList from '../components/TaskList'
import CreateTask from '../components/CreateTask'
import ProfilePage from '../components/ProfilePage'
import UpdateTask from '../components/UpdateTask'
import AdminPanel from '../components/AdminPanel'
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoGin },
  { path: '/signup', component: SignUp },
  { path: '/tasklist', component: TaskList },
  { path: '/createtask', component: CreateTask },
  { path: '/profile', component: ProfilePage },
  { path: '/task/:id', component: UpdateTask },
  { path: '/admin', component: AdminPanel },
];


const router = createRouter({
  history: createWebHistory(),
  routes
});


export default router;
