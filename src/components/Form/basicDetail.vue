<template>
    <div class="basic-detail-container">
        <a-form-model
            ref="ruleForm"
            :model="form"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
        >
            <a-form-model-item label="标题" prop="title" required>
                <a-input v-model="form.title" />
            </a-form-model-item>
            <a-form-model-item label="描述" prop="desc">
                <a-input v-model="form.desc"></a-input>
            </a-form-model-item>
            <a-form-model-item label="商品类目" required prop="category">
                <a-select
                    v-model="form.category"
                    placeholder="请选择商品类别"
                    @change="handleChangeCategoey"
                >
                    <template v-for="item in categoryList">
                        <a-select-option :value="item.id" :key="item.id">
                            {{ item.name }}
                        </a-select-option>
                    </template>
                </a-select>
                <a-select v-model="form.c_item" placeholder="请选择子类目">
                    <a-select-option
                        v-for="(item, i) in categorySubList"
                        :value="item"
                        :key="i"
                    >
                        {{ item }}
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item label="商品标签" prop="tags">
                <a-select
                    mode="tags"
                    :size="size"
                    placeholder="请选择"
                    :default-value="['包邮，最快次日达']"
                    v-model="form.tags"
                >
                    <a-select-option
                        v-for="i in 0"
                        :key="(i + 9).toString(36) + i"
                    >
                        {{ i }}
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item
                lable=""
                class="nextBtn"
                :wrapperCol="{ span: 24 }"
            >
                <a-button type="primary" @click="next">下一步</a-button>
            </a-form-model-item>
        </a-form-model>
    </div>
</template>
<script>
export default {
  name: 'basicDetail',
  props: ['form'],
  data() {
    return {
      size: 'default',
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: '',
      //   form: {
      //     title: '',
      //     desc: '',
      //     category: '',
      //     c_item: '',
      //     tags: ['包邮，最快次日达'],
      //   },
      categoryList: [],
      categorySubList: [],
    };
  },
  methods: {
    handleChangeCategoey(categoryId) {
      this.categoryList.forEach((item) => {
        if (item.id === categoryId) {
          this.categorySubList = item.c_items;
        }
        return true;
      });
    },
    resetForm() {
      //   this.$refs.ruleForm.resetFields();
    },
    next() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('handleNext');
        } else {
          console.log('error submit!!');
          return false;
        }
        return true;
      });
    },
  },
  created() {
    this.$api.category().then((res) => {
      this.categoryList = res.data;
    });
  },
};
</script>
<style lang="less" scoped>
.basic-detail-container {
    .nextBtn {
        display: flex;
        justify-content: center;
    }
}
</style>
