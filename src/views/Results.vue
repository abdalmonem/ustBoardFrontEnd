<template>
  <div class="mainContainer">
    <div class="resultsTable">
      <div class="row">
        <div class="cell">الرقم</div>
        <div class="cell">الأسم</div>
        <div class="cell materialCell rotate">مادة واحد</div>
        <div class="cell materialCell rotate">مادة واحد</div>
        <div class="cell materialCell rotate">مادة واحد</div>
        <div class="cell materialCell rotate">مادة واحد</div>
        <div class="cell materialCell rotate">مادة واحد</div>
        <div class="cell materialCell rotate">مادة واحد</div>
        <div class="cell materialCell rotate">مادة واحد</div>
        <div class="cell materialCell rotate">مادة واحد</div>
        <div class="cell materialCell rotate">مادة واحد</div>
        <div class="cell materialCell rotate">مادة واحد</div>
        <div class="cell materialCell rotate">مادة واحد</div>
        <div class="cell materialCell rotate">مادة واحد</div>
        <div class="cell materialCell rotate">مادة واحد</div>
        <div class="cell materialCell rotate">متوسط النقاط المكتسبة</div>
      </div>
      <div class="row">
        <div class="cell"></div>
        <div class="cell">عدد الساعات</div>
        <div class="cell materialCell">4</div>
        <div class="cell materialCell">4</div>
        <div class="cell materialCell">4</div>
        <div class="cell materialCell">4</div>
        <div class="cell materialCell">4</div>
        <div class="cell materialCell">4</div>
        <div class="cell materialCell">4</div>
        <div class="cell materialCell">4</div>
        <div class="cell materialCell">4</div>
        <div class="cell materialCell">4</div>
        <div class="cell materialCell">4</div>
        <div class="cell materialCell">4</div>
        <div class="cell materialCell">4</div>
        <div class="cell materialCell">4</div>
      </div>
      <div class="row">
        <div class="cell"></div>
        <div class="cell">وجدي إبراهيم</div>
        <div class="cell materialCell"><input placeholder="#" /></div>
        <div class="cell materialCell"><input placeholder="#" /></div>
        <div class="cell materialCell"><input placeholder="#" /></div>
        <div class="cell materialCell"><input placeholder="#" /></div>
        <div class="cell materialCell"><input placeholder="#" /></div>
        <div class="cell materialCell"><input placeholder="#" /></div>
        <div class="cell materialCell"><input placeholder="#" /></div>
        <div class="cell materialCell"><input placeholder="#" /></div>
        <div class="cell materialCell"><input placeholder="#" /></div>
        <div class="cell materialCell"><input placeholder="#" /></div>
        <div class="cell materialCell"><input placeholder="#" /></div>
        <div class="cell materialCell"><input placeholder="#" /></div>
        <div class="cell materialCell"><input placeholder="#" /></div>
        <div class="cell materialCell"><input placeholder="#" /></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Results',
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
  line-height: 308%;
}
.materialCell{
  width: 2.5%;
  text-align: center;
  flex: 1;
}
</style>
