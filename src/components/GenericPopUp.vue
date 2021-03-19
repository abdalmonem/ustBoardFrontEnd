<template>
  <div class="GenericPopUp" v-if="isShowing">
    <div class="scrollArea">
      <div class="theBody">
      <div class="theTitle">
        {{ title }}
       <img src="../assets/icons/b/close.png" @click="this.$emit('close', null)"/>
      </div>
      <div class="theContent">
        <slot />
      </div>
    </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'GenericPopUp',
  components: {},
  props: {
    title: {
      type: String,
      default: '',
    },
    isShowing: {
      type: Boolean,
      default: true,
    },
  },
  created() {
    document.addEventListener('keyup', (evt) => {
      if (evt.keyCode === 27) {
        if (this.isShowing) {
          this.$emit('close', null);
        }
      }
    });
  },
};
</script>

<style scoped>
  .GenericPopUp{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.9);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: end;
  }

  .scrollArea{
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 10px;
  }

  .theBody{
    width: 30%;
    padding: 20px 0;
    margin: 100px auto;
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 0 10px #eee;
    display: flex;
    flex-direction: column;
    align-self: end;
    flex: 1;
  }

  .slideIcon{
    width: 15px;
    height: 15px;
    justify-self: center;
    align-self:  center;
  }

  .theTitle{
    justify-self: center;
    align-self:  center;
    font-size: 16px;
    border-bottom: 1px solid #eee;
    width: 90%;
    padding: 5px 5% 20px 5%;
    box-shadow: 0px 5px 6px #fefefe;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .theTitle img{
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
  .theTitle img:hover{
    background: #eee;
    padding: 5px;
    width: 15px;
    height: 15px;
    border-radius: 100px;
  }
  .closeIcon{
    position: fixed;
    left: 20%;
    top: 100px;
  }

  .theContent{
    padding: 20px;
    display: flex;
  }
</style>
