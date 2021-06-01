import axios from 'axios';
import URLs from './URLs';
import store from '../store';
// const appKey = " sun_1620982268360"
const ajax = axios.create({
  baseURL: URLs.baseURL,
});

ajax.interceptors.request.use((resolve) => {
//   console.log('YYCG', resolve.url);
  if (resolve.url.includes('/passport')) {
    return resolve;
  }
  return {
    ...resolve,
    params: {
      ...resolve.params,
      appkey: store.state.user.appkey,
    },
  };
}, (err) => Promise.reject(err));

ajax.interceptors.response.use(({ data }) => {
  if (data.status === 'fail') {
    console.log('失败');
    return Promise.reject(data.msg);
  }
  return data.data;
}, (err) => Promise.reject(err));

const login = (data) => ajax.post(URLs.login, data);

const logon = (data) => ajax.post(URLs.logon, data);

const category = (data) => ajax.get(URLs.category, data);

const products = (data) => ajax.get(URLs.products, data);

const removeProduct = (data) => ajax.delete(`/products/${data.id}`);

const addProduct = (data) => ajax.post(URLs.addProduct, data);

const detail = (data) => ajax.get(`/products/${data.id}`);

const edit = (data) => ajax.put(URLs.edit, data);

export default {
  login,
  logon,
  category,
  products,
  removeProduct,
  addProduct,
  detail,
  edit,
};
