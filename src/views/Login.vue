<template>
  <div class="mainContainer">
    <div class="loginBox">
      <du-input
        :label="usernameLabel"
        :labelColor="labelColor"
        :inputBorder="inputBorder"
        :value="username"
        @input="handleUsername"/>
      <div style="width: 20px; height: 30px;"></div>
      <du-input
        :label="passowrdLabel"
        :inputBorder="inputBorder"
        :labelColor="labelColor"
        :value="password"
        @input="handlePassword"/>
      <div style="width: 20px; height: 30px;"></div>
      <div class="controllArea">
        <a href="#" class="resetPasswordLink">استعادة كلمة المرور</a>
        <du-button @click.prevent="login" text="دخول"/>
      </div>
    </div>
  </div>
</template>

<script>
import mainStore from '../stores/mainStore';
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
    handleUsername(event) {
      this.username = event.target.value;
    },
    handlePassword(event) {
      this.password = event.target.value;
    },
    login() {
      new AjaxWorker().request('/api/login', {
        username: this.username, password: this.password,
      }).then((res) => {
        if (res === 'NOINTERNETCONNECTION') {
          this.$createFixedNotification(
            'خطأ في الإتصال',
            'تأكد من إتصالك بالإنترنت',
            // eslint-disable-next-line global-require
            require('../assets/icons/w/exclamationF.png'),
            null,
            '#FF065A',
            3,
          );
        } else if (res.state) {
          mainStore.dispatch('saveLogin', {
            id: res.data.id,
            authKey: res.data.auth_key,
          });
          this.$router.replace({ path: '/Home' });
        } else if (!res.state) {
          let desc = 'اسم المستخدم أو كلمة المرور خاطئة';
          if (res.reason === 'incorrect_password') {
            desc = 'كلمة المرور خاطئة';
          } else if (res.reason === 'account_not_found') {
            desc = 'لم يتم إيجاد هذا الحساب';
          }
          this.$createFixedNotification(
            '',
            desc,
            // eslint-disable-next-line global-require
            require('../assets/icons/w/exclamationF.png'),
            null,
            '#FF065A',
            3,
          );
        }
      });
    },
  },
  created() {
    if (mainStore.getters.isLogin) {
      this.$router.replace({ path: '/Home' });
    }
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
    align-items: center;
    justify-content: space-between;
  }

  .resetPasswordLink{
    color: #8F28F0;
    font-size: 13px;
  }
</style>
