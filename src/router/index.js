import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
// import getMenuRouter from '@/utils/permission';
import filterRoutes from '@/utils/filterRoutes';
import { routes } from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history',
});

let isAddRoutes = false;
// let newRoutes = null;
router.beforeEach((to, form, next) => {
  if (to.path !== '/login') {
    if (to.path !== '/logon') {
      const { user } = store.state;
      if (user.appkey && user.username) {
        if (user.role === 'admin' && !isAddRoutes) {
          isAddRoutes = true;
          filterRoutes(routes, 'Category');
        }
        //   store.dispatch('A_setMenuRoutes', (newRoutes || routes));
        store.dispatch('A_setMenuRoutes', filterRoutes(routes, ''));

        return next();
      }
      return next('/login');
    }
    next();
  }
  return next();
});
export default router;
