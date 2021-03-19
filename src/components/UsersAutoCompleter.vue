<template>
  <div class="autoCompleter">
    <img src="../assets/icons/loading.gif" class="loadingIcon" v-if="state.isLoading"/>
    <div class="cellsBody">
      <div class="cell" v-for="item in state.items" :key="item.id" @click="addItem(item)">
        <div class="thumb"></div>
        <div style="width: 10px;height: 10px;"></div>
        <div class="name">{{ item.username }}</div>
        <div class="selectSpot">
          <div class="selected" v-if="state.selectedItems.includes(item.id)"></div>
        </div>
      </div>
      <div class="noResults" v-if="state.isNoResults">{{ noResultsText }}</div>
    </div>
  </div>
</template>

<script>
import { reactive, watch } from 'vue';
import AjaxWorker from '@/jsHelpers/AjaxWorker';

export default {
  name: 'UsersAutoCompleter',
  props: {
    keyword: {
      type: String,
      default: '',
    },
    minLength: {
      type: Number,
      default: 0,
    },
    maxLength: {
      type: Number,
      default: 10000,
    },
    noResultsText: {
      type: String,
      default: 'لا يوجد نتائج',
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      items: [],
      isLoading: false,
      selectedItems: [],
      selectedItemsFullData: [],
      isNoResults: false,
    });
    const fetchData = () => {
      state.isLoading = true;
      new AjaxWorker().request('/api/get_users', {
        type: 'supervisor',
        keyword: props.keyword,
      })
        .then((res) => {
          state.isLoading = false;
          if (res === 'NOINTERNETCONNECTION' || !res.state) {
            this.$createFixedNotification(
              'حدث خطاء أثناء الإتصال',
              'حاول في وقت لاحق',
              // eslint-disable-next-line global-require
              require('../assets/icons/w/exclamationF.png'),
              null,
              '#FF065A',
              3,
            );
          } else {
            state.items = res.data.items;
            if (state.items.length < 1) {
              state.isNoResults = true;
            } else {
              state.isNoResults = false;
            }
          }
        });
    };
    watch(() => props.keyword, () => {
      fetchData();
    });
    watch(() => state.selectedItems, () => {
      state.selectedItemsFullData = [];
      state.selectedItems.forEach((x) => {
        state.selectedItemsFullData.push(state.items.filter((i) => i.id === x));
      });
    });
    const addItem = (item) => {
      if (props.maxLength > 1) {
        if (!state.selectedItems.includes(item.id)) {
          if (state.selectedItems.length < props.maxLength) {
            state.selectedItems.push(item.id);
          }
        } else {
          state.selectedItems = state.selectedItems.filter((x) => x !== item.id);
        }
      } else {
        state.selectedItems = [item.id];
      }
      emit('change', {
        selectedItems: state.selectedItems,
        selectedItemsFullData: state.selectedItemsFullData,
      });
    };
    return {
      state,
      addItem,
    };
  },
};
</script>

<style scoped>
  .autoCompleter{
    width: 100%;
    display: flex;
    flex-direction: column;
  }
   .loadingIcon{
    width: 20px;
    height: 20px;
    align-self: center;
    justify-self: center;
  }
   .cellsBody{
     display: flex;
     flex-direction: column;
   }
   .cell{
     padding: 10px 0px;
     margin: 0px 0;
     border-bottom: 1px solid #eee;
     color: #333;
     display: flex;
     flex-direction: row;
     align-items: center;
   }
   .cell:hover{ opacity: 0.9; cursor: pointer; }
   .thumb{
     width: 30px;
     height: 30px;
     border-radius: 100px;
     background-color: #ccc;
   }
   .name{
     flex: 1;
     font-size: 14px;
   }

   .selectSpot{
     width: 20px;
     height: 20px;
     border: 2px;
     border-radius: 100px;
     background: #eee;
   }
   .selectSpot .selected{
     width: 100%;
     height: 100%;
     background-color: #8F28F0;
     border-radius: 100px;
     background-image: url('../assets/icons/w/checkF.png');
     background-position: center;
     background-repeat: no-repeat;
     background-size: 13px;
   }

   .noResults{
     align-self: center;
     font-size: 15px;
     color: #999;
     padding: 10px;
   }
</style>
