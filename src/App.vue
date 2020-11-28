<template>
  <div class="mainContainer application">
    <app-header></app-header>
    <router-view />
    <!-- <router-view name="tabel" /> -->
    <!-- <router-view name="notifications" /> -->
  </div>
</template>

<script>

import Header from './components/Header.vue';

export default {
  components: {
    appHeader: Header,
  },
  created() {
    this.$store.dispatch('initNotifications');
  },
};
</script>

<style>
  .mainContainer{
    background: #fcfcfc;
    height: 100%;
    position: absolute;
  }
</style>
