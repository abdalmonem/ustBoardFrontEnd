import { createApp } from 'vue';
import FixedNotifications from './FixedNotifications.vue';

const fixedNotifications = {};

// eslint-disable-next-line no-unused-vars
fixedNotifications.install = (app, options) => {
  // eslint-disable-next-line no-param-reassign
  const comp = FixedNotifications;
  const mountPoint = document.createElement('div');
  document.body.appendChild(mountPoint);
  createApp(comp).mount(mountPoint);
  // eslint-disable-next-line no-param-reassign,no-unused-vars
  app.config.globalProperties.$createFixedNotification = function (title,
    description, icon, onClick, color, hideAfter) {
    const creationEvent = new CustomEvent('fixedNotificationEventCreate');
    creationEvent.data = {
      title,
      description,
      icon,
      onClick,
      color,
      hideAfter,
      id: Math.floor(Math.random() * 1000000) + 1,
    };
    document.dispatchEvent(creationEvent);
  };
};

export default fixedNotifications;
