<template>
  <div class="DuInputMainContainer">
    <div class="label">{{label}}</div>
    <input />
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
    color: #555;
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
