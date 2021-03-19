import { createApp } from 'vue';
import duConfirmDialogComponent from './duConfirmDialogComponent.vue';

const duConfirmDialog = {};

// eslint-disable-next-line no-unused-vars
duConfirmDialog.install = (app, appOptions) => {
  // eslint-disable-next-line no-param-reassign
  const comp = duConfirmDialogComponent;
  const mountPoint = document.createElement('div');
  document.body.appendChild(mountPoint);
  createApp(comp).mount(mountPoint);
  // eslint-disable-next-line no-param-reassign,no-unused-vars
  app.config.globalProperties.$createConfirmDialog = (options) => {
    const creationEvent = new CustomEvent('createConfirmDialog');
    creationEvent.data = {
      title: options.title,
      description: options.description,
      onConfirm: options.onConfirm,
      onCancel: options.onCancel,
      confirmColor: options.confirmColor,
      descriptionColor: options.descriptionColor,
      confirmText: options.confirmText,
      cancelText: options.cancelText,
      id: Math.floor(Math.random() * 1000000) + 1,
    };
    document.dispatchEvent(creationEvent);
  };
};

export default duConfirmDialog;
