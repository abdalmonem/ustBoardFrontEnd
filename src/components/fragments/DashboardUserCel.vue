<template>
  <div class="mainComponent">
    <div class="thumb">{{ data.username[0].toUpperCase() }}</div>
    <div style="width: 10px; height: 10px"></div>
    <div class="contentSide">
      <div class="name">
        {{ data.username }}
        <span class="userType"> {{ getRank() }} </span>
      </div>
      <div class="subInfo">
        <span>الصف الأول</span>
        <div style="width: 10px; height: 10px"></div>
        <span>بكلاريوم تقنية معلومات</span>
      </div>
    </div>
    <div class="controllsArea">
      <div class="cell">
        <img :src="require('../../assets/icons/b/menuF.png')"
             @click="isContextMenuOpen = !isContextMenuOpen" class="openMenuImg"/>
        <duContextMenu :isOpen="isContextMenuOpen" :clickEvent="openMenuClickEvent"
        @select="onContextMenuSelect"
        @close="isContextMenuOpen=false"
        :items="[
          { key: 0, text: 'حذف', icon: require('../../assets/icons/b/menuF.png'), },
          { key: 1, text: 'تعديل', icon: require('../../assets/icons/b/menuF.png'), },
        ]"/>
      </div>
      <div style="width: 10px; height: 10px"></div>
      <div class="check" @click="isChecked = !isChecked">
        <img :src="require('../../assets/icons/w/checkF.png')" v-if="isChecked" />
      </div>
    </div>
  </div>
</template>

<script>
import IconsWorker from '../../jsHelpers/IconsWorker';
import DuContextMenu from '../DuContextMenu.vue';

export default {
  name: 'DashboardUserCel',
  components: { DuContextMenu },
  methods: {
    IconsWorker,
    onContextMenuSelect(theKey) {
      console.log(theKey);
      this.isContextMenuOpen = false;
    },
    getRank() {
      let rank = '';
      if (this.data.rank === 'student') {
        rank = 'طالب';
      } else if (this.data.rank === 'teacher') {
        rank = 'أستاذ';
      } else if (this.data.rank === 'supervisor') {
        rank = 'مشرف';
      } else if (this.data.rank === 'admin') {
        rank = 'مدير نظام';
      }
      return rank;
    },
  },
  props: {
    data: {},
  },
  data() {
    return {
      isChecked: false,
      isContextMenuOpen: false,
    };
  },
};
</script>

<style scoped>
  .mainComponent{
    display: flex;
    background: #fff;
    padding: 10px;
    margin-top: 10px;
    border-radius: 8px;
    box-shadow: 0 0 2px #ccc;
    flex-direction: row;
    align-items: center;
  }
  .thumb{
    width: 40px;
    height: 40px;
    background: #eee;
    border-radius: 100px;
    line-height: 40px;
    text-align: center;
    font-size: 20px;
    color: #555;
  }
  .contentSide{
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
  }
  .contentSide .name{
    font-size: 16px;
    color: #222;
  }
  .contentSide .name{
    font-size: 16px;
    color: #222;
  }
  .userType{
    color: #999;
    font-size: 12px;
    padding: 0px 10px;
  }
  .subInfo{
    display: flex;
    flex-direction: row;
    font-size: 13px;
    color: #888;
    margin-top: 5px;
  }
  .controllsArea{
    height: 30px;
    width: 70px;
    display: flex;
    flex-direction: row;
  }
  .controllsArea .cell{
    border-radius: 100px;
    width: 20px;
    height: 20px;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #eee;
    cursor: pointer;
    position: relative;
  }
  .controllsArea .cell:hover{
    background: #ccc;
  }

  .controllsArea .check{
    width: 25px;
    height: 25px;
    border: 2px solid #eee;
    border-radius: 100px;
    display: flex;
    cursor: pointer;
  }
  .controllsArea .check:hover{
    background: #ccc;
  }
  .controllsArea .check img{
    border-radius: 100px;
    padding: 5px;
    background: #8F28F0;
  }
  .openMenuImg{
    width: 20px;
  }
</style>
