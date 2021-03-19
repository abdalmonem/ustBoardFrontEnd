<template>
  <div class="lectureTable">
    <div :class="'row ' + (index === 1?' head': '')" v-for="index in 8" :key="index">
      <div :class="'cell ' + (cellIndex === 1?' startCell': '')"
           v-for="cellIndex in 5" :key="cellIndex">
      <section v-if="index === 1">
        <section v-if="cellIndex > 1">{{ getTimeAsString(cellIndex - 1) }}</section>
        <section v-else></section>
      </section>
      <section v-else>
        <section v-if="cellIndex === 1">{{ getDayAsString(index - 1) }}</section>
        <section class="editableLecture"
                 @click="onCellClick(cellIndex -1, index -1)" v-else>
          <div class="lectureName"
               v-if="getMaterialTitle(cellIndex -1, index -1) !== null">
            {{  getMaterialTitle(cellIndex -1, index -1)  }}
          </div>
          <div class="lectureName"
               :style="{color: '#ccc', fontSize: '12px'}" v-else> إضافة مادة </div>
          <div class="TeacherName">{{ getTeacherName(cellIndex -1, index -1) }}</div>
          <div class="hallInfo">{{ getHallName(cellIndex -1, index -1) }}</div>
        </section>
      </section>
    </div>
    </div>
  </div>
</template>

<script>
import { reactive, watch } from 'vue';
import AjaxWorker from '@/jsHelpers/AjaxWorker';

export default {
  name: 'LecturesTables',
  props: {
    type: {
      type: String,
      default: 'class',
    },
    groupId: {
      type: String,
      default: null,
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      data: [],
    });
    const getTimeAsString = (index) => {
      let ret = '';
      [
        '8:00 - 10:00',
        '10:00 - 12:00',
        '1:00 - 3:00',
        '3:00 - 5:00',
      ].forEach((item, i) => {
        if (index === i + 1) {
          ret = item;
        }
      });
      return ret;
    };
    const getDayAsString = (index) => {
      let ret = '';
      ['السبت', 'الأحد', 'الإثنين', 'الثلاث', 'الأربع', 'الخميس', 'الجمعة'].forEach((item, i) => {
        if (index === i + 1) {
          ret = item;
        }
      });
      return ret;
    };
    const getLectureCelData = () => '<b>fdf</b>';
    const onCellClick = (cellIndex, index) => {
      emit('select', { x: cellIndex, y: index });
    };
    const getLectures = (params) => {
      new AjaxWorker().request('/api/getLectures', params)
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
            // state.departments = state.departments.concat(res.data.items);
            state.data = res.data;
          }
        });
    };
    getLectures({
      groupId: props.groupId,
    });
    const getMaterialTitle = (position, day) => {
      let returnedValue = null;
      if (state.data.length > 0) {
        state.data.forEach((item) => {
          if (item.position.toString() === position.toString()
            && item.day.toString() === day.toString()) {
            returnedValue = item.material_info.title;
          }
        });
      }
      return returnedValue;
    };
    const getTeacherName = (position, day) => {
      let returnedValue = '';
      if (state.data.length > 0) {
        state.data.forEach((item) => {
          if (item.position.toString() === position.toString()
            && item.day.toString() === day.toString()) {
            returnedValue = item.teacher_info.username;
          }
        });
      }
      return returnedValue;
    };
    const getHallName = (position, day) => {
      let returnedValue = '';
      if (state.data.length > 0) {
        state.data.forEach((item) => {
          if (item.position.toString() === position.toString()
            && item.day.toString() === day.toString()) {
            returnedValue = item.hall.toString();
          }
        });
      }
      return returnedValue;
    };
    watch(() => props.groupId, () => {
      getLectures({
        groupId: props.groupId,
      });
    });
    return {
      getHallName,
      getTeacherName,
      getMaterialTitle,
      onCellClick,
      getDayAsString,
      getTimeAsString,
      getLectureCelData,
      state,
    };
  },
};
</script>

<style scoped>
  .lectureTable{
    width: 100%;
    height: auto;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px #eee;
    display: flex;
    flex-direction: column;
    overflow: auto;
  }
  .row{
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #000;
    border-bottom: 1px solid #eee;
  }
  .head{
    color: #888;
  }
  .row .cell{
    flex: 1;
    padding: 25px 3%;
    display: flex;
    flex-direction: column;
  }
  .startCell{
    color: #888;
  }
  .row .cell .lectureName{
    font-size: 14px;
    font-weight: bold;
    color: #000;
  }
  .row .cell .TeacherName{
    font-size: 13px;
    margin-top: 10px;
    color: #8F28F0;
  }
  .editableLecture{
    cursor: pointer;
  }

  .hallInfo{
    font-size: 12px;
    color: #999;
    font-weight: bold;
    margin-top: 10px;
  }
</style>
