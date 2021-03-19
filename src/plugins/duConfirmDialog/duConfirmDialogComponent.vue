<template>
  <div>
    <div class="theConfirmDialogLightBox" v-for="item in state.dialogsStack" :key="item.id">
      <div class="confirmDialogBox">
        <div class="theTitle">{{ item.title }}</div>
        <div class="theDesc" :style="{ color: item.descriptionColor }">{{  item.description }}</div>
        <div class="buttonsArea">
          <button @click="item.onConfirm" ref="confirm">{{ item.confirmText }}</button>
          <div class="bord"></div>
          <button @click="closeDialog(); item.onCancel">
            {{ item.cancelText }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { watch, reactive } from 'vue';

export default {
  name: 'duConfirmDialogComponent',
  setup() {
    const state = reactive({
      dialogsStack: [],
    });
    const blurBack = () => {
      document.getElementById('app').style.filter = `blur(${(state.dialogsStack.length) * 3}px)`;
    };
    const unBlurBack = () => {
      document.getElementById('app').style.filter = 'blur(0px)';
    };
    const dialogKeyListener = (e) => {
      if (e.keyCode === 27) {
        if (state.dialogsStack[state.dialogsStack.length - 1].onCancel !== undefined) {
          state.dialogsStack[state.dialogsStack.length - 1].onCancel();
        }
        state.dialogsStack = [];
        document.removeEventListener('keydown', dialogKeyListener);
      } else if (e.keyCode === 13) {
        state.dialogsStack[state.dialogsStack.length - 1].onConfirm();
        state.dialogsStack = [];
        document.removeEventListener('keydown', dialogKeyListener);
      }
    };
    const closeDialog = () => {
      state.dialogsStack = [];
      document.removeEventListener('keydown', dialogKeyListener);
    };
    document.addEventListener('createConfirmDialog', (e) => {
      state.dialogsStack.push(e.data);
      document.addEventListener('keydown', dialogKeyListener);
      blurBack();
    });
    watch(() => state.dialogsStack.length, () => {
      if (state.dialogsStack.length === 0) {
        unBlurBack();
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
  .theConfirmDialogLightBox{
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
  .confirmDialogBox{
    width: 30%;
    padding-top: 30px;
    background: #fff;
    box-shadow: 0 0 10px #999;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
  }

  .theTitle{
    font-size: 16px;
    color: #555;
    padding: 0 20px;
  }

  .theDesc{
    margin-top: 20px;
    font-size: 14px;
    color: #555;
    padding: 0 20px;
  }

  .buttonsArea{
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    width: 100%;
    align-items: center;
    background: #eee;
    border-top: 2px solid #eee;
  }

  .buttonsArea button{
    flex: 1;
    padding: 20px 10px;
    border: 0;
    background: #fff;
    font-size: 15px;
    cursor: pointer;
  }

  .buttonsArea button:hover{
    background: #eee;
  }

  .bord{
    height: 50px;
    width: 2px;
  }
</style>
