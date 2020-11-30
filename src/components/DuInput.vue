<template>
  <div class="DuInputMainContainer">
    <div
      class="label"
      :style="{ color: labelColor }">
      {{ label }}
    </div>
    <input
      :style="{
        border: inputBorder.border.size + 'px ' + inputBorder.border.style + inputBorder.border.color
      }"
    />
  </div>
</template>

<script>

export default {
  name: 'DuInput',
  props: {
    label: {
      type: String,
      default: '',
    },
    labelColor: {
      type: String,
      default: '#555'
    },
    inputBorder: {
      border: {
        size: {
          type: Number,
        },
        style: {
          type: String,
        },
        color: {
          type: String,
        },
      },
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
  .DuInputMainContainer input{
    font-size: 17px;
    border-radius: 8px;
    background: #fcfcfc;
    border: 1px solid #ccc;
    padding: 14px;
  }
</style>
