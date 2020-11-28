<template>
  <div class="notification-layout">
    <div class="notification-info">
      <div>
        <header> {{ notification.name }} </header>
        <span> {{ notification.date }} </span>
        <span class="group">المجموعة {{ notification.group }}</span>
      </div>
      <i class="fa fa-info"></i>
    </div>
  </div>
</template>

<script>

export default {
  props: ['notification'],
};

</script>

<style scoped>

.notification-layout {
  box-shadow: 0px 6px 25px -10px rgba(168,163,168,1);
  margin: 15px 0;
  padding: 10px;
  width: 45%;
  border: 1px solid #f7f7ed;
}
.notification-layout header {
  font-size: 20px;
  font-weight: bold;
  color: #34495e;
  margin: 10px 0;
}

.notification-info {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
}
.notification-info span {
  margin-left: 20px;
  font-size: 18px;
}
.notification-info i {
  background-color: #3498db;
  color: #fff;
  padding: 10px;
  border-radius: 50%;
  font-size: 20px;
  width: 20px;
  text-align: center;
}

</style>
