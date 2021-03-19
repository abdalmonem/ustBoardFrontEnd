<template>
  <div>
    <div class="DialogLightBox" v-for="item in state.dialogsStack" :key="item.id">
      <div class="confirmDialogBox">
        <div class="theTitle">{{ item.title }}</div>
        <div class="theDesc" :style="{ color: item.descriptionColor }">{{  item.description }}</div>
        <button @click="closeDialog">{{ item.closeButtonText }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { watch, reactive } from 'vue';

export default {
  name: 'duDialogComponent',
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
      if (e.keyCode === 27 || e.keyCode === 13) {
        if (state.dialogsStack[state.dialogsStack.length - 1].onClose !== undefined) {
          state.dialogsStack[state.dialogsStack.length - 1].onClose();
        }
        state.dialogsStack = [];
        document.removeEventListener('keydown', dialogKeyListener);
      }
    };
    const closeDialog = () => {
      if (state.dialogsStack[state.dialogsStack.length - 1].onClose !== undefined) {
        state.dialogsStack[state.dialogsStack.length - 1].onClose();
      }
      state.dialogsStack = [];
      document.removeEventListener('keydown', dialogKeyListener);
    };
    document.addEventListener('createDialog', (e) => {
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
  .DialogLightBox{
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
    font-size: 19px;
    color: #555;
    padding: 0 20px;
  }

  .theDesc{
    margin-top: 20px;
    font-size: 16px;
    color: #999;
    padding: 0 20px;
  }

  button{
    flex: 1;
    padding: 20px 0px;
    border: 0;
    background: #fff;
    font-size: 15px;
    cursor: pointer;
    width: 100%;
    margin-top: 30px;
    border-top: 1px solid #ccc;
  }

  button:hover{
    background: #eee;
  }

</style>
