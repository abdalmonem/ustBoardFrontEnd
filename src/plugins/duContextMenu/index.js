import { createApp } from 'vue';
import duContextMenuComponent from './duContextMenuComponent.vue';

const duContextMenu = {};

// eslint-disable-next-line no-unused-vars
duContextMenu.install = (app, appOptions) => {
  // eslint-disable-next-line no-param-reassign
  const comp = duContextMenuComponent;
  const mountPoint = document.createElement('div');
  document.body.appendChild(mountPoint);
  createApp(comp).mount(mountPoint);
  app.provide('createContextMenu');
  // eslint-disable-next-line no-param-reassign,no-unused-vars
  app.config.globalProperties.$createContextMenu = (options) => {
    const creationEvent = new CustomEvent('createContextMenu');
    creationEvent.data = {
      event: options.event,
      onSelect: options.onSelect,
      options: options.options,
      id: Math.floor(Math.random() * 1000000) + 1,
    };
    document.dispatchEvent(creationEvent);
  };
};

export default duContextMenu;
