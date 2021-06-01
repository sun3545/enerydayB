<template>
  <div id="app">
    <!-- <Layout></Layout> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import Layout from '@/components/Layout/index.vue';
// const addRouter = {
//   path: '/product/category',
//   name: 'ategory',
//   meta: {
//     title: '类目管理',
//   },
//   component: () => import('@/views/page/Category.vue'),
// };
export default {

  components: {
    // Layout,
  },
  mounted() {
    // this.$router.addRoute('product', addRouter);
    // console.log(this.$router);
  },
};
</script>

<style scoped>
#app{
    height: 100%;
}
</style>
