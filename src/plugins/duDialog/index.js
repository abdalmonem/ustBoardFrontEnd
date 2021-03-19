import { createApp } from 'vue';
import duDialogComponent from './duDialogComponent.vue';

const duDialog = {};

// eslint-disable-next-line no-unused-vars
duDialog.install = (app, appOptions) => {
  // eslint-disable-next-line no-param-reassign
  const comp = duDialogComponent;
  const mountPoint = document.createElement('div');
  document.body.appendChild(mountPoint);
  createApp(comp).mount(mountPoint);
  // eslint-disable-next-line no-param-reassign,no-unused-vars
  app.config.globalProperties.$createDialog = (options) => {
    const creationEvent = new CustomEvent('createDialog');
    creationEvent.data = {
      title: options.title,
      description: options.description,
      color: options.color,
      closeButtonText: options.closeButtonText,
      icon: options.icon,
      onClose: options.onClose,
      id: Math.floor(Math.random() * 1000000) + 1,
    };
    document.dispatchEvent(creationEvent);
  };
};

export default duDialog;
