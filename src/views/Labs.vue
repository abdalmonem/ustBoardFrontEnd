<template>
  <div class="labs-tabel">
    <app-lab-tabel-group></app-lab-tabel-group>
    <router-view />
  </div>
</template>

<script>

import LabTabelGroup from './LabTabelGroup.vue';

export default {
  components: {
    appLabTabelGroup: LabTabelGroup,
  },
};

</script>
