import Home from '@/views/Home/index.vue';
import Login from '@/views/Login/index.vue';
// import Statistics from '@/views/page/Statistics.vue';

export const asyncRouterMap = [];

export const routes = [
  {
    name: 'Home',
    path: '/',
    redirect: '/statistics',
    component: Home,
    meta: {
      title: '首页',
      hidden: false,

    },
    children: [{
      path: '/statistics',
      name: 'Statistics',
      component: () => import('@/views/page/Statistics.vue'),
      meta: {
        title: '统计',
        hidden: false,

      },
    }],
  },
  {
    name: 'Login',
    path: '/login',
    component: Login,
    meta: {
      title: '登录',
      hidden: true,

    },
  },
  {
    name: 'Logon',
    path: '/logon',
    component: Login,
    meta: {
      title: '注册',
      hidden: true,
    },
  },
  {
    path: '/product',
    name: 'Product',
    redirect: '/product/list',
    meta: {
      title: '商品',
      hidden: false,
    },
    component: Home,
    children: [{
      path: 'list',
      name: 'ProductList',
      meta: {
        title: '商品列表',
        hidden: false,
      },
      component: () => import('@/views/page/ProductList.vue'),
    },
    {
      path: 'add',
      name: 'ProductAdd',
      meta: {
        title: '添加商品',
        hidden: false,

      },
      component: () => import('@/views/page/ProductAdd.vue'),
    }, {
      path: 'edit/:id',
      name: 'ProductEdit',
      meta: {
        title: '编辑商品',
        hidden: true,

      },
      component: () => import('@/views/page/ProductAdd.vue'),
    }, {
      path: 'category',
      name: 'Category',
      meta: {
        title: '类目管理',
        hidden: true,
      },
      component: () => import('@/views/page/Category.vue'),
    }],
  },
  {
    path: '*',
    name: 'NotFound',
    meta: {
      title: 404,
      hidden: true,
    },
    component: () => import('@/views/NotFound.vue'),
  },
];
