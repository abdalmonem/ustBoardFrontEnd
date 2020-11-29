<template>
  <div class="mainContainer">
    <div class="loginBox">
      <du-input label="اسم المستخدم"/>
      <div style="width: 20px; height: 30px;"></div>
      <du-input label="كلمة المرور"/>
      <div style="width: 20px; height: 30px;"></div>
      <div class="controllArea">
        <du-button text="كلمة المرور" @click="login()"/>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
import AjaxWorker from '../jsHelpers/AjaxWorker';
import DuInput from '../components/DuInput.vue';
import DuButton from '../components/DuButton.vue';

export default {
  components: {
    duInput: DuInput,
    duButton: DuButton,
  },
  methods: {
    makeAlert() {
      alert('hello');
    },
    login() {
      const x = new AjaxWorker();
      x.request('api/example').then((res) => {
        alert(res);
      });
      // Axios.get('https://google.com').then((res) => {
      //   alert('dsd');
      // });
    },
  },
};
/*
import Login from '../components/auth/LoginForm.vue';

export default {
  components: {
    appLoginForm: Login,
  },
}; */
</script>

<style scoped>
  .mainContainer{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
  }

  .loginBox{
    width: 25%;
    padding: 2%;
    border-radius: 8px;
    margin-top: 100px;
    background: #fff;
    display: flex;
    flex-direction: column;
  }

  .controllArea{
    display: flex;
    flex-direction: row;
    align-content: space-between;
    justify-content: end;
  }
</style>
