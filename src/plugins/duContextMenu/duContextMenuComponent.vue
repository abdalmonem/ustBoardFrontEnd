<template>
  <div>
    <div class="theContextMenuLightBox"
         v-for="item in state.dialogsStack" :key="item.id" id="parentMenu">
      <div class="ContextMenuBox" :style="{
        left: state.xMousePosition + 'px',
           top: state.yMousePosition + 'px', }">
          <div class="cell" v-for="option in item.options" :key="option.key"
               @click="item.onSelect(option.key); closeDialog()">
            <img :src="option.icon"/>
            <div style="width: 20px;height: 10px;"></div>
            <div class="theTitle">{{ option.title }}</div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { watch, reactive } from 'vue';

export default {
  name: 'duContextMenuComponent',
  setup() {
    const state = reactive({
      dialogsStack: [],
      xMousePosition: 0,
      yMousePosition: 0,
    });
    const blurBack = () => {
      document.getElementById('app').style.filter = `blur(${(state.dialogsStack.length) * 3}px)`;
      document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    };
    const unBlurBack = () => {
      document.getElementById('app').style.filter = 'blur(0px)';
      document.getElementsByTagName('body')[0].style.overflow = 'auto';
    };
    const closeDialog = () => {
      state.dialogsStack = [];
    };
    const isDescendant = (el, parentId) => {
      let isChild = false;
      if (el.id === parentId) {
        isChild = true;
      }
      // eslint-disable-next-line no-cond-assign,no-param-reassign
      while (el === el.parentNode) {
        if (el.id === parentId) {
          isChild = true;
        }
      }
      return isChild;
    };
    const outSideClickListener = (e) => {
      // في حال المستخدم ضغط برا القائمة
      if (isDescendant(e.target, 'parentMenu')) {
        closeDialog();
      }
    };
    const dialogKeyListener = (e) => {
      if (e.keyCode === 27) {
        if (state.dialogsStack[state.dialogsStack.length - 1].onCancel !== undefined) {
          state.dialogsStack[state.dialogsStack.length - 1].onCancel();
        }
        closeDialog();
      }
    };
    document.addEventListener('createContextMenu', (e) => {
      state.xMousePosition = e.data.event.clientX;
      state.yMousePosition = e.data.event.clientY;
      state.dialogsStack.push(e.data);
    });
    watch(() => state.dialogsStack.length, () => {
      if (state.dialogsStack.length === 0) {
        unBlurBack();
        document.removeEventListener('keydown', dialogKeyListener);
        document.removeEventListener('click', outSideClickListener);
      } else {
        blurBack();
        document.addEventListener('click', outSideClickListener);
        document.addEventListener('keydown', dialogKeyListener);
      }
    });
    return {
      state,
      closeDialog,
    };
  },
};
</script>

<style scoped>
  .theContextMenuLightBox{
    display: flex;
    position: fixed;
    background: rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    align-items: center;
    justify-content: center;
    opacity: 0.97;
  }
  .ContextMenuBox{
    background: #fff;
    box-shadow: 0 0 10px #999;
    border-radius: 10px;
    display: flex;
    align-items: start;
    justify-content: start;
    flex-direction: column;
    overflow: hidden;
    position: absolute;
  }
  .cell{
    padding: 15px;
    border-bottom: 1px solid #eee;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    align-content: space-between;
    cursor: pointer;
    align-self: stretch;
  }
  .cell:hover{
    background: #fefefe;
  }
  .cell:active{
    background: #ccc;
  }
  .cell .theTitle{
    min-width: 100px;
    flex: 1;
    font-size: 15px;
    color: #000;
  }
  .cell img{
    width: 15px;
    height: 15px;
  }
</style>
