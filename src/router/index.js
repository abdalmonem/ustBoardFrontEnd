import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/Home.vue';
import LoginPage from '../views/Login.vue';
import LecturesPage from '../views/Lectures.vue';
import Notifications from '../views/Notifications.vue';
import PushNotificationPage from '../views/PushNotificationPage.vue';
import Users from '../views/Users.vue';
import Departments from '../views/Departments.vue';
import Materials from '../views/Materials.vue';
import Groups from '../views/Groups.vue';
import AddNewOrEditGroup from '../views/AddNewOrEditGroup.vue';
import Results from '../views/Results.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
  },
  {
    path: '/Departments',
    name: 'Departments',
    component: Departments,
  },
  {
    path: '/lectures',
    name: 'Lectures',
    component: LecturesPage,
  },
  {
    path: '/materials',
    name: 'Materials',
    component: Materials,
  },
  {
    path: '/groups',
    name: 'Groups',
    component: Groups,
  },
  {
    path: '/addNewGroup',
    name: 'AddNewGroup',
    component: AddNewOrEditGroup,
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: Notifications,
  },
  {
    path: '/pushNotification',
    name: 'PushNotification',
    component: PushNotificationPage,
  },
  {
    path: '/results',
    name: 'Results',
    component: Results,
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
