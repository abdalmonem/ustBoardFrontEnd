<template>
  <div class="mainContainer">
    <div class="loginBox">
      <du-input
        :label="usernameLabel"
        :username="usernameLabel"
        :labelColor="labelColor"
        :inputBorder="inputBorder"
        :value="user.username"
        @input="user.username = $event.target.value"/>
      <div style="width: 20px; height: 30px;"></div>
      <du-input
        :label="passowrdLabel"
        :passowrd="passowrdLabel"
        :inputBorder="inputBorder"
        :labelColor="labelColor"
        :value="user.password"
        @input="user.password = $event.target.value"/>
      <div style="width: 20px; height: 30px;"></div>
      <div class="controllArea">
<<<<<<< HEAD
        <du-button @click.prevent="handleInput" text="دخول"/>
=======
        <du-button text="كلمة المرور" @click="login()"/>
>>>>>>> 2cf29382412e2da9522beee37927f698d8759c2c
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
      user: {
        username: '',
        password: '',
      },
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
<<<<<<< HEAD
    handleInput() {
      // 
=======
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
>>>>>>> 2cf29382412e2da9522beee37927f698d8759c2c
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
