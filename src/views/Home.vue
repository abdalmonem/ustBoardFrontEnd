<template>
  ewew
</template>

<script>

// import DuCheckBox from '../components/DuCheckBox.vue';
import mainStore from '../stores/mainStore';

export default {
  name: 'Entery',
  created() {
    if (!mainStore.getters.isLogin) {
      this.$router.replace({ path: '/login' });
    }
  },
  data() {
    return {
      showModal: false,
      btnPlus: {
        style: {
          background: '#e74c3c',
          color: '#fff',
          marginRight: 10,
        },
        text: 'تأكيد',
        show: false,
      },
    };
  },
  methods: {
    redirectToLoginPage() {
    },
  },
  components: {
    // duCheckBox: DuCheckBox,
  },
};

</script>

<style scoped>

  .entery {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    text-align: center;
  }
  .img-holder {
    width: 20%;
    opacity: .3;
  }
  .img-holder img {
    width: 100%;
  }
  .entery-info h2 {
    margin: 10px 0;
    font-size: 2em;
    color: #34495e !important;
  }
  .entery-info h2, .entery-info h3 {
    margin: 10px 0;
  }
  .entery-info h3 {
    color: rgba(0, 0, 0, 0.5);
  }
  .entery-info h3, .entery-link a {
    font-size: 20px;
  }
  .entery-link {
    margin: 15px 0;
  }
  .entery-link a {
    background-color: #3498db;
    color: #fff;
    border: 1px solid #34485e;
    padding: 3px 5px;
    cursor: pointer;
  }

</style>
