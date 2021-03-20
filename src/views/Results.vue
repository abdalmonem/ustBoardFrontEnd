<template>
  {{ state.allMaterials }}
  <br/>____________<br/>
  <pre>{{ state.results[0] }}</pre>
  <div class="mainContainer">
    <div class="resultsTable">
      <div class="row">
        <div class="cell">الرقم</div>
        <div class="cell">الأسم</div>
        <div class="cell materialCell rotate"
             v-for="material in state.allMaterials" :key="material.id">
          {{ material.title }}
        </div>
        <div class="cell materialCell rotate">متوسط النقاط المكتسبة</div>
      </div>
      <div class="row">
        <div class="cell"></div>
        <div class="cell">عدد الساعات</div>
        <div class="cell materialCell"
             v-for="material in state.allMaterials" :key="material.id">
          {{ material.hours_rate }}
        </div>
        <div class="cell materialCell"></div>
      </div>
      <div class="row" v-for="student in state.results" :key="student.id">
        <div class="cell"></div>
        <div class="cell">{{ student.username }}</div>
        <div class="cell materialCell"
             v-for="result in student.result" :key="result.material_id">
          <input placeholder="#"
                 :id="student.id.toString() + '_' + result.material_id.toString()"
                 :value="result.degree"
                 @change="(e) => calculate(e, student.id, result.material_id)"/>
        </div>
        <div class="cell materialCell">
          {{ calcsGPA(student.id.toString()) }}
        </div>
      </div>
    </div>
    <div style="width: 20px; height:100px;"></div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import AjaxWorker from '@/jsHelpers/AjaxWorker';

export default {
  name: 'Results',
  setup() {
    const state = reactive({
      results: [],
      allMaterials: [],
    });
    const getResults = () => {
      new AjaxWorker().request('/api/getResults', {}).then((res) => {
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
          res.data.materials.forEach((item) => {
            state.allMaterials.push(item);
          });
          state.results = res.data.results;
        }
      });
    };
    getResults();
    const saveResultBlock = (degree, studentId, materialId) => {
      new AjaxWorker().request('/api/addResult', {
        degree,
        studentId,
        materialId,
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
          this.$createFixedNotification(
            'تم تحديث النتيجة',
            '...',
            // eslint-disable-next-line global-require
            require('../assets/icons/w/checkF.png'),
            null,
            '#00EC7F',
            3,
          );
        }
      });
    };
    const calculate = (e, studentId, mateirlaId) => {
      const { value } = e.target;
      if (!['A', 'B', 'B+', 'C', 'C+', 'F'].includes(value.toUpperCase())) {
        e.target.value = '';
      } else {
        state.results.forEach((item, index) => {
          if (item.id.toString() === studentId.toString()) {
            item.result.forEach((materialResult, materialIndex) => {
              if (materialResult.material_id.toString() === mateirlaId.toString()) {
                state.results[index].result[materialIndex].degree = value;
              }
            });
          }
        });
        saveResultBlock(value, studentId, mateirlaId);
      }
    };
    const calcsGPA = (id) => {
      let val = 0;
      let allHoursRate = 1;
      state.results.forEach((item) => {
        if (item.id.toString() === id.toString()) {
          item.result.forEach((materialResult) => {
            let gradePoints = 0;
            if (materialResult.degree === null) {
              gradePoints = 0;
            } else if (materialResult.degree.toUpperCase() === 'A') {
              gradePoints = 4;
            } else if (materialResult.degree.toUpperCase() === 'B+') {
              gradePoints = 3.3;
            } else if (materialResult.degree.toUpperCase() === 'B') {
              gradePoints = 3;
            } else if (materialResult.degree.toUpperCase() === 'C+') {
              gradePoints = 2.3;
            } else if (materialResult.degree.toUpperCase() === 'C') {
              gradePoints = 2;
            }
            val += gradePoints * materialResult.hours_rate;
            allHoursRate += materialResult.hours_rate;
          });
        }
      });
      return val / allHoursRate;
    };
    return {
      state,
      calculate,
      calcsGPA,
    };
  },
};
</script>

<style scoped>
.mainContainer{
    min-height: 500px;
    width: 90%;
    margin: 0px 5%;
    display: flex;
    flex-direction: column;
  }
.resultsTable{
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;
  padding: 20px;
}
.row{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.cell{
  width: 10%;
  padding: 10px 5px;
  font-size: 15px;
}
.cell input{
  border: 0;
  width: 100%;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
}
.rotate{
  -ms-writing-mode: tb-rl;
  -webkit-writing-mode: vertical-rl;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  white-space: nowrap;
  align-self: start;
  justify-self: center;
  vertical-align: center;
  line-height: 350%;
}
.materialCell{
  width: 2.5%;
  text-align: center;
  flex: 1;
}
</style>
