<template>
  <div class="mainContainer">
    <div class="mainSections">
      <div class="section">
        <div class="sectionTitle">
          <img src="../assets/icons/b/editPen.png" />
          <div style="width: 10px;height: 10px;"></div>
          <div class="title">معلومات المجموعة</div>
        </div>
        <DuInput
          label="عنوان المجموعة"
          value=""
          type="text"
          :isRequired='true'
          :ref="refs.titleInput"
        />
        <div style="width: 10px;height: 20px;"></div>
        <DuInput
          label="نوع المجموعة"
          value="class"
          type="selectMenu"
          :options="[
            { text: 'معمل', value: 'lab', },
            { text: 'محاضرة', value: 'class', },
          ]"
          placeholder="اختر نوع المجموعة"
          :isRequired='true'
          :ref="refs.typeInput"
        />
      </div>
      <div style="width: 20px;height: 20px;"></div>
      <div class="section">
        <div class="sectionTitle">
          <img src="../assets/icons/b/users.png" />
          <div style="width: 10px;height: 10px;"></div>
          <div class="title">المنتسبين</div>
        </div>
        <div class="studentCel" v-for="item in state.students" :key="item.id"
             @click="addStudent(item.id)">
          <div class="thumb">{{ item.username[0] }}</div>
          <div style="width: 10px;height: 10px;"></div>
          <div class="infoSide">
            <div class="name">{{ item.username }}</div>
            <div class="number">{{ item.id }}</div>
          </div>
          <div style="width: 10px;height: 10px;"></div>
          <div class="checkArea">
            <div class="checked" v-if="state.selectedStudents.includes(item.id)"></div>
          </div>
        </div>
      </div>
    </div>
    <div style="width:50px; height:100px"></div>
  </div>
  <div class="saveBar"
       :style="{ opacity: state.selectedStudents.length < 1? 0.5: 1 }">
    <div class="studentsNumber">
      <span>تم تحديد</span>
      <div style="width: 5px;height: 5px;"></div>
      <b>{{ state.selectedStudents.length }}</b>
      <div style="width: 5px;height: 5px;"></div>
      <span>طالب</span>
    </div>
    <DuButton text="حفظ" @click="createGroup()"/>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import AjaxWorker from '@/jsHelpers/AjaxWorker';
import DuInput from '../components/DuInput.vue';
import DuButton from '../components/DuButton.vue';

export default {
  name: 'AddNewOrEditGroup',
  components: {
    DuButton,
    DuInput,
  },
  setup() {
    const refs = { titleInput: ref(), typeInput: ref() };
    const state = reactive({
      students: [],
      selectedStudents: [],
    });
    const getStudents = () => {
      new AjaxWorker().request('/api/get_users', {
        type: 'student',
      }).then((res) => {
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
          state.students = res.data.items;
        }
      });
    };
    const addStudent = (id) => {
      if (state.selectedStudents.includes(id)) {
        state.selectedStudents = state.selectedStudents.filter((item) => id !== item);
      } else {
        state.selectedStudents.push(id);
      }
    };
    getStudents();
    const createGroup = () => {
      let isLab = false;
      const title = refs.titleInput.value.state.innerValue;
      if (refs.typeInput.value.state.innerValue === 'lab') {
        isLab = true;
      }
      new AjaxWorker().request('/api/createNewGroup', {
        title,
        isLab,
        users: state.selectedStudents.join(','),
      }).then((res) => {
        alert(JSON.stringify(res));
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
          // state.students = res.data.items;
        }
      });
    };
    return {
      refs,
      state,
      getStudents,
      addStudent,
      createGroup,
    };
  },
};
</script>

<style scoped>
.mainContainer {
  min-height: 500px;
  width: 70%;
  margin: 0px 15%;
  display: flex;
  flex-direction: column;
}
.saveBar{
  display: flex;
  flex-direction: row;
  position: fixed;
  width: 70%;
  padding: 10px 15%;
  background: #fff;
  bottom: 0;
  left: 0;
  box-shadow: 0 0 20px #ccc;
  border-top: 2px solid #8F28F0;
  z-index: 1;
}
.saveBar .studentsNumber{
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 15px;
}
.mainSections{
  display: flex;
  flex-direction: row;
  margin-top: 100px;
}
.mainSections .section{
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2%;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 0 10px #ccc;
  height: min-content;
}

.sectionTitle{
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.sectionTitle img{ width: 20px; height: 20px;}

.studentCel{
  padding: 10px 4%;
  width: 92%;
  background: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
}
.studentCel:hover{
  background: #f5f5f5;
}
.studentCel:active{
  background: #f0f0f0;
}
.studentCel .thumb{
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  font-weight: bold;
  color: #333;
  border-radius: 100px;
  background: #ccc;
  text-align: center;
}
.studentCel .infoSide{
  flex: 1;
  display: flex;
  flex-direction: column;
}
.studentCel .infoSide .name{ font-size: 15px; color: #000;}
.studentCel .infoSide .number{ font-size: 12px; color: #555; font-weight: bold}
.studentCel .checkArea{
  width: 16px;
  height: 16px;
  padding: 2px;
  border-radius: 100px;
  background: #fff;
  border: 2px solid #8F28F0;
}
.studentCel .checkArea .checked{
  width: 100%;
  height: 100%;
  background: #8F28F0;
  border-radius: 100px;
}
</style>
