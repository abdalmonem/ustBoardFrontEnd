<template>
  <div class="duInputLightBox" v-show="state.isMenuLightBoxIsOpen" @click="closeSelectMenu()"></div>
  <div class="DuInputMainContainer" ref="mainContainer">
    <div
      class="label"
      :style="{ color: labelColor }">
      {{ label }}
    </div>
    <div class="inputSection" :class="!state.isValid ? 'errorBorder' : '' ">
      <div v-if="type === 'selectMenu'" class="selectMenu">
        <div class="selectMenuPlaceHolder"
             @click="openSelectMenu()">{{ getSelectMenuInterfaceText() }}</div>
        <div class="selectMenuBody"
             id="selectMenuBodyId"
             v-if="state.isMenuLightBoxIsOpen"
             :style="{ width: getMainContainerWidth() + 'px', }">
          <div class="theLightBoxTitle">{{ placeholder }}</div>
          <div class="theContentArea">
            <div class="cell" v-for="item in options" :key="item.text"
                 @click="selectMenuItem(item)">
              <img :src="item.icon" v-if="item.icon !== undefined"/>
              <div style="width: 20px;height: 20px;"  v-if="item.icon !== undefined"></div>
              <dive class="theText">{{ item.text }}</dive>
            </div>
          </div>
        </div>
      </div>
      <input v-model="state.innerValue"
         @focusout="onFocusOut"
         @input="onInputHandle"
         @keydown="onkeydown"
         v-else
      />
      <img src="../assets/icons/errorSpot.png" class="errorSpot" v-if="!state.isValid" />
      <div v-if="type === 'selectMenu'" class="selectMenuMark" @click="openSelectMenu()">
        <img src="../assets/icons/b/rowDown.png" />
        <div style="width: 15px;height: 15px;"></div>
      </div>
    </div>
    <div class="errorHandler" v-if="!state.isValid">
      {{ state.errorMessage }}
    </div>
  </div>
</template>

<script>
import {
  reactive, ref, onMounted, watch,
} from 'vue';

export default {
  name: 'DuInput',
  setup(props, { emit }) {
    const mainContainer = ref();
    const state = reactive({
      isFocusBefore: false,
      innerValue: props.value,
      errorMessage: '',
      isValid: true,
      mainContainerWidth: 0,
      isMenuLightBoxIsOpen: false,
    });
    onMounted(() => {
      state.mainContainerWidth = mainContainer.value.clientWidth;
    });
    const getMainContainerWidth = () => state.mainContainerWidth;
    const validateNow = () => {
      state.isValid = true;
      if (props.isRequired) {
        if (state.isFocusBefore && state.innerValue === '') {
          state.isValid = false;
          state.errorMessage = props.isRequiredErrorMessage;
        }
      }
      if (state.isValid && props.type !== null) {
        if (props.type === 'phone') {
          if (Number.isNaN(Number(state.innerValue))) {
            state.isValid = false;
            state.errorMessage = props.typeErrorMessage;
          }
        } else if (state.type === 'email') {
          const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*) |(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (!re.test(String(state.innerValue).toLowerCase())) {
            state.isValid = false;
            state.errorMessage = props.typeErrorMessage;
          }
        }
      }
      if (state.isValid && props.minLength !== null) {
        if (state.innerValue.length < props.minLength) {
          state.isValid = false;
          state.errorMessage = props.minLengthErrorMessage;
        }
      }
      if (state.isValid && props.maxLength !== null) {
        if (state.innerValue.length > props.maxLength) {
          state.isValid = false;
          state.errorMessage = props.maxLengthErrorMessage;
        }
      }
    };
    const onKeyPressHandle = () => {
      if (state.isFocusBefore) {
        validateNow();
      }
    };
    const onInputHandle = (e) => {
      emit('input', e);
      state.innerValue = e.target.value;
      if (state.isFocusBefore) {
        validateNow();
      }
    };
    const onFocusOut = () => {
      state.isFocusBefore = true;
      if (state.isFocusBefore) {
        validateNow();
      }
    };
    const onkeydown = (e) => {
      emit('keydown', e);
    };
    const openSelectMenu = () => {
      if (!state.isMenuLightBoxIsOpen) {
        state.isMenuLightBoxIsOpen = true;
      }
    };
    const closeSelectMenu = () => {
      state.isMenuLightBoxIsOpen = false;
    };
    const selectMenuItem = (item) => {
      onFocusOut();
      state.innerValue = item.value;
      emit('change', { value: item.value, target: { value: item.value } });
      validateNow();
      closeSelectMenu();
    };
    const getSelectMenuInterfaceText = () => {
      let interfaceText = props.placeholder;
      props.options.forEach((item) => {
        if (item.value === state.innerValue) {
          interfaceText = item.text;
        }
      });
      return interfaceText;
    };
    const dialogKeyListener = (e) => {
      if (e.keyCode === 27) {
        if (state.dialogsStack[state.dialogsStack.length - 1].onClose !== undefined) {
          state.dialogsStack[state.dialogsStack.length - 1].onClose();
        }
        document.removeEventListener('keydown', dialogKeyListener);
      }
    };
    watch(() => state.isMenuLightBoxIsOpen, () => {
      if (state.isMenuLightBoxIsOpen) {
        document.addEventListener('keydown', dialogKeyListener);
      } else {
        document.removeEventListener('keydown', dialogKeyListener);
      }
    });
    return {
      selectMenuItem,
      onFocusOut,
      onInputHandle,
      onKeyPressHandle,
      validateNow,
      onkeydown,
      state,
      mainContainer,
      getMainContainerWidth,
      openSelectMenu,
      closeSelectMenu,
      getSelectMenuInterfaceText,
    };
  },
  props: {
    options: {
      default: {},
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    value: {},
    labelColor: {
      type: String,
      default: '#555',
    },
    type: {
      type: String,
      default: 'text',
    },
    typeErrorMessage: {
      type: String,
      default: '',
    },
    isRequired: {
      type: Boolean,
      default: true,
    },
    isRequiredErrorMessage: {
      type: String,
      default: '',
    },
    minLength: {
      type: Number,
      default: null,
    },
    minLengthErrorMessage: {
      type: String,
      default: '',
    },
    maxLength: {
      type: Number,
      default: null,
    },
    maxLengthErrorMessage: {
      type: String,
      default: '',
    },
  },
};

</script>

<style scoped>
  .DuInputMainContainer{
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .DuInputMainContainer .label{
    font-size: 17px;
    /* color: #555; */
    margin-bottom: 10px;
  }
  .DuInputMainContainer .inputSection{
    border-radius: 8px;
    background: #fcfcfc;
    border: 1px solid #ccc;
    overflow: hidden;
    display: flex;
    flex-direction: row;
  }
  .DuInputMainContainer input,.selectMenu{
    font-size: 17px;
    border: 0;
    padding: 14px;
    background: transparent;
    flex: 1;
  }
  .errorBorder{
    border: 1px solid rgba(238, 119, 154, 1) !important;
    background: rgba(238, 119, 154, 0.01) !important;
  }
  .errorHandler{
    padding: 10px 2%;
    color: rgba(238, 119, 154, 1);
    border-radius: 8px;
    font-size: 14px;
  }

  .errorSpot{
    width: 20px;
    height: 20px;
    padding: 14px;
  }

  .selectMenuMark{
    align-self: center;
    display: flex;
    flex-direction: row;
    cursor: pointer;
  }

  .selectMenuMark img{
    width: 20px;
    height: 20px;
    margin-top: 5px;
  }

  .duInputLightBox{
    width: 100%;
    height: 100%;
    left:0;
    top: 0;
    background: rgba(0, 0, 0, 0.7);
    position: fixed;
    z-index: 10;
  }

  .selectMenu{
    cursor: pointer;
  }

  .selectMenuBody{
    position: absolute;
    margin: -15px;
    max-height: 240px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 20px #000;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    z-index: 20;
  }

  .selectMenuBody .theLightBoxTitle{
    border-bottom: 1px solid #eee;
    padding: 25px;
    font-size: 14px;
  }

  .selectMenuBody .theContentArea{
    flex-direction: column;
    display: flex;
    overflow-y: auto;
  }
  .selectMenuBody .theContentArea .cell{
    flex-direction: row;
    display: flex;
    align-items: center;
    padding: 20px;
  }
  .selectMenuBody .theContentArea .cell:hover{
    background: #eee;
  }
  .selectMenuBody .theContentArea .theText{
    font-size: 16px;
    flex: 1;
  }
  .selectMenuBody .theContentArea .cell img{
    width: 16px;
    height: 16px;
  }
  .selectMenuPlaceHolder{ flex: 1; }
</style>
