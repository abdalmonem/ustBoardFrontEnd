<template>
  <div class="modal" v-if="showModal">
    <div class="modal-body">
      <header> {{ title }} </header>
      <div class="content">
        {{ content }}
      </div>
      <slot class="buttons">
        <du-button
          @click.prevent="showModal = false"
          text="إلغاء"
          style="background: #eee; color: rgba(0, 0, 0, .6);"
          >
        </du-button>
        <du-button
          :text="btnPlus.text"
          :style="{
            background: btnPlus.style.background,
            color: btnPlus.style.color,
            marginRight: btnPlus.style.marginRight + 'px'
          }">
        </du-button>
      </slot>
    </div>
  </div>
</template>

<script>

import DuButton from '../DuButton.vue';

export default {
  name: 'DuModal',
  props: {
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    alert: {
      type: String,
      default: 'warning',
    },
    showModal: {
      type: Boolean,
      default: true,
    },
    btnPlus: {
      text: {
        type: String,
        default: '',
      },
      style: {
        background: {
          type: String,
          default: '#17bed2',
        },
        color: {
          type: String,
          default: 'rgba(0, 0, 0, 0.6)',
        },
        marginRight: {
          type: Number,
        }
      },
      show: {
        type: Boolean,
        default: false,
      },
    },
  },
  components: {
    duButton: DuButton,
  },
};
</script>

<style scoped>
  .modal {
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .modal-body {
    width: 50%;
    margin: auto;
    padding-bottom: 10px;
    border-radius: 10px;
    background-color: #fff;
  }
  header {
    font-size: 25px;
    padding: 10px 0;
    border-bottom: 3px dotted #eee;
  }
  .content {
    padding: 20px 10px;
    line-height: 1.5;
  }
</style>
