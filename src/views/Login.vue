<template>
  <div class="mainContainer">
    <div class="loginBox">
      <du-input
        :label="usernameLabel"
        :labelColor="labelColor"
        :inputBorder="inputBorder"
        :value="username"
        @input="username = $event.target.value"/>
      <div style="width: 20px; height: 30px;"></div>
      <du-input
        :label="passowrdLabel"
        :inputBorder="inputBorder"
        :labelColor="labelColor"
        :value="password"
        @input="password = $event.target.value"/>
      <div style="width: 20px; height: 30px;"></div>
      <div class="controllArea">
        <du-button @click.prevent="login" text="دخول"/>
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
  data() {
    return {
      show: false,
      username: '',
      password: '',
      labelColor: '#555',
      inputBorder: {
        border: {},
      },
      usernameLabel: 'إسم المستخدم',
      passowrdLabel: 'كلمة المرور',
    };
  },
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
        alert(this.username + ' ' + this.password);
      });
      // Axios.get('https://google.com').then((res) => {
      //   alert('dsd');
      // });
    },
  },
};

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
    justify-content: flex-start;
  }
</style>
