<template>
  <div class="not-found-container">
    <img src="@/assets/404.jpg" alt="" />
     <a-button type="danger">
      <router-link :to="{name:'Login'}">是否返回登录页</router-link>
    </a-button>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>

.not-found-container {
    position: fixed;
  background: #90cbc0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y:scroll ;
  /* position: relative; */
}
</style>
