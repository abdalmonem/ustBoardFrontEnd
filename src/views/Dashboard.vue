<template>
  <div class="dashboard">
    <ul>
      <router-link
        tag="li"
        :to="{ name: 'lectures' }"
        exact
        active-class="active">
        الجداول
        <i class="fa fa-chevron-left"></i>
      </router-link>
      <router-link
        tag="li"
        :to="{ name: 'notifications' }"
        exact
        active-class="active">
        الإشعارات
        <i class="fa fa-chevron-left"></i>
      </router-link>
      <router-link
        tag="li"
        :to="{ name: 'students' }"
        exact
        active-class="active">
        الطلاب
        <i class="fa fa-chevron-left"></i>
      </router-link>
      <router-link
        tag="li"
        :to="{ name: 'teachers' }"
        exact
        active-class="active">
        الأساتذة
      </router-link>
    </ul>
    <router-view />
    <!-- <router-view name="tabels" /> -->
    <!-- <router-view name="notifications" /> -->
  </div>
</template>

<script>
</script>

<style scoped>

.active {
  color: #3498db;
}
i.fa-chevron-left {
  font-size: 15px;
}
ul {
  display: flex;
  flex-flow: row wrap;
  list-style: none;
  padding: 15px;
}
ul a:first-child {
  margin-right: 0;
}
ul a {
  font-size: 20px;
  margin-right: 15px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.5);
  padding-right: 10px;
  /* border-right: 2px solid #3498db; */
}
ul a:hover {
  color: #3498db;
}

</style>
