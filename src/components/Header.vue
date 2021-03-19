<template>
  <div class="header">
    <slot v-if="!isLogin()">
      <img src="../assets/logo.jpg" class="logo"/>
      <div style="width: 10px;height: 10px;"></div>
      <div class="descSide">
        <div class="theTitle">جامعة العلوم والتقانة</div>
        <div class="theInfo">المركز الإعلامي</div>
      </div>
    </slot>
    <slot v-else>
      <div class="userThumb"></div>
      <div style="width: 10px;height: 10px;"></div>
      <div class="descSide">
        <div class="username">{{ getMyName() }} {{ demo() }}</div>
        <div class="rank">{{ getMyRank() }}</div>
      </div>
    </slot>
    <div class="optionMenu" v-if="isLogin()">
      <img src="../assets/icons/b/menuF.png" @click="isContextMenuOpen = !isContextMenuOpen" />
      <duContextMenu :isOpen="isContextMenuOpen" :clickEvent="openMenuClickEvent"
        @select="onContextMenuSelect"
        @close="isContextMenuOpen=false"
        :items="[
          { key: 'edit', text: 'تعديل معلوماتي', icon: require('../assets/icons/b/editPen.png'), },
          { key: 'logout', text: 'تسجيل الخروج', icon: require('../assets/icons/b/logout.png'), },
        ]"/>
    </div>
  </div>
  <div class="mainMenu" v-if="isLogin()">
    <slot v-for="item in mainMenuItems" :key="item.title" >
      <router-link :to="item.to" class="cel"
        :style="{
        borderBottom: isSelectedMainMenuItem(item.key) ? '2px solid #8F28F0' : 0,
        color: isSelectedMainMenuItem(item.key) ? '#8F28F0' : '',
      }">
        <img :src="require(`../assets/icons/b/${ item.icon }.png`)">
        <div style="width: 10px;height: 10px;"></div>
        {{ item.title }}
      </router-link>
      <div style="width: 35px;height: 10px;"></div>
    </slot>
  </div>
</template>

<script>
import mainStore from '@/stores/mainStore';
import DuContextMenu from './DuContextMenu.vue';

export default {
  components: {
    DuContextMenu,
  },
  data() {
    return {
      isContextMenuOpen: false,
      mainMenuItems: [],
    };
  },
  methods: {
    demo() {
      const id = localStorage.getItem('id');
      const authKey = localStorage.getItem('authKey');
      return [id, authKey];
    },
    // eslint-disable-next-line no-unused-vars
    async onContextMenuSelect(theKey) {
      if (theKey === 'logout') {
        await mainStore.dispatch('logout');
        await this.$router.replace({ path: '/login' });
      }
      this.isContextMenuOpen = false;
    },
    isSelectedMainMenuItem(key) {
      let isMarked = false;
      if (this.$route.query.type === key) {
        isMarked = true;
      } else if (this.$route.fullPath.toString().includes(key)) {
        isMarked = true;
      }
      return isMarked;
    },
    isLogin() {
      if (mainStore.getters.isLogin) {
        return true;
      }
      return false;
    },
    getMyName() {
      return mainStore.getters.myData.username;
    },
    getMyRank() {
      let rank = '';
      if (mainStore.getters.myData.rank === 'admin') {
        rank = 'مدير نظام';
      } else if (mainStore.getters.myData.rank === 'supervisor') {
        rank = 'مشرف';
      }
      return rank;
    },
  },
  created() {
    setTimeout(() => {
      if (mainStore.getters.myData.rank === 'admin') {
        this.mainMenuItems.push({
          icon: 'supervisor',
          title: 'المشرفون',
          to: '/users?type=supervisors',
          key: 'supervisors',
        });
        this.mainMenuItems.push({
          icon: 'teacher',
          title: 'المعلمون',
          to: '/users?type=teachers',
          key: 'teachers',
        });
        this.mainMenuItems.push({
          icon: 'graduationCap',
          title: 'الأقسام',
          to: '/departments',
          key: 'departments',
        });
      }
      if (mainStore.getters.myData.rank === 'supervisor') {
        this.mainMenuItems.push({
          icon: 'student',
          title: 'الطلاب',
          to: '/users?type=students',
          key: 'students',
        });
        this.mainMenuItems.push({
          icon: 'users',
          title: 'المجموعات',
          to: '/groups',
          key: 'groups',
        });
        this.mainMenuItems.push({
          icon: 'books',
          title: 'المواد',
          to: '/materials',
          key: 'students',
        });
      }
      this.mainMenuItems.push({
        icon: 'sheets',
        title: 'الجداول',
        to: '/lectures',
        key: 'lectures',
      });
      this.mainMenuItems.push({
        icon: 'notification',
        title: 'الإشعارات',
        to: '/notifications',
        key: 'notifications',
      });
      this.mainMenuItems.push({
        icon: 'aplus',
        title: 'النتائج',
        to: '/results',
        key: 'results',
      });
    }, 500);
  },
};
</script>

<style scoped>
  a {
    text-decoration: none;
  }
  .header{
    width: 70%;
    display: flex;
    flex-direction: row;
    padding: 15px 15%;
    background: #fff;
    align-items: center;
    position: relative;
  }
  .header .logo{
    height: 50px;
  }
  .header .descSide{
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
  }
  .header .descSide .theTitle{
    font-size: 18px;
    color: #444;
  }
  .header .descSide .theInfo{
    font-size: 14px;
    color: #999;
    font-weight: bold;
  }
  .header .descSide .username{
    font-size: 13px;
    color: #333;
    font-weight: bold;
  }
  .header .descSide .rank{
    font-size: 12px;
    color: #999;
    font-weight: bold;
  }
  .mainMenu{
    width: 70%;
    display: flex;
    flex-direction: row;
    margin: 20px 15%;
    border-bottom: 2px solid #eee;
    height: 45px;
  }
  .mainMenu .cel{
    color: #777;
    font-weight: bold;
    font-size: 18px;
    margin-top: 4px;
    height: 41px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 10px;
  }
  .mainMenu .cel img{
    height: 20px;
  }
  .header .userThumb{
    width: 40px;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 100px;
    background-image: url("../assets/icons/b/student.png");
    background-position: center;
    background-size: 70%;
    background-repeat: no-repeat;
  }
  .header .optionMenu{
    width: 25px;
    height: 25px;
    padding: 5px;
    border-radius: 100px;
    cursor: pointer;
    position: relative;
  }
  .header .optionMenu img{
    width: 25px;
    height: 25px;
  }
  .header .optionMenu:hover{
    background: #eee;
  }
</style>
