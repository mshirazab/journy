import { action, observable } from 'mobx';
import axios from 'axios';

class ProfileStore {
  @observable username = '';
  @observable journals = [];

  @action
  login = async (userName, password) => {
    const response = await axios.post('/auth/login', { userName, password });
    if (response.data.success) this.getUser();
    return response.data;
  };
  @action
  signup = async (userName, password) => {
    const response = await axios.post('/auth/signup', { userName, password });
    return response.data;
  };
  @action
  getUser = async () => {
    try {
      const response = await axios.get('/auth/user');
      if (response.data.success) this.username = response.data.message.username;
    } catch (e) {
      this.username = '';
    }
    return this.username;
  };

  @action
  logout = async () => {
    const response = await axios.get('/auth/logout');
    if (response.data.success) this.username = '';
    return response.data;
  };
}

export default new ProfileStore();
