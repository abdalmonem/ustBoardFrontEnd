<template>
  <div>
    <app-notification
      v-for="(notify, index) in notifications" :key="index"
       :notification="notify">
    </app-notification>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import Notification from './Notification.vue';

export default {

  components: {
    appNotification: Notification,
  },
  computed: {
    ...mapGetters([
      'notifications',
    ]),
  },
};

</script>
