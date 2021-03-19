<template>
  <button
    @mouseover="isHovered = true" @mouseleave="isHovered = false"
    class="mainButton"
    :style="getStyle()" >
    <span v-if="!isInProgress">{{text}}</span>
    <slot v-if="icon !== null">
      <div style="width: 10px; height: 10px;"></div>
      <img
      class="icon"
      :src="icon"
      :style="{width: `${this.fontSize + 3}px`, height: `${this.fontSize + 3}px`}"/>
    </slot>
    <img
      v-if="isInProgress"
      class="progressBtn"
      src="../assets/icons/loading.gif"
      :style="{width: `${this.fontSize + 3}px`, height: `${this.fontSize + 3}px`}"/>
  </button>
</template>

<script>
import ColorsWorker from '../jsHelpers/ColorsWorker';

export default {
  name: 'DuButton',
  data() {
    return {
      isHovered: false,
    };
  },
  methods: {
    showAlert() {
      alert('fd');
    },
    getStyle() {
      const componentStyle = {
        background: this.background,
        color: this.textColor,
        fontSize: `${this.fontSize}px`,
        cursor: 'pointer',
        boxShadow: `0px 0px 10px rgba(${new ColorsWorker().hexToRgbA(this.background)}, 0.4)`,
      };
      if (this.isDisabled) {
        componentStyle.opacity = 0.5;
        componentStyle.pointerEvents = 'none';
        componentStyle.cursor = 'not-allowed';
      }
      if (this.isHovered) {
        componentStyle.background = '#fff';
        componentStyle.color = this.background;
        componentStyle.border = `2px solid ${this.background}`;
        componentStyle.boxShadow = `0px 0px 15px rgba(${new ColorsWorker().hexToRgbA(this.background)}, 0.2)`;
      }
      if (this.isInProgress) {
        componentStyle.padding = '3px 20px';
        componentStyle.background = '#fff';
        componentStyle.pointerEvents = 'none';
        componentStyle.boxShadow = '0px';
        componentStyle.border = '2px solid #ccc';
      }
      return componentStyle;
    },
  },
  props: {
    text: {
      type: String,
      default: '',
    },
    icon: {
      default: null,
    },
    background: {
      type: String,
      default: '#8F28F0',
    },
    textColor: {
      type: String,
      default: '#fff',
    },
    fontSize: {
      type: Number,
      default: 15,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isInProgress: {
      type: Boolean,
      default: false,
    },
  },
};

</script>

<style scoped>
  .mainButton{
    border: 0;
    padding: 6px 20px;
    border-radius: 100px;
    display: flex;
    border: 2px solid transparent;
    justify-items: center;
    justify-content: center;
    align-items: center;
    align-content: center;
  }
</style>
