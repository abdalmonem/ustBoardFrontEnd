<template>
  <div class="mainContainer">
    <DuButton text="إضافة مجموعة" style="justify-self: end;align-self: end"
              @click="createOrEditGroup()"/>
    <div style="height: 50px;width: 50px;"></div>
    <DuHorizontalMenu :items="state.groupsTypes"
                      @select='(e) => applyFilter("type", e.id)'/>
    <div class="groupBlocks">
      <div class="cell" v-for="item in state.groups" :key="item.id" v-show="isShowing(item)">
        <div class="title">
          <span>{{ item.title }}</span>
          <img class="MenuIcon" src="../assets/icons/b/menuF.png"
               @click="(e) => openGroupContextMenu(e, item)"/>
        </div>
        <div class="count" v-if="item.studentsCount > 0">
          <span> عدد المنتسبين : </span>
          <b>{{ item.studentsCount }}</b>
        </div>
        <div class="count" style="color: #888;" v-else>
          <span> لم يتم إضافة منتسبين </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import AjaxWorker from '@/jsHelpers/AjaxWorker';
import DuHorizontalMenu from '../components/DuHorizontalMenu.vue';
import DuButton from '../components/DuButton.vue';

export default {
  name: 'Groups',
  components: {
    DuHorizontalMenu,
    DuButton,
  },
  setup() {
    const router = useRouter();
    const internalInstance = getCurrentInstance();
    const state = reactive({
      groups: [],
      show: 'all',
      isAddNewGroupPopUpShow: false,
      groupsTypes: [
        { title: 'جميع المجموعات', id: 'all', isSelected: true },
        { title: 'معامل فقط', id: 'labs' },
        { title: 'محاضرات فقط', id: 'class' },
      ],
      items: [
        { title: 'gfgf', id: 'gfgf' },
      ],
    });
    const openGroupContextMenu = (e, item) => {
      internalInstance.appContext.config.globalProperties.$createContextMenu({
        event: e,
        onSelect: (key) => {
          alert(key);
          alert(item);
        },
        options: [
          // eslint-disable-next-line global-require
          { icon: require('../assets/icons/b/editPen.png'), title: ` تعديل ${item.title}`, key: 'edit' },
          // eslint-disable-next-line global-require
          { icon: require('../assets/icons/b/close.png'), title: ` حذف ${item.title}`, key: 'delete' },
        ],
      });
    };
    const createOrEditGroup = () => {
      router.push({
        path: '/addNewGroup',
      });
    };
    const getData = () => {
      new AjaxWorker().request('/api/getGroups', {}).then((res) => {
        // alert(JSON.stringify(res));
        if (res === 'NOINTERNETCONNECTION' || !res.state) {
          this.$createFixedNotification(
            'حدث خطاء أثناء الإتصال',
            'حاول في وقت لاحق',
            // eslint-disable-next-line global-require
            require('../assets/icons/w/exclamationF.png'),
            null,
            '#FF065A',
            3,
          );
        } else {
          state.groups = res.data;
        }
      });
    };
    getData();
    const isShowing = (item) => {
      if (state.show === 'all') {
        return true;
      }
      if (state.show === 'labs') {
        if (item.is_lab) {
          return true;
        }
      }
      if (state.show === 'class') {
        if (!item.is_lab) {
          return true;
        }
      }
      return false;
    };
    const applyFilter = (theFilter, value) => {
      state.show = value;
    };
    return {
      state,
      openGroupContextMenu,
      applyFilter,
      isShowing,
      getData,
      createOrEditGroup,
    };
  },
};
</script>

<style scoped>
.mainContainer{
    min-height: 500px;
    width: 70%;
    margin: 0px 15%;
    display: flex;
    flex-direction: column;
  }

.groupBlocks{
  display: flex;
  flex-direction: row;
  margin-top: 50px;
  width: 100%;
  flex-flow: wrap;
}
.groupBlocks .cell{
  display: flex;
  flex-direction: column;
  width: 28%;
  padding: 1.4%;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px #ccc;
  margin: 1.2%;
}
.groupBlocks .cell:hover{background: #fefefe;}
.cell .title{
  font-size: 17px;
  color: #555;
  display: flex;
  flex-direction: row;
}
.cell .title span{flex: 1;}
.cell .count{
  font-size: 14px;
  color: #000;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #eee;
}
.cell .count b{ color: #8F28F0; }
.MenuIcon{
  width: 20px;
  height: 20px;
  padding: 5px;
  border-radius: 100px;
  cursor: pointer;
}

.MenuIcon:hover{
  background: #eee;
}
</style>
