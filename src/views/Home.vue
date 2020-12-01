<template>
  <div class="entery">
    <div class="img-holder">
      <img src="../assets/logo.jpg" alt="USR Logo">
    </div>
    <div class="entery-info">
      <h2>جامعة العلوم والتقانة</h2>
      <h3>المركز الإعلامي</h3>
    </div>
    <div class="entery-link">
      <!-- <a @click.prevent="redirectToLoginPage">الدخول</a> -->
      <du-button text="الدخول" @click="redirectToLoginPage"></du-button>
    </div>
    <du-modal
      title="حذف مستخدم"
      content="هل تريد الحذف؟؟ بلا بلا بلا بلا..."
      :showModal="showModal"
      :btnPlus="btnPlus">
    </du-modal>
    <!-- <du-check-box text="إحتيار من قائمة"></du-check-box> -->
  </div>
</template>

<script>

import DuButton from '../components/DuButton.vue';
import DuModal from '../components/alerts/Modal.vue';
// import DuCheckBox from '../components/DuCheckBox.vue';

export default {
  name: 'Entery',
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
      // this.$router.push('/login');
      if (this.showModal === false) {
        this.showModal = true;
      } else {
        this.showModal = false;
      }
    },
  },
  components: {
    duButton: DuButton,
    duModal: DuModal,
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
