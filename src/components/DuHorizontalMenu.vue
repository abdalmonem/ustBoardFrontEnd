<template>
  <div class="Menu">
    <div class="innerContainer">
      <div class="cell" v-for="item in items" :key="item.id">
        <div class="cellAndPadding">
          <a :href="item.href === undefined ? '' : item.href"
            @click="clickEventHandler($event, item)"
             :class="state.selected == item.id?'selectedMarker':''">
            {{ item.title }}
             <div style="width: 10px;height: 10px;" v-if="item.icon !== undefined"></div>
            <img :src="item.icon" v-if="item.icon !== undefined"/>
          </a>
           <div style="width: 10px; height: 10px;"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, watch } from 'vue';

export default {
  name: 'DuHorizontalMenu',
  props: {
    items: {
      type: Array,
      default: null,
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      selected: null,
    });
    const clickEventHandler = (e, item) => {
      state.selected = item.id;
      if (item.href === undefined || item.href === null) {
        e.preventDefault();
      }
      emit('select', item);
      if (item.onSelect !== undefined) {
        item.onSelect();
      }
      return false;
    };
    const initSelection = () => {
      props.items.forEach((item) => {
        if (item.isSelected !== undefined && item.isSelected === true) {
          state.selected = item.id;
        }
      });
    };
    watch(() => props.items, () => {
      initSelection();
    });
    initSelection();
    return {
      clickEventHandler,
      state,
    };
  },
};
</script>

<style scoped>
  .Menu{
    width: 100%;
    display: block;
    white-space: nowrap;
    overflow-x:scroll;
    overflow-y:hidden;
    border-bottom: 1px solid #eee;
  }
  .Menu .innerContainer{
    min-width:800px;
    margin: 5px 0;

  }
  .cellAndPadding{
    display: flex;
    flex-direction: row;
  }
  .cell{
    display: inline-block;
  }
  .Menu a{
    width: auto;
    text-decoration: none; text-align: center;
    color: #222;
    font-size: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px 20px;
  }
  .Menu a img{
    width: 15px;
    height: 15px;
  }
  .selectedMarker{
    font-weight: bold;
    color: #fff !important;
    background: #8F28F0;
    border-radius: 100px;
  }
</style>
