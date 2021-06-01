<template>
    <div class="product-add-container">
        <div class="steps-top">
            <a-steps :current="current">
                <a-step
                    v-for="item in steps"
                    :key="item.title"
                    :title="item.title"
                />
            </a-steps>
        </div>
        <div class="steps-content">
            <keep-alive>
                <BasicDetail
                    @handleNext="next"
                    :form="form"
                    v-if="current === 0"
                />
                <SaleDetail
                    v-else-if="current === 1"
                    @handlePrev="prev"
                    @handleNext="submitProduct"
                    :form="form"
                />
            </keep-alive>
        </div>
    </div>
</template>

<script>
import BasicDetail from '@/components/Form/basicDetail.vue';
import SaleDetail from '@/components/Form/saleDetail.vue';

export default {
  components: {
    BasicDetail,
    SaleDetail,
  },
  data() {
    return {
      current: 0,
      steps: [
        {
          title: '填写商品信息',
        },
        {
          title: '填写商品销售信息',
        },
      ],
      form: {
        title: '',
        desc: '',
        category: '',
        c_item: '',
        tags: ['包邮，最快次日达'],
        price: '',
        price_off: '',
        unit: '',
        inventory: '',
        images: [],
      },
    };
  },
  created() {
    const { params } = this.$route;
    if (params.id) {
      this.$api.detail(params).then((res) => {
        this.form = res;
      });
    }
  },
  watch: {
    $route() {
      this.form = {
        title: '',
        desc: '',
        category: '',
        c_item: '',
        tags: ['包邮，最快次日达'],
        price: '',
        price_off: '',
        unit: '',
        inventory: '',
        images: [],
      };
    },
  },
  methods: {
    next() {
      this.current += 1;
    },
    prev() {
      this.current -= 1;
    },
    submitProduct() {
      if (this.$route.params.id) {
        this.$api.edit(this.form).then(() => {
          this.$message.success('修改成功');
          this.$router.push({
            name: 'ProductList',
          });
        });
      } else {
        this.$api.addProduct(this.form).then(() => {
          this.$message.success('添加成功');
          this.$router.push({
            name: 'ProductList',
          });
        });
      }
    },
  },
};
</script>

<style scoped lang="less">
.product-add-container {
    .steps-top {
        width: 70%;
        margin: 30px auto;
    }
}
.steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
}

.steps-action {
    margin-top: 24px;
}
</style>
