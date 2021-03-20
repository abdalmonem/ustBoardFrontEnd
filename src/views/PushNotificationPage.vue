<template>
  <div class="mainContainer">
    <DuHorizontalMenu :items="[
      { title: 'بث جماعي', id: 'auto', isSelected: true},
      { title: 'تحديد يدوي', id: 'manual'},
    ]"
    @select='(e) => false'/>
    <div class="notes">{{ getBrodcastNote() }}</div>
    <div class="notificationMainSections">
      <div class="selectionArea">
        <div class="inputArea">
          <input placeholder="البحث عن مستخدم"/>
        </div>
        <div style="width:20px;height: 20px;"></div>
        <div class="selectionCell">
          <div class="checkBox">
            <div class="checked"></div>
          </div>
          <div style="width:10px;height: 10px;"></div>
          <div class="info">
            <span class="name">mohammed</span>
            <span class="type">طالب</span>
          </div>
        </div>
      </div>
      <div style="width:20px;height: 20px;"></div>
      <textarea class="notificationText"></textarea>
    </div>
  </div>
  <div class="bottomBar">
    <div class="count">0</div>
    <DuButton text="بث"/>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import DuHorizontalMenu from '@/components/DuHorizontalMenu.vue';
import DuButton from '@/components/DuButton.vue';
import AjaxWorker from '@/jsHelpers/AjaxWorker';

export default {
  name: 'PushNotificationPage',
  components: {
    DuButton,
    DuHorizontalMenu,
  },
  setup() {
    const route = useRoute();
    const state = reactive({
      departments: [],
      selectedUsers: [],
    });
    const checkUrlParams = () => {
      setTimeout(() => {
        if (route.query.users !== undefined) {
          state.selectedUsers = state.selectedUsers.concat(route.query.users);
        }
      }, 100);
    };
    checkUrlParams();
    const getDepartments = () => {
      new AjaxWorker().request('/api/getDepartments', {})
        .then((res) => {
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
            state.departments = res.data.items;
          }
        });
    };
    getDepartments();
    const convertDepartmentTypeToString = (deptType) => {
      let deptToString = '';
      if (deptType === 'diploma') {
        deptToString = 'دبلوم';
      } else if (deptType === 'bachelor') {
        deptToString = 'بكلاريوس';
      } else if (deptType === 'master') {
        deptToString = 'ماجستير';
      } else if (deptType === 'doctorate') {
        deptToString = 'دكتوراه';
      }
      return deptToString;
    };
    const getBrodcastNote = () => {
      // eslint-disable-next-line no-self-compare
      if (1 === 1) {
        return 'سيتم ارسال هذف التنويه لجميع مستخدمي النظام من أساتذة و طلاب و مشرفين';
      }
      return 'ff';
    };
    return {
      state,
      convertDepartmentTypeToString,
      getBrodcastNote,
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
.notificationText{
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ccc;
  height: 150px;
  font-size: 17px;
  flex: 1;
}
.bottomBar{
  width: 70%;
  padding: 15px 15%;
  background: #fff;
  box-shadow: 0 0 10px #eee;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.notificationMainSections{
  display: flex;
  flex-direction: row;
  margin-top: 50px;
  align-content: start;
}
.notificationMainSections textarea{
  flex: 1;
}
.selectionArea{
  display: flex;
  flex-direction: column;
  width: 40%;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px #eee;
}

.selectionArea .inputArea{
  width: 100%;
  box-shadow: 0px 5px 5px #f9f9f9;
}
.selectionArea input{
  width: 80%;
  margin: 5%;
  padding: 15px 5%;
  border-radius: 100px;
  font-size: 13px;
  border: 2px solid #ccc;
}
.selectionCell{
  display: flex;
  flex-direction: row;
  padding: 10px 5%;
  align-items: center;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.selectionCell:hover{
  opacity: 0.5;
}

.selectionCell .expandIcon{
  width:20px;
  height: 20px;
  border-radius: 8px;
  border: 1px solid #ccc;
}
.selectionCell .expandIcon img{
  width:14px;
  height: 14px;
  padding: 3px;
}

.selectionCell .checkBox{
  width:20px;
  height: 20px;
  border-radius: 8px;
  border: 1px solid #ccc;
}
.selectionCell .checkBox .checked{
  width:14px;
  height: 14px;
  margin: 3px;
  background: #8F28F0;
  border-radius: 8px;
}
.selectionCell .info{
  display: flex;
  flex-direction: column;
  font-size: 15px;
  flex: 1;
}
.selectionCell .info .name{
  font-size: 14px;
  color: #222;
}
.selectionCell .info .type{
  font-size: 11px;
  color: #777;
  margin-top: 5px;
}
.notes{
  font-size: 13px;
  margin-top: 20px;
  padding: 20px 5%;
  background: #eee;
  border-radius: 8px;
}

</style>
