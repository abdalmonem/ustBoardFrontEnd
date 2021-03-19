<template>
  <div class="mainContainer">
    {{ state.allMaterials }}
    <DuHorizontalMenu :items="getDepartmentsTypesMenuItems()"/>
    <DuHorizontalMenu :items="getDepartmentsMenuItems()"
     v-if="state.selectedDepartmentType !== null" @select="makeFiltering"/>
    <DuHorizontalMenu v-if="state.selectedDepartment !== null"
      :items="getYearsMenu()"/>
    <DuHorizontalMenu v-if="state.selectedDepartmentYear !== null"
      :items="[
        { title: 'محاضرات' , id: 'class'},
        { title: 'معامل' , id: 'lab' },
      ]" @select='(e) => onChangeSchaduleType(e)'/>
    <DuHorizontalMenu
      :items="getGroupsItems()" @select='(e) => onChangeGroup(e)'/>
    <div style="width: 20px;height: 50px;"></div>
    <LecturesTables
      @select="onCellSelect"
      :group-id="state.selectedLectureId"
      v-if="state.selectedLectureId !== null"
    />
  </div>
  <GenericPopUp title="تعديل الجدول" :isShowing="state.isChangeLecturePopUpShow"
                @close="state.isChangeLecturePopUpShow = false;">
    <div class="formArea">
      <DuInput
        label="المادة"
        value="lecture"
        placeholder="المادة"
        type="selectMenu"
        :options="getMaterialsList()"
        :isRequired='true'
        is-required-error-message="قم باختيار المادة"
        :ref="refs.lectureInput"
      />
      <div style="width: 20px; height: 20px;"></div>
      <DuInput
        label="القاعة \ المعمل"
        value=""
        placeholder="مثال : قاعة ٨ , مثال اَخر : مركز ٢ - معمل ٤"
        type="text"
        :isRequired='true'
        is-required-error-message="قم بكتابة اسم أو رقم القاعة"
        :ref="refs.hallInput"
      />
      <div style="width: 20px; height: 20px;"></div>
      <DuButton text="حفظ" style="justify-self: end;align-self: end"
              @click="onCellMaterialSelect"/>
    </div>
  </GenericPopUp>
</template>

<script>
import { reactive, ref } from 'vue';
import mainStore from '@/stores/mainStore';
import DuHorizontalMenu from '../components/DuHorizontalMenu.vue';
import AjaxWorker from '../jsHelpers/AjaxWorker';
import LecturesTables from '../components/LecturesTables.vue';
import GenericPopUp from '../components/GenericPopUp.vue';
import DuInput from '../components/DuInput.vue';
import DuButton from '../components/DuButton.vue';

export default {
  name: 'LecturesPage',
  components: {
    DuHorizontalMenu,
    LecturesTables,
    DuInput,
    DuButton,
    GenericPopUp,
  },
  setup() {
    const state = reactive({
      departments: [],
      selectedDepartment: null,
      selectedDepartmentType: null,
      selectedDepartmentYear: null,
      selectedLectureId: null,
      lectures: [],
      lecturesType: 'class',
      isChangeLecturePopUpShow: false,
      allMaterials: true,
      selectedDayCell: null,
      selectedPositionCell: null,
      groups: [],
    });
    const refs = {
      lectureInput: ref(),
      hallInput: ref(),
    };
    const getMaterials = () => {
      new AjaxWorker().request('/api/getMaterials', {}).then((res) => {
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
    const getYearTitle = (year) => {
      let yearAsText = '';
      if (year === 1) {
        yearAsText = 'الصف الأول';
      } else if (year === 2) {
        yearAsText = 'الصف الثاني';
      } else if (year === 3) {
        yearAsText = 'الصف الثالث';
      } else if (year === 4) {
        yearAsText = 'الصف الرابع';
      } else if (year === 5) {
        yearAsText = 'الصف الخامس';
      } else if (year === 6) {
        yearAsText = 'الصف السادس';
      }
      return yearAsText;
    };
    const makeFiltering = (item) => {
      state.selectedDepartment = item;
    };
    const getAllDepartments = () => {
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
            state.departments = state.departments.concat(res.data.items);
          }
        });
    };
    getAllDepartments();
    const getDepartmentsTypesMenuItems = () => {
      const typesMenu = [];
      const typesMenuPushed = [];
      state.departments.forEach((item) => {
        if (!typesMenuPushed.includes(item.department_type)) {
          typesMenuPushed.push(item.department_type);
          typesMenu.push({
            id: item.id,
            title: convertDepartmentTypeToString(item.department_type),
            onSelect: () => {
              state.selectedDepartmentType = item.department_type;
            },
          });
        }
      });
      return typesMenu;
    };
    const getDepartmentsMenuItems = () => {
      const departmentsMenu = [];
      state.departments.forEach((item) => {
        if (item.department_type === state.selectedDepartmentType) {
          departmentsMenu.push({
            id: item.id,
            title: item.title,
          });
        }
      });
      return departmentsMenu;
    };
    const getYearsMenu = () => {
      const items = [];
      state.departments.forEach((item) => {
        if (state.selectedDepartment.id === item.id) {
          for (let i = 0; i < item.years; i += 1) {
            items.push({
              id: i,
              title: getYearTitle(i + 1),
              onSelect: () => {
                state.selectedDepartmentYear = (i + 1);
              },
            });
          }
        }
      });
      return items;
    };
    // eslint-disable-next-line no-unused-vars
    const onCellSelect = (data) => {
      state.selectedDayCell = data.y;
      state.selectedPositionCell = data.x;
      state.isChangeLecturePopUpShow = true;
    };
    const getMaterialsList = () => {
      const listOfMaterials = [];
      state.allMaterials.forEach((item) => {
        if (state.lecturesType === 'class') {
          if (item.type === 'lecture') {
            listOfMaterials.push({
              text: item.title,
              value: item.id,
            });
          }
        } else if (state.lecturesType === 'lab') {
          if (item.type === 'lab') {
            listOfMaterials.push({
              text: item.title,
              value: item.id,
            });
          }
        }
      });
      return listOfMaterials;
    };
    const onCellMaterialSelect = () => {
      const materialId = refs.lectureInput.value.state.innerValue;
      const hall = refs.hallInput.value.state.innerValue;
      new AjaxWorker().request('/api/addLecture', {
        day: state.selectedDayCell,
        position: state.selectedPositionCell,
        hall,
        materialId,
        lectureType: state.lecturesType,
        lectureId: state.selectedLectureId,
      })
        .then((res) => {
          alert(materialId);
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
            // state.departments = state.departments.concat(res.data.items);
          }
        });
    };
    const getGroups = () => {
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
    setTimeout(() => {
      if (mainStore.getters.myData.rank === 'supervisor') {
        state.selectedDepartmentYear = mainStore.getters.myData.year;
      }
      getGroups();
    }, 500);
    const onChangeSchaduleType = (e) => {
      state.lecturesType = e.id;
    };
    const getGroupsItems = () => {
      const labItems = [];
      const classesItems = [];
      let arrayShouldReturned = [];
      state.groups.forEach((item) => {
        if (item.is_lab) {
          labItems.push({
            id: item.id,
            title: item.title,
          });
        } else {
          classesItems.push({
            id: item.id,
            title: item.title,
          });
        }
      });
      if (state.lecturesType === 'class') {
        arrayShouldReturned = classesItems;
      } else {
        arrayShouldReturned = labItems;
      }
      if (arrayShouldReturned.length > 0 && state.selectedLectureId == null) {
        state.selectedLectureId = arrayShouldReturned[0].id;
        arrayShouldReturned[0].isSelected = true;
      }
      return arrayShouldReturned;
    };
    const onChangeGroup = (e) => {
      state.selectedLectureId = e.id;
    };
    return {
      getGroupsItems,
      onChangeGroup,
      onChangeSchaduleType,
      onCellMaterialSelect,
      getMaterialsList,
      onCellSelect,
      makeFiltering,
      getAllDepartments,
      getDepartmentsMenuItems,
      getDepartmentsTypesMenuItems,
      convertDepartmentTypeToString,
      state,
      refs,
      getYearsMenu,
      getYearTitle,
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

.formArea{
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
