<template>
    <div class="Statistics-container">
        <Card :titles="title"></Card>
        <Charts></Charts>
    </div>
</template>

<script>
import Card from '@/components/Card/index.vue';
import Charts from '@/components/Charts/index.vue';

export default {
  components: {
    Card,
    Charts,
  },
  data() {
    return {
      title: ['商品总览', '用户总览', '销售总览'],
    };
  },
};
</script>

<style>
</style>
