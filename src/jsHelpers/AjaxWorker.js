import Axios from 'axios';
// eslint-disable-next-line import/no-cycle
import mainStore from '../stores/mainStore';

export default class AjaxWorker {
  url = 'http://127.0.0.1:5000'

  async request(url, params = {}) {
    let response = 'NOINTERNETCONNECTION';
    const headers = {};
    if (mainStore.getters.isLogin) {
      headers.id = mainStore.getters.id;
      headers.auth_key = mainStore.getters.authKey;
    }
    await Axios.request({
      url: `${this.url}${url}`,
      params,
      headers,
      method: params.length > 0 ? 'POST' : 'GET',
    }).then((connectionResponse) => {
      console.log(connectionResponse);
      response = connectionResponse.data;
    }).catch((e) => {
      console.log('connection error');
      console.log(e);
    });
    return response;
  }
}
