<template>
    <div class="search-container">
        <a-form-model
            layout="inline"
            :model="searchForm"
            @submit="handleSubmit"
            @submit.native.prevent
        >
            <a-form-model-item label="关键字">
                <a-input
                    placeholder="请输入关键字"
                >
                </a-input>
            </a-form-model-item>
            <a-form-model-item label="商品类目">
                <a-select
                    label-in-value
                    placeholder="请选择商品类目"
                    style="width: 220px"
                    allowClear
                    @change="handleSelectChange"
                >
                    <a-select-option
                        v-for="item in categoryList"
                        :key="item.id"
                        :value="item.id"
                    >
                        {{item.name}}
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item>
                <a-button type="primary" html-type="submit"> 搜索 </a-button>
            </a-form-model-item>
            <a-button class="product-add-btn">
            <router-link :to="{ name: 'ProductAdd' }">添加商品</router-link>
        </a-button>
        </a-form-model>

    </div>
</template>
<script>
export default {
  data() {
    return {
      searchForm: {
        searchWord: '',
        category: '',
      },
    };
  },
  props: ['categoryList'],
  methods: {
    handleSubmit() {
      this.$emit('handleSubmits', this.searchForm);
    },
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    handleSelectChange(value) {
    //   console.log(value); // { key: "lucy", label: "Lucy (101)" }
      this.searchForm.category = value.key;
      this.searchForm.searchWord = value.label.trim();
    },

  },
};
</script>
<style lang="less" scoped>
.product-add-btn{
    margin-top: 3px;
    margin-left: 50px;
}
</style>
