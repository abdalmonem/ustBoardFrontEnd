<template>
  <div class="mainContainer">
    <duButton text="إضافة جديد" style="justify-self: end;align-self: end"
              v-if="allowToAddButtonToShow()" @click="isAddNewUserPopOpShow = true;"/>
    <div class="theBody">
      <dashboardUserCel v-for="item in items" :key="item.id"  :data="item"/>
    </div>
  </div>
  <GenericPopUp title="إضافة مستخدم" :isShowing="isAddNewUserPopOpShow"
                @close="isAddNewUserPopOpShow = false;">
    <div class="formArea">
      <DuInput
        label="الاسم"
        labelColor="labelColor"
        value=""
        type="text"
        :isRequired='true'
        isRequiredErrorMessage="رجاء قم بكتابة الاسم"
        :min-length="5"
        min-length-error-message="يبدو أن الاسم قصير بعض الشيء , قم بكتابة الاسم الكامل"
        :max-length="20"
        max-length-error-message="يبدو أن الاسم طويل بعض الشيء , تأكد من إدخال
         الاسم حتى الجد الرابع فقط"
        ref="nameInput"
      />
      <div style="height: 30px;width: 20px;"></div>
      <DuInput
        label="رقم الهاتف"
        labelColor="labelColor"
        value=""
        type="phone"
        typeErrorMessage="رقم الهاتف غير صالح"
        :isRequired='true'
        isRequiredErrorMessage="قم بكتابة رقم الهاتف"
        :min-length="10"
        min-length-error-message="تتكون أرقام الهواتف من 10 خانات , مثال : 09xxxxxxxx"
        :max-length="10"
        max-length-error-message="تتكون أرقام الهواتف من 10 خانات , مثال : 09xxxxxxxx"
        ref="phoneInput"
      />
      <div style="height: 30px;width: 20px;"></div>
      <DuInput
        label="البريد الإلكتروني"
        labelColor="labelColor"
        value=""
        type="email"
        typeErrorMessage="البريد الإلكتروني غير صالح"
        :isRequired='true'
        isRequiredErrorMessage="قم بإدخال البريد الإلكتروني"
        ref="emailInput"
      />
      <div style="height: 30px;width: 20px;"></div>
      <du-button text="إضافة" style="align-self: end"
                 @click="submitUser()"
                 :icon="require('../assets/icons/w/plusF.png')"/>
      </div>

  </GenericPopUp>
</template>

<script>

import mainStore from '@/stores/mainStore';
import AjaxWorker from '@/jsHelpers/AjaxWorker';
import DuButton from '../components/DuButton.vue';
import GenericPopUp from '../components/GenericPopUp.vue';
import DashboardUserCel from '../components/fragments/DashboardUserCel.vue';
import DuInput from '../components/DuInput.vue';

export default {
  components: {
    DuInput,
    duButton: DuButton,
    dashboardUserCel: DashboardUserCel,
    GenericPopUp,
  },
  data() {
    return {
      isAddNewUserPopOpShow: false,
      items: [],
      type: '',
    };
  },
  methods: {
    submitUser() {
      this.$refs.emailInput.validateNow();
      this.$refs.nameInput.validateNow();
      this.$refs.phoneInput.validateNow();
      const isEmailValid = this.$refs.emailInput.state.isValid;
      const isNameValid = this.$refs.nameInput.state.isValid;
      const isPhoneValid = this.$refs.phoneInput.state.isValid;
      if (isEmailValid && isNameValid && isPhoneValid) {
        new AjaxWorker().request('/api/add_user', {
          email: this.$refs.emailInput.state.innerValue,
          phone: this.$refs.phoneInput.state.innerValue,
          username: this.$refs.nameInput.state.innerValue,
          name: this.$refs.nameInput.state.innerValue,
          type: this.type,
        }).then((res) => {
          alert(JSON.stringify(res));
          if (res === 'NOINTERNETCONNECTION') {
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
            const transactionState = res.state;
            if (transactionState) {
              this.$createFixedNotification(
                'تمت إنشاء عضوية جديدة',
                'تم إرسال بريد بكلمة السر',
                // eslint-disable-next-line global-require
                require('../assets/icons/w/checkF.png'),
                null,
                '#00AA60',
                3,
              );
              this.getData();
              this.isAddNewUserPopOpShow = false;
            } else {
              let errorReason = 'خطاء غير معروف';
              if (res.reason === 'xxx') {
                errorReason = 'أعمل هاندل';
              }
              this.$createFixedNotification(
                errorReason,
                'حاول مجددًا',
                // eslint-disable-next-line global-require
                require('../assets/icons/w/exclamationF.png'),
                null,
                '#FF065A',
                3,
              );
            }
          }
        });
      }
    },
    allowToAddButtonToShow() {
      if (mainStore.getters.myData.rank === 'admin') {
        if (this.$route.query.type === 'supervisors') {
          return true;
        }
        if (this.$route.query.type === 'teachers') {
          return true;
        }
      } else if (mainStore.getters.myData.rank === 'supervisor') {
        if (this.$route.query.type === 'students') {
          return true;
        }
      }
      return false;
    },
    getData() {
      new AjaxWorker().request('/api/get_users', {
        type: this.type,
      }).then((res) => {
        alert(JSON.stringify(res));
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
          this.items = this.items.concat(res.data.items);
        }
      });
    },
  },
  created() {
    if (this.$route.query.type === 'supervisors') {
      this.type = 'supervisor';
    } else if (this.$route.query.type === 'students') {
      this.type = 'student';
    } else if (this.$route.query.type === 'teachers') {
      this.type = 'teacher';
    }
    this.getData();
    /*
    setTimeout(() => {
      this.$createConfirmDialog({
        title: 'hello',
        description: 'holla',
        onConfirm: () => {
        },
        confirmText: 'yah',
        cancelText: 'nooo',
        confirmColor: '#ccc',
        descriptionColor: '#000',
      });
    }, 500);
     */
  },
};
</script>

<style scoped>
.mainContainer{
  min-height: 500px;
  width: 70%;
  margin: 0px 15%;
  display: flex;
  flex-direction: column;
}

.theBody{
  display: flex;
  flex-direction: column;
  margin-top: 50px;
}

.formArea{
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
