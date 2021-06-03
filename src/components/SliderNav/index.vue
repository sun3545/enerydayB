<template>
    <div class="main-header">
        <div class="main_left">
            <a-button type="primary" @click="toggleCollapsed">
                <a-icon
                    :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'"
                />
            </a-button>
            <div class="breadcrumb">
                <a-breadcrumb v-if="currentRoute.length">
                    <a-breadcrumb-item>{{
                        currentRoute[0].meta.title
                    }}</a-breadcrumb-item>
                    <a-breadcrumb-item
                        ><router-link
                            :to="{
                                name: currentRoute[0].name,
                            }"
                            >{{ currentRoute[1].meta.title }}
                        </router-link></a-breadcrumb-item
                    >
                </a-breadcrumb>
            </div>
        </div>
        <div class="main_right">
            <ul class="user-info">
                <li>
                    {{ $store.state.user.username }}
                    <a-icon type="down" />
                </li>
                <li @click="handleLogout">退出</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
      currentRoute: this.$router.currentRoute.matched,
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        this.currentRoute = this.$router.currentRoute.matched;
      },
    },
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('changeCollapsed');
    },
    handleLogout() {
      this.$store.dispatch('A_logout');
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>
<style lang="less" scoped>
.main_left {
    display: flex;
    align-items: center;
    .breadcrumb {
        padding-left: 10px;
    }
}
.main-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #eee;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
}
.main_right {
    cursor: pointer;
    text-align: center;
    .user-info {
        width: 100px;
        height: 100%;
        position: relative;
        li:not(:first-child) {
            display: none;
        }
        li {
            width: 100px;
            padding: 0 20px;
            transition: all 0.3s;
            &:hover {
                background: rgba(0, 0, 0, .3);
                color: #fff;
                font-weight: 700;
            }
        }
        li:last-child {
            position: absolute;
            z-index: 999;
            top: 50px;
        }
        &:hover li:last-child {
            // background:rgba(0, 0, 0, .3) ;
            display: block !important;
            color: red;
        }
    }
}
</style>
