<template>
  <div class="mainContainer">
    <DuButton text="إضافة قسم" style="justify-self: end;align-self: end"
              @click="state.isAddNewDepartmentPopUpShow = true;"/>
    <DuSearchBar placeholder="ابحث عن قسم" @onkeywordchange="onSearchChange"/>
    <div style="width: 20px;height: 50px;"></div>
      <div class="departmentCellAndYears" v-for="(item, index) in state.items" :key="item.id">
        <div class="departmentCell">
          <div class="titleAndType" @click="openYearsSetction(item.id)">
            <div class="theTitle">{{ item.title }}</div>
            <div class="theType">{{ convertDepartmentTypeToString(item.department_type) }}</div>
          </div>
          <div class="infoSide">
            <img class="MenuIcon" src="../assets/icons/b/menuF.png"
                 @click="(e) => openDepartmentContextMenu(e, item)"/>
            <div style="width: 20px;height: 20px;"></div>
            <div class="budget">{{ item.years === null ? '0' : item.years }}</div>
            <div style="width: 20px;height: 20px;"></div>
            <img class="expandIcon" src="../assets/icons/b/rowDown.png" />
          </div>
      </div>
      <img src="../assets/icons/loading.gif"
             class="loadingDepartmentData" v-if="state.isLoadingDepartmentData"/>
      <div v-if="state.openedYearsSetction === index + 1">
        <div class="yearsSection"
             v-for="(yearItem, yearIndex) in state.currentOpenedDepartmentData" :key="yearIndex">
          <div style="width: 50px;height: 10px;"></div>
          <div class="departmentYearCell">
            <div class="theYearTitleAndOptionButton">
              <span>{{ getYearTitle(yearIndex + 1) }}</span>
              <div class="optionIcon"
                   @click="(e) => {
                     state.appendedYear = getYearTitle(index + 1);
                     state.appendedYearAsInt = index + 1;
                     state.appendedDepartment = item.title;
                     state.appendedDepartmentType =
                     convertDepartmentTypeToString(item.department_type);
                     state.appendedDepartmentId = item.id;
                     openYearContextMenu(e, index+1, item.id);
                   }">
                <img src="../assets/icons/b/menuF.png" />
              </div>
            </div>
            <div class="theYearInfo">
              <div class="cel" v-if="yearItem.yearsData.supervisor !== undefined">
                <img src="../assets/icons/b/supervisor.png" />
                <div style="width: 10px;height: 10px;"></div>
                <div class="theKey">المشرف</div>
                <div style="width: 10px;height: 10px;"></div>
                <div class="theValue">{{  yearItem.yearsData.supervisor.username }}</div>
              </div>
              <div style="width: 10px;height: 10px;"></div>
              <div class="cel">
                <img src="../assets/icons/b/users.png" />
                <div style="width: 10px;height: 10px;"></div>
                <div class="theKey">عدد الطلاب</div>
                <div style="width: 10px;height: 10px;"></div>
                <div class="theValue">{{  yearItem.studentCount }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <GenericPopUp title="إضافة مستخدم" :isShowing="state.isAddNewDepartmentPopUpShow"
                @close="state.isAddNewDepartmentPopUpShow = false;">
    <div class="formArea">
      <DuInput
        label="اسم القسم"
        value=""
        type="text"
        :isRequired='true'
        :ref="refs.nameInput"
      />
      <div style="height: 30px;width: 20px;"></div>
      <DuInput
        label="نوع القسم"
        placeholder = 'اختر نوع القسم'
        :options="[
        // eslint-disable-next-line global-require
        { text: 'دبلوم', value: 'diploma', icon: require('../assets/icons/b/check.png'), },
        // eslint-disable-next-line global-require
        { text: 'بكلاريوس', value: 'bachelor', icon: require('../assets/icons/b/close.png'), },
        // eslint-disable-next-line global-require
        { text: 'ماجستير', value: 'master', icon: require('../assets/icons/b/close.png'), },
        // eslint-disable-next-line global-require
        { text: 'دكتوراه', value: 'doctorate', icon: require('../assets/icons/b/close.png'), },
        ]"
        value=""
        type="selectMenu"
        :isRequired='true'
        :ref="refs.typeInput"
      />
      <div style="height: 30px;width: 20px;"></div>
      <du-button text="إضافة" style="align-self: end"
                 @click="createDepartment()"
                 :icon="require('../assets/icons/w/plusF.png')"/>
      </div>

  </GenericPopUp>
  <GenericPopUp title="إسناد مشرف لقسم" :isShowing="state.isAppendPopUpShow"
                @close="state.isAppendPopUpShow = false;">
     <div class="formArea">
       <div class="appedndedDepartmentMarker">
         {{ state.appendedDepartmentType }}
         <img src="../assets/icons/b/leftRow.png" />
         {{ state.appendedDepartment }}
         <img src="../assets/icons/b/leftRow.png" />
         {{ state.appendedYear }}
       </div>
       <div style="height: 30px;width: 20px;"></div>
       <DuInput
        label="اسم المشرف"
        value=""
        placeholder="ابدأ بكتابة اسم المشرف"
        type="text"
        :isRequired='false'
        :ref="refs.superVisorName"
        @input="onSuperVisorNameChange"
        />
       <div style="height: 30px;width: 20px;"></div>
       <UsersAutoCompleter
         :keyword="state.appendedDepartmentSuperVisorInputVal" :max-length="1"
       @change="onAppendSuperVisor"/>
     </div>
  </GenericPopUp>
</template>

<script>
import { reactive, getCurrentInstance, ref } from 'vue';
import DuButton from '../components/DuButton.vue';
import DuSearchBar from '../components/DuSearchBar.vue';
import AjaxWorker from '../jsHelpers/AjaxWorker';
import GenericPopUp from '../components/GenericPopUp.vue';
import DuInput from '../components/DuInput.vue';
import UsersAutoCompleter from '../components/UsersAutoCompleter.vue';

export default {
  name: 'Departments',
  components: {
    DuButton,
    DuSearchBar,
    GenericPopUp,
    UsersAutoCompleter,
    DuInput,
  },
  setup() {
    const state = reactive({
      items: [],
      isAddNewDepartmentPopUpShow: false,
      isAppendPopUpShow: false,
      openedYearsSection: null,
      isLoadingDepartmentData: false,
      currentOpenedDepartmentData: [],
      appendedYear: '',
      appendedYearAsInt: '',
      appendedDepartmentType: '',
      appendedDepartment: '',
      appendedDepartmentId: '',
      appendedDepartmentSuperVisorInputVal: '',
    });
    const refs = { nameInput: ref(), typeInput: ref(), superVisorName: ref() };
    const getData = () => {
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
            state.items = state.items.concat(res.data.items);
          }
        });
    };
    getData();
    const onSearchChange = (val) => {
      alert(val);
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
    const internalInstance = getCurrentInstance();
    const openYearContextMenu = (e, yearNumber, id) => {
      internalInstance.appContext.config.globalProperties.$createContextMenu({
        event: e,
        onSelect: (key) => {
          if (key === 'appendSupervisor') {
            alert(`${yearNumber}fdf${id}`);
            state.isAppendPopUpShow = true;
          }
        },
        options: [
          // eslint-disable-next-line global-require
          { icon: require('../assets/icons/b/close.png'), title: 'إسناد مشرف لهذا القسم', key: 'appendSupervisor' },
          // eslint-disable-next-line global-require
          { icon: require('../assets/icons/b/close.png'), title: 'حذف', key: 'delete' },
          // eslint-disable-next-line global-require
          { icon: require('../assets/icons/b/close.png'), title: 'إغلاق', key: 'delete' },
        ],
      });
    };
    const openDepartmentContextMenu = (e, departmentItem) => {
      internalInstance.appContext.config.globalProperties.$createContextMenu({
        event: e,
        onSelect: () => {
          new AjaxWorker().request('/api/addNewDepartmentYear',
            { id: departmentItem.id }).then((res) => {
            if (res === 'NOINTERNETCONNECTION' || !res.state) {
              internalInstance.appContext.config.globalProperties.$createFixedNotification(
                'حدث خطاء أثناء الإتصال',
                'حاول في وقت لاحق',
                // eslint-disable-next-line global-require
                require('../assets/icons/w/exclamationF.png'),
                null,
                '#FF065A',
                3,
              );
            } else {
              internalInstance.appContext.config.globalProperties.$createFixedNotification(
                'تم إضافة عام جديد',
                'تستطيع الأن إسناد مًشرِف',
                // eslint-disable-next-line global-require
                require('../assets/icons/w/checkF.png'),
                null,
                '#00AA61',
                3,
              );
              state.isAddNewDepartmentPopUpShow = false;
              state.items = [];
              getData();
            }
          });
        },
        options: [
          // eslint-disable-next-line global-require
          { icon: require('../assets/icons/b/plusF.png'), title: 'إضافة عام دراسي', key: 'addYear' },
          // eslint-disable-next-line global-require
          { icon: require('../assets/icons/b/close.png'), title: 'حذف', key: 'delete' },
        ],
      });
    };
    const createDepartment = () => {
      const name = refs.nameInput.value.state.innerValue;
      const type = refs.typeInput.value.state.innerValue;
      new AjaxWorker().request('/api/addNewDepartment', { title: name, type })
        .then((res) => {
          if (res === 'NOINTERNETCONNECTION' || !res.state) {
            internalInstance.appContext.config.globalProperties.$createFixedNotification(
              'حدث خطاء أثناء الإتصال',
              'حاول في وقت لاحق',
              // eslint-disable-next-line global-require
              require('../assets/icons/w/exclamationF.png'),
              null,
              '#FF065A',
              3,
            );
          } else {
            internalInstance.appContext.config.globalProperties.$createFixedNotification(
              'تم إضافة القسم بنجاح',
              'تستطيع الأن إضافة الأعوام',
              // eslint-disable-next-line global-require
              require('../assets/icons/w/checkF.png'),
              null,
              '#00AA61',
              3,
            );
            state.isAddNewDepartmentPopUpShow = false;
            state.items = [];
            getData();
          }
        });
    };
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
    const submitSupVisor = (supervisorId) => {
      new AjaxWorker().request('/api/appendSupervisorToDepartment', {
        year: state.appendedYearAsInt,
        department: state.appendedDepartmentId,
        supervisor: supervisorId,
      })
        .then((res) => {
          if (res === 'NOINTERNETCONNECTION' || !res.state) {
            internalInstance.appContext.config.globalProperties.$createFixedNotification(
              'حدث خطاء أثناء الإتصال',
              'حاول في وقت لاحق',
              // eslint-disable-next-line global-require
              require('../assets/icons/w/exclamationF.png'),
              null,
              '#FF065A',
              3,
            );
          } else {
            internalInstance.appContext.config.globalProperties.$createFixedNotification(
              'تم إضافة القسم بنجاح',
              'تستطيع الأن إضافة الأعوام',
              // eslint-disable-next-line global-require
              require('../assets/icons/w/checkF.png'),
              null,
              '#00AA61',
              3,
            );
          }
        });
    };
    const onSuperVisorNameChange = (e) => {
      state.appendedDepartmentSuperVisorInputVal = e.target.value;
    };
    const onAppendSuperVisor = (e) => {
      submitSupVisor(e.selectedItems[0]);
    };
    const openYearsSetction = (deptId) => {
      state.openedYearsSetction = deptId;
      state.currentOpenedDepartmentData = [];
      state.isLoadingDepartmentData = true;
      new AjaxWorker().request('/api/getDepartmentData', {
        id: deptId,
      })
        .then((res) => {
          state.isLoadingDepartmentData = false;
          if (res === 'NOINTERNETCONNECTION' || !res.state) {
            internalInstance.appContext.config.globalProperties.$createFixedNotification(
              'حدث خطاء أثناء الإتصال',
              'حاول في وقت لاحق',
              // eslint-disable-next-line global-require
              require('../assets/icons/w/exclamationF.png'),
              null,
              '#FF065A',
              3,
            );
          } else {
            state.currentOpenedDepartmentData = res.data.allYears;
          }
        });
    };
    return {
      reactive,
      onSearchChange,
      getYearTitle,
      onSuperVisorNameChange,
      openDepartmentContextMenu,
      openYearContextMenu,
      createDepartment,
      convertDepartmentTypeToString,
      onAppendSuperVisor,
      openYearsSetction,
      state,
      refs,
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

  .departmentCellAndYears{
    display: flex;
    flex-direction: column;
  }

  .departmentCell{
    width: 92%;
    padding: 20px 4%;
    background: #fff;
    border-radius: 8px;
    margin-bottom: 10px;
    box-shadow: 0 0 5px #eee;
    display: flex;
    flex-direction: row;
    cursor: pointer;
  }

  .infoSide{
    display: flex;
    align-items: center;
  }

  .titleAndType{
    width: 100%;
    display: flex;
    flex-direction: column;
    flex:1;
  }

  .titleAndType .theTitle{
    font-size: 17px;
    color: #000;
  }

  .titleAndType .theType{
    margin-top: 5px;
    font-size: 13px;
    color: #777;
  }

  .expandIcon, .MenuIcon{
    width: 20px;
    height: 20px;
    padding: 5px;
    border-radius: 100px;
  }

  .MenuIcon, .expandIcon:hover{
    background: #eee;
  }

  .budget{
    width: 15px;
    height: 15px;
    line-height: 15px;
    padding: 5px;
    text-align: center;
    background: #8F28F0;
    border-radius: 100px;
    color: #fff;
    font-size: 12px;
    font-weight: bold;
  }

  .yearsSection{
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
  }

  .departmentYearCell{
    display: flex;
    flex-direction: column;
    background: #fff;
    padding: 20px 20px;
    flex: 1;
    border-radius: 8px;
  }

  .theYearTitleAndOptionButton{
    font-size: 14px;
    color: #000;
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
  }
  .theYearTitleAndOptionButton .optionIcon{
    width: 15px;
    height: 15px;
    padding:7px;
    background: #eee;
    border-radius: 100px;
    cursor: pointer;
  }

  .theYearTitleAndOptionButton .optionIcon:hover{background: #ccc;}

  .theYearTitleAndOptionButton img{
    width: 15px;
    height: 15px;
  }

  .theYearInfo{
    display: flex;
    flex-direction: row;
    margin-top: 20px;
  }

  .theYearInfo .cel{
    padding: 5px 20px;
    background: #fefefe;
    border: 1px solid #ccc;
    border-radius: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .theYearInfo .cel img{
    width: 15px;
    height: 15px;
  }
  .theYearInfo .cel .theKey{
    font-size: 13px;
  }
  .theYearInfo .cel .theValue{
    font-size: 13px;
    font-weight: bold;
  }
  .formArea{
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .appedndedDepartmentMarker{
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 14px;
    color: #666;
    font-weight: bold;
  }
  .appedndedDepartmentMarker img{
    width: 12px;
    height: 12px;
    padding: 0 10px;
  }

  .loadingDepartmentData{
    align-self: center;
    justify-self: center;
    width: 20px;
    padding: 20px 0;
  }
</style>
