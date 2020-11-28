<template>
  <div class="login-container">
    <app-login-form></app-login-form>
    <router-view />
  </div>
</template>

<script>

import Login from '../components/auth/LoginForm.vue';

export default {
  components: {
    appLoginForm: Login,
  },
};
</script>
