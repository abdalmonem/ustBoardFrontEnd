import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/Home.vue';
import LoginPage from '../views/Login.vue';
import DashboardPage from '../views/Dashboard.vue';
import TabelsPage from '../views/Tabels.vue';
import LabTabelView from '../views/LabTabelGroup.vue';
import LectTabelView from '../views/LectTabelGroup.vue';
import LabPage from '../views/Labs.vue';
import LecturesPage from '../views/Lectures.vue';
import NotificationsPage from '../views/Notifications.vue';
import StudentsPage from '../views/Students.vue';
import TeachersPage from '../views/Teachers.vue';

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
    path: '/dashboard',
    name: 'dashboard',
    components: {
      default: DashboardPage,
    },
    children: [
      {
        path: 'tabels',
        name: 'tabels',
        components: {
          default: TabelsPage,
        },
        children: [
          {
            path: 'labs',
            name: 'labs',
            component: LabPage,
            children: [
              {
                path: ':labID',
                component: LabTabelView,
              },
            ],
          },
          {
            path: 'lectures',
            name: 'lectures',
            component: LecturesPage,
            children: [
              {
                path: ':lectID',
                component: LectTabelView,
              },
            ],
          },
        ],
      },
      {
        path: 'notifications',
        name: 'notifications',
        components: {
          default: NotificationsPage,
        },
      },
      {
        path: 'students',
        name: 'students',
        component: StudentsPage,
      },
      {
        path: 'teachers',
        name: 'teachers',
        component: TeachersPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
