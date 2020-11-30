<template>
  <div class="nav">
      <div class="logo"><img src="../assets/logo.jpg" alt="UST LOGO"></div>
      <div class="">
        <router-link to="/"><h1>جامعة العلوم والتقانة</h1></router-link>
        <h3>المركز الإعلامي</h3>
      </div>
  </div>
</template>

<style scoped>
  a {
    text-decoration: none;
  }
  .nav {
    background: #fff;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    box-shadow: 0px 5px 10px rgba(91, 91, 91, 0.1);
    padding-right: 15px;
    padding-left: 15px;
  }
  .logo {
    width: 8%;
  }
  .logo img {
    width: 100%
  }
  div h1 {
    margin: 5px 0;
    color: #34495e;
  }
  div h3 {
  margin: 5px 0 20px 0;
  color: rgba(0, 0, 0, 0.5);;
  }
</style>
