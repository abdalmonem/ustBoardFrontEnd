<template>
  <div class="mainContainer application">
    <app-header></app-header>
    <router-view />
    <!-- <router-view name="tabel" /> -->
    <!-- <router-view name="notifications" /> -->
  </div>
</template>

<script>

import mainStore from './stores/mainStore';
import Header from './components/Header.vue';
import AjaxWorker from './jsHelpers/AjaxWorker';

export default {
  components: {
    appHeader: Header,
  },
  created() {
    (async () => {
      await mainStore.dispatch('init');
      if (mainStore.getters.isLogin) {
        new AjaxWorker().request('/api/getMyData')
          .then((res) => {
            if (res.state) {
              mainStore.commit('myData', { data: res.data });
            } else {
              this.$createDialog({
                title: 'تم تسجيل خروجك',
                description: 'لم تعد الجلسة المستخدمة صالِحة , حاول تسجيل الدخول مجددًا',
                // eslint-disable-next-line global-require
                icon: require('./assets/icons/b/close.png'),
                closeButtonText: 'حسنًا',
                onClose: () => {
                  mainStore.dispatch('logout');
                  this.$router.replace({ path: '/Login' });
                },
              });
            }
          });
      }
    })();
  },
};
</script>

<style>
  /* .mainContainer{
    background: #fcfcfc;
    /* height: 100%; */
    /* position: absolute; */
  /* } */
</style>
