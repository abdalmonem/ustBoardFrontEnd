import axios from 'axios';

const login = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  timeout: 60 * 1000, // Timeout
});

// login.defaults.headers.common.Authorization = `Bearer ${_TOKEN}`;
login.defaults.headers.get.Accepts = 'application/json';
login.defaults.headers.post.Accepts = 'application/json';
login.defaults.headers['Content-Type'] = 'application/json';

export default login;
