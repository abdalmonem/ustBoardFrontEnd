<template>
    <div class="login-form">
      <header>تسجيل الدخول</header>
      <form>
        <!-- <transition-group
          v-if="showErrors= true"
          enter-class=""
          enter-active-class="animate__animated animate__shakeX"
          leave-class=""
          leave-active-class="animate__animated animate__fadeOut">
          <div
            class="error"
            v-for="(error, index) in errors" :key="index"
            >
            {{error}}
          </div>
        </transition-group> -->
        <div>
          <label>أدخل رقم الهاتف</label>
          <input
            type="text"
            name="phone"
            id="phone"
            v-model="user.username" />
        </div>
        <div>
          <label>أدخل كلمة السر</label>
          <input
            type="password"
            name="password"
            id="password"
            v-model="user.password"/>
        </div>
        <div>
          <a href="/forgot-password">نسيت كلمة السر؟</a>
          <button @click.prevent="loginHandle">دخول</button>
        </div>
      </form>
    </div>
</template>

<script>

export default {
  name: 'login',
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      errors: [],
      showErrors: false,
    };
  },
};

</script>

<style scoped>
.error {
  background-color: #e74c3c;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}
.login-form {
  width: 50%;
  margin: 20px auto;
}
.login-form header {
  margin: 50px 0;
  font-size: 2em;
  color: #3498db;
}
form div {
  margin: 20px 0;
}
form div label,
form div:last-of-type a {
  color: #34495e;
}
form div input {
  width: 100%;
  padding: 15px 0;
  border: 2px solid #7f8c8d;
  border-radius: 5px;
}
form div label, form div input {
  display: block;
  margin: 8px 0;
  width: 99%;
}
form div:last-of-type {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}
form div label,
form div:last-of-type a,
form div:last-of-type button {
  font-size: 22px;
}
form div:last-of-type button {
  padding: 8px 22px;
  font-size: 22px;
  border-radius: 20px;
  border: 1px solid #2980b9;
  color: #fff;
  background-color: #3498db;
  align-items: center;
}
</style>
