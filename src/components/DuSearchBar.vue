<template>
  <div class="searchBar">
    <input :placeholder="placeholder" @keyup="onKeyPress"/>
  </div>
</template>

<script>
export default {
  name: 'DuSearchBar',
  props: {
    placeholder: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const onKeyPress = (e) => {
      emit('onkeywordchange', e.target.value);
    };
    return {
      onKeyPress,
    };
  },
};
</script>

<style scoped>
  .searchBar{
    width: 92%;
    padding: 20px 4%;
    margin-top: 20px;
    background: #fff;
    border-radius: 100px;
    display: flex;
    flex-direction: row;
    box-shadow: 0 0 2px #ccc;
  }

  .searchBar input{
    border: 0;
    flex: 1;
    font-size: 17px;
  }
</style>
