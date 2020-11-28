<template>
  <div class="tabels-navbar">
    <ul>
        <router-link
          tag="li"
          :to="{ name: 'lectures' }"
          exact >المحاضرات
        </router-link>
        <router-link
          tag="li"
          :to="{ name: 'labs' }"
          >المعامل
        </router-link>
      </ul>
      <router-view />
  </div>
</template>

<script>

export default {
};

</script>

<style scoped>

a.active {
  color: #3498db;
}
ul {
  display: flex;
  flex-flow: row wrap;
  list-style: none;
  padding: 15px;
}
ul a {
  font-size: 20px;
  margin-right: 5px;
  text-decoration: none;
  background-color: #3498db;
  padding: 5px 10px;
  border-radius: 20px;
  color: #fff;
}
</style>
