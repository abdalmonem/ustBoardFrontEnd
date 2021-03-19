<template>
  <div class="DuContextMenu" v-show="isOpen" id="parentMenu">
    <div class="item" v-for="item in items" :key="item.key"
         :ref="`contextMenuItemRef${item.key}`" @click="this.$emit('select', item.key)">
      <span>{{item.text}}</span>
      <img :src="item.icon">
    </div>
  </div>
</template>

<script>

export default {
  name: 'DuContextMenu',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: null,
    },
  },
  methods: {
    outSideClickListener(e) {
      // في حال المستخدم ضغط برا القائمة
      console.log(e);
      if (!this.isDescendant(e.target, 'parentMenu')) {
        this.$emit('select', null);
      }
    },
    isDescendant(el, parentId) {
      let isChild = false;
      if (el.id === parentId) {
        isChild = true;
      }
      // eslint-disable-next-line no-cond-assign,no-param-reassign
      while (el = el.parentNode) {
        if (el.id === parentId) {
          isChild = true;
        }
      }
      return isChild;
    },
  },
  watch: {
    isOpen(old) {
      if (old) {
        setTimeout(() => {
          document.addEventListener('click', this.outSideClickListener);
        }, 100);
      } else {
        document.removeEventListener('click', this.outSideClickListener);
      }
    },
  },
};
</script>

<style scoped>
  .DuContextMenu{
    position: absolute;
    top: 0;
    left: 0;
    min-width: 180px;
    display: flex;
    flex-direction: column;
    z-index: 100;
    box-shadow: 0 0 10px #ccc;
    border-radius: 8px;
    overflow: hidden;
  }
  .DuContextMenu .item{
    display: flex;
    flex-direction: row;
    background: #fff;
    padding: 10px 15px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    align-content: center;
    justify-content: space-between;
  }
  .DuContextMenu .item img{
    width: 20px;
    height: 20px;
  }
  .DuContextMenu .item:last-child{
    border-bottom: 0;
  }
  .DuContextMenu .item:hover{
    background: #eee;
  }
</style>
