<template>
  <button
    class="mainButton" :style="{background:background,color:textColor,fontSize:fontSize+'px'}">
    {{text}}
  </button>
</template>

<script>

export default {
  name: 'DuButton',
  props: {
    text: {
      type: String,
      default: '',
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
      default: 14,
    },
  },
};

</script>

<style scoped>
  .mainButton{
    border: 0;
    padding: 10px 20px;
    border-radius: 100px;
    cursor: pointer;
  }
</style>
