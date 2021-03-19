<template>
  <div class="mainContainer">
    <DuButton text="إضافة مادة" style="justify-self: end;align-self: end"
              @click="openAddEditLightbox('new', {})"/>
    <GenericPopUp title="إضافة مادة" :isShowing="state.isAddNewMaterialPopUpShow"
                @close="state.isAddNewMaterialPopUpShow = false;">
      <div class="formArea">
        <DuInput
          label="النوع"
          value="lecture"
          placeholder="نوع المادة"
          type="selectMenu"
          :options="[
            { text: 'محاضرة', value: 'lecture' },
            { text: 'معمل', value: 'lab' },
            { text: 'تمارين', value: 'tutorial' },
          ]"
          :isRequired='true'
          is-required-error-message="قم بإختيار نوع المادة"
          :ref="refs.lectureTypeInput"
          @change="onTypeChange"
        />
        <div style="height: 30px;width: 20px;"></div>
        <DuInput
          label="اسم المادة"
          value=""
          placeholder=""
          type="text"
          :isRequired='true'
          is-required-error-message="قم بإدخال اسم المادة"
          :ref="refs.titleInput"
        />
        <div
          style="height: 30px;width: 20px;"
          v-if="state.selectedLectureType === 'lab' || state.selectedLectureType === 'tutorial'">
        </div>
        <DuInput
          v-if="state.selectedLectureType === 'lab' || state.selectedLectureType === 'tutorial'"
          label="متفرعة من"
          value="lecture"
          placeholder="متفرعة من"
          type="selectMenu"
          :options="getMaterialsList()"
          :isRequired='true'
          is-required-error-message="قم بإحتيار الفرع"
          :ref="refs.dependsOn"
        />
        <div style="height: 30px;width: 20px;"></div>
        <DuInput
          label="عدد الساعات"
          value=""
          placeholder=""
          type="float"
          :isRequired='true'
          is-required-error-message="قم بإدخال عدد الساعات"
          :ref="refs.hoursRateInput"
        />
        <div style="height: 30px;width: 20px;"></div>
        <DuInput
          label="المدرس"
          value="lecture"
          placeholder="المدرس"
          type="selectMenu"
          :options="getTeachersList()"
          :isRequired='true'
          is-required-error-message="قم باختيار استاذ المادة"
          :ref="refs.teacherInput"
        />
        <div style="height: 30px;width: 20px;"></div>
        <DuButton text="إضافة" style="justify-self: end;align-self: end"
              @click="addMaterial"/>
      </div>
    </GenericPopUp>
    <div style="width: 20px;height: 50px;"></div>
    <div class="materialCell" v-for="item in state.allMaterials" :key="item.id">
      <div class="nameAndInfo">
        <div class="name">
          <span v-if="item.depends_on !== null">{{  item.depends.title }}</span>
          <img src="../assets/icons/b/leftRow.png" v-if="item.depends_on !== null" />
          <span>{{  item.title }}</span>
          <span v-if="item.type !== 'lecture'" style="color: #999;">
            ({{ (() => {
            if (item.type === 'lab') {
              return 'معمل';
            }
            if (item.type === 'tutorial') {
              return 'تمارين';
            }
            return '';
          })() }})
          </span>
        </div>
        <div class="teacherName">{{  item.teacher.username }}</div>
      </div>
      <div class="menuButton" @click="(e) => openMaterialContextMenu(e, {})">
        <img src="../assets/icons/b/menuF.png">
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, getCurrentInstance, ref } from 'vue';
import DuButton from '../components/DuButton.vue';
import GenericPopUp from '../components/GenericPopUp.vue';
import DuInput from '../components/DuInput.vue';
import AjaxWorker from '../jsHelpers/AjaxWorker';

export default {
  name: 'Materials',
  components: {
    DuButton,
    GenericPopUp,
    DuInput,
  },
  setup() {
    const state = reactive({
      isAddNewMaterialPopUpShow: false,
      selectedLectureType: 'lecture',
      items: [],
      allTeachers: [],
      allMaterials: [],
    });
    const refs = {
      titleInput: ref(),
      hoursRateInput: ref(),
      teacherInput: ref(),
      lectureTypeInput: ref(),
      dependsOn: ref(),
    };
    const internalInstance = getCurrentInstance();
    // eslint-disable-next-line no-unused-vars
    const openMaterialContextMenu = (e, item) => {
      internalInstance.appContext.config.globalProperties.$createContextMenu({
        event: e,
        onSelect: (key) => {
          if (key === 'appendSupervisor') {
            state.isAppendPopUpShow = true;
          }
        },
        options: [
          // eslint-disable-next-line global-require
          { icon: require('../assets/icons/b/close.png'), title: 'حذف', key: 'delete' },
        ],
      });
    };
    const addMaterial = () => {
      const type = refs.lectureTypeInput.value.state.innerValue;
      const title = refs.titleInput.value.state.innerValue;
      const hoursRate = refs.hoursRateInput.value.state.innerValue;
      const teacher = refs.teacherInput.value.state.innerValue;
      const params = {
        title,
        type,
        hoursRate,
        teacher,
      };
      if (state.selectedLectureType === 'lab' || state.selectedLectureType === 'tutorial') {
        params.dependsOn = refs.dependsOn.value.state.innerValue;
      }
      new AjaxWorker().request('/api/addMaterial', params)
        .then((res) => {
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
            // state.items = state.items.concat(res.data.items);
            alert();
          }
        });
    };
    const getMaterialsList = () => {
      const listOfMaterials = [];
      state.allMaterials.forEach((item) => {
        listOfMaterials.push({
          text: item.title,
          value: item.id,
        });
      });
      return listOfMaterials;
    };
    const getTeachersList = () => {
      const listOfTeachers = [];
      state.allTeachers.forEach((item) => {
        listOfTeachers.push({
          text: item.username,
          value: item.id,
        });
      });
      return listOfTeachers;
    };
    const getTeachers = () => {
      new AjaxWorker().request('/api/get_users', {
        type: 'teacher',
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
          state.allTeachers = res.data.items;
        }
      });
    };
    const getMaterials = () => {
      new AjaxWorker().request('/api/getMaterials', {}).then((res) => {
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
          state.allMaterials = res.data.items;
        }
      });
    };
    getMaterials();
    // eslint-disable-next-line no-unused-vars
    const openAddEditLightbox = (action, data) => {
      getTeachers();
      state.isAddNewMaterialPopUpShow = true;
    };
    const onTypeChange = (item) => {
      setTimeout(() => {
        state.selectedLectureType = item.value;
      }, 100);
    };
    return {
      state,
      refs,
      addMaterial,
      getMaterials,
      getMaterialsList,
      onTypeChange,
      getTeachersList,
      openMaterialContextMenu,
      getTeachers,
      openAddEditLightbox,
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
  .materialCell{
    display: flex;
    flex-direction: row;
    padding: 20px 4%;
    width: 92%;
    background: #fff;
    border-radius: 8px;
    align-items: center;
    margin-bottom: 10px;
    box-shadow: 0 0 10px #eee;
  }
  .nameAndInfo{
    flex: 1;
    display: flex;
    flex-direction: column;
  }
   .nameAndInfo .name{
     font-size: 16px;
     color: #000;
     display: flex;
     flex-direction: row;
     align-items: center;
   }
   .nameAndInfo .name img{ width: 10px; height: 10px; margin: 0 5px;}
   .nameAndInfo .name span{ white-space: pre; }
   .nameAndInfo .teacherName{
     font-size: 12px;
     color: #000;
     margin-top: 5px;
   }
   .menuButton{
     width: 20px;
     height: 20px;
     background: #eee;
     border-radius: 100px;
     padding: 10px;
     cursor: pointer;
   }
   .menuButton:hover{
     background: #ccc;
   }
   .menuButton img{
     width: 20px;
     height: 20px;
   }
   .formArea{
    display: flex;
    flex-direction: column;
    width: 100%;
  }
</style>
