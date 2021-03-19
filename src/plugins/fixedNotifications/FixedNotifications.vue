<template>
  <div class="NotificationsArea" ref="NotificationsAreaRef">
    <div class="cell" v-for="item in currentNotificationsOnDisplay" :key="item.id">
      <div class="thumb"
           :style="getThumbStyle(item)"></div>
      <div style="width: 20px;height: 20px;"></div>
      <div class="infoSide">
        <div class="theTitle" :style="getTitleStyle(item)">{{ item.title }}</div>
        <div class="theDesc">{{ item.description }}</div>
      </div>
      <img src="../../assets/icons/b/close.png" class="close" @click="removeNotification(item.id)"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FixedNotifications',
  props: ['items'],
  created() {
  },
  mounted() {
    document.addEventListener('fixedNotificationEventCreate', (e) => {
      this.currentNotificationsOnDisplay.push(e.data);
      if (e.data.hideAfter !== null) {
        setTimeout(() => {
          this.removeNotification(e.data.id);
        }, e.data.hideAfter * 1000);
      }
    });
  },
  data() {
    return {
      currentNotificationsOnDisplay: [],
      xxx: 'zzz',
    };
  },
  methods: {
    removeNotification(id) {
      this.currentNotificationsOnDisplay.forEach((item, index) => {
        if (item.id === id) {
          this.currentNotificationsOnDisplay.splice(index, 1);
        }
      });
    },
    getTitleStyle(itemData) {
      const styleObj = {};
      let color = '#000';
      if (itemData.color !== undefined) {
        color = itemData.color;
      }
      styleObj.color = color;
      return styleObj;
    },
    getThumbStyle(itemData) {
      const styleObj = {};
      styleObj.backgroundImage = `url(${itemData.icon})`;
      let color = 'transparent';
      if (itemData.color !== undefined) {
        color = itemData.color;
      }
      styleObj.backgroundColor = color;
      return styleObj;
    },
    // eslint-disable-next-line no-unused-vars
    create(title, icon, description, onClick) {
      alert(this.xxx);
    },
  },
  computed: {
  },
  watch: {
    items(x) {
      alert(x);
    },
  },
};
</script>

<style scoped>
  .NotificationsArea{
    position: fixed;
    z-index: 200;
    width: 30%;
    margin: 20px 5%;
    top: 0;
    left: 0;
  }
  .cell{
    background: #fff;
    box-shadow: 0 0 5px #eee;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    margin-bottom: 10px;
    align-items: center;
  }
  .cell .thumb{
    width: 70px;
    height: 70px;
    background-color: #eee;
    background-size: 50%;
    background-position: center;
    background-repeat: no-repeat;
  }

  .infoSide{
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
  }

  .theTitle{
    font-size: 14px;
    font-weight: bold;
  }
  .theDesc{
    margin-top: 5px;
    font-size: 14px;
  }

  .close{
    width: 20px;
    height: 20px;
    justify-self: center;
    align-self: center;
    padding: 25px;
    cursor: pointer;
  }

  .close:hover{
    background-color: #eee;
  }
</style>
