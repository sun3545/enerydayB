<template>
  <div style="background-color: #ececec; padding: 20px;">
    <a-row :gutter="16">
      <a-col :span="8" v-for="item in titles" :key="item">
        <a-card :title="item" :bordered="false">
          <p>card content</p>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  props: ['titles'],
};
</script>
