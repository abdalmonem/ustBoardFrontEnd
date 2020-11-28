<template>
  <div class="notifications">
    <h3>Notifications Page</h3>
    <app-notifications></app-notifications>
    <!-- <header>
      <router-link
        :to="{ name: 'add-notify'}"
        >
        <i class="fa fa-plus-circul"></i>
        إشعار جديد
      </router-link>
    </header> -->
    <!-- <router-view /> -->
    <h3></h3>
  </div>
</template>

<script>

import Notifications from '../components/notifications/Notifications.vue';

export default {
  components: {
    appNotifications: Notifications,
  },
};

</script>

<style scoped>

.notifications {
  padding-left: 15px;
  padding-right: 15px;
}
header a{
  text-decoration: none;
  padding: 5px 15px;
  margin: 30px 0;
  font-size: 15px;
  border-radius: 20px;
  border: 1px solid #2980b9;
  color: #fff;
  background-color: #3498db;
  font-weight: bold;
}

</style>
