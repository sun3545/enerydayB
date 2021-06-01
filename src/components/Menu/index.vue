<template>
    <div class="menu-list">
        <a-menu
            :default-selected-keys="[twoTitle]"
            :default-open-keys="[oneTitle]"
            mode="inline"
            theme="dark"
            :inline-collapsed="$store.state.collapsed"
        >
            <a-sub-menu v-for="item in menuRoutes" :key="item.name">
                <span slot="title">
                    <a-icon type="mail" />
                    <span>{{ item.meta.title }}</span>
                </span>
                <a-menu-item v-for="child in item.children" :key="child.name">
                    <router-link :to="{ name: child.name }">{{
                        child.meta.title
                    }}</router-link>
                </a-menu-item>
            </a-sub-menu>
        </a-menu>
    </div>
</template>

<script>
export default {
  data() {
    return {
      menuRoutes: [],
      oneTitle: '',
      twoTitle: '',
    };
  },
  created() {
    this.menuRoutes = this.$store.state.menuRoutes.filter(
      (item) => item.children,
    );
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        this.oneTitle = this.$router.currentRoute.matched[0].name;
        this.twoTitle = this.$router.currentRoute.matched[1].name;
      },
    },
  },
};
</script>

<style lang="less" scoped>
.menu-list {
    position: fixed;
    width: 180px;
    height: 100%;
    .ant-menu {
        height: 100%;
    }
}
</style>
