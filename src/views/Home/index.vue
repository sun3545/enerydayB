<template>
    <div class="home-container">
        <LeftMenu :key="key" />
        <div
            :class="{ 'main-app': true, 'menu-unfold': $store.state.collapsed }"
        >
            <SliderNav />
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import LeftMenu from '@/components/Menu/index.vue';
import SliderNav from '@/components/SliderNav/index.vue';

export default {
  components: {
    LeftMenu,
    SliderNav,
  },
  data() {
    return {
      key: new Date().getTime(),
    };
  },
  watch: {
    $route() {
      this.key = new Date().getTime();
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
    display: flex;
    .main-app {
        width: 100%;
        margin-left: 180px;
        transition: all 0.3s;
        &.menu-unfold {
            margin-left: 80px;
        }
    }
}
</style>
