<template>
  <div class="mainContainer">
    <DuButton text="إرسال إشعار جديد" style="justify-self: end;align-self: end"
              @click="goToNotificationPage"/>
  </div>
</template>

<script>
import DuButton from '@/components/DuButton.vue';
import { useRouter } from 'vue-router';

export default {
  name: 'Notifications',
  components: {
    DuButton,
  },
  setup() {
    const router = useRouter();
    const goToNotificationPage = () => {
      router.push({ path: '/pushNotification' });
    };
    return {
      goToNotificationPage,
    };
  },
};

</script>

<style scoped>
  .mainContainer{
    min-height: 500px;
    width: 70%;
    margin: 0px 15%;
    display: flex;
    flex-direction: column;
  }
</style>
