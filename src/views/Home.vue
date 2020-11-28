<template>
  <div class="entery">
    <div class="img-holder">
      <img src="../assets/logo.jpg" alt="USR Logo">
    </div>
    <div class="entery-info">
      <h2>جامعة العلوم والتقانة</h2>
      <h3>المركز الإعلامي</h3>
    </div>
    <div class="entery-link">
      <a @click.prevent="redirectToLoginPage">الدخول</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Entery',
  methods: {
    redirectToLoginPage() {
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>

.entery {
  width: 30%;
  height: 500px;
  margin: 20px auto;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  text-align: center;
}
.img-holder {
  width: 50%;
}
.img-holder img {
  width: 100%;
}
.entery-info h2 {
  margin: 10px 0;
  font-size: 2em;
  color: #34495e !important;
}
.entery-info h2, .entery-info h3 {
  margin: 10px 0;
}
.entery-info h3 {
   color: rgba(0, 0, 0, 0.5);
 }
.entery-info h3, .entery-link a {
  font-size: 20px;
}
.entery-link {
  margin: 15px 0;
}
.entery-link a {
  background-color: #3498db;
  color: #fff;
  border: 1px solid #34485e;
  padding: 3px 5px;
  cursor: pointer;
}

</style>
