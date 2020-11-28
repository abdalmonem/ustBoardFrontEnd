<template>
  <div class="labs-tabel">
    <app-lect-tabel-group></app-lect-tabel-group>
    <router-view />
  </div>
</template>

<script>

import LectTabelGroup from './LectTabelGroup.vue';

export default {
  components: {
    appLectTabelGroup: LectTabelGroup,
  },
};

</script>
