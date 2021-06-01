<template>
    <div class="sale-detail-container">
        <a-form-model
            ref="subRuleForm"
            :model="form"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
        >
            <a-form-model-item label="商品售价" prop="price" required>
                <a-input v-model="form.price" placeholder="0.0" />
            </a-form-model-item>
            <a-form-model-item label="折扣价格" prop="price_off">
                <a-input v-model="form.price_off" placeholder="0.0"></a-input>
            </a-form-model-item>
            <a-form-model-item label="商品库存" required prop="inventory">
                <a-input v-model="form.inventory" placeholder="0"></a-input>
            </a-form-model-item>
            <a-form-model-item label="计量单位" prop="unit" required>
                <a-input v-model="form.unit" placeholder="kg"></a-input>
            </a-form-model-item>
            <a-form-model-item lable="商品相册" prop="images" class="upload">
                <UpLoadImgs @handlePrev="prev" @handleNext="next" :fileList="fileList"></UpLoadImgs>
            </a-form-model-item>
        </a-form-model>
    </div>
</template>
<script>
import UpLoadImgs from './UpLoadImgs/index.vue';

export default {
  name: 'saleDetail',
  props: ['form'],
  components: {
    UpLoadImgs,
  },
  data() {
    return {
      size: 'default',
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: '',
      categoryList: [],
      categorySubList: [],
      fileList: [],
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
    prev(data) {
      this.form.images = data;
      this.$emit('handlePrev');
    },
    next(url) {
      this.$refs.subRuleForm.validate((valid) => {
        if (valid) {
          this.form.images = url;
          this.$emit('handleNext');
        } else {
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
    if (this.form.images.length > 0) {
      this.fileList = this.form.images.map((item, index) => ({
        uid: index,
        name: `imgage${index}.png`,
        status: 'done',
        url: item,
      }));
    }
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
.upload {
    display: flex;
    justify-content: center;
}
</style>
