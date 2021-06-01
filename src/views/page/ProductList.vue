<template>
    <div class="product-list-container">
        <Search
            @handleSubmits="handleSubmitData($event)"
            :categoryList="categoryList"
        ></Search>

        <ProductTable
            :data="tableData"
            :pagination="pagination"
            :categoryList="categoryList"
            @changePage="changePage($event)"
            @edit="editProduct"
            @remove="removeProdoct"
        ></ProductTable>
    </div>
</template>

<script>
import Search from '@/components/Search/index.vue';
import ProductTable from '@/components/ProductTable/index.vue';

export default {
  data() {
    return {
      tableData: [],
      categoryList: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 1,
      },
    };
  },
  components: {
    Search,
    ProductTable,
  },
  methods: {
    handleSubmitData(val) {
      const method = {
        page: this.pagination.current,
        size: this.pagination.pageSize,
      };
      if (val) {
        Object.assign(method, val);
      }
      //   console.log(method);
      this.$api.products(method).then((res) => {
        this.tableData = res.data;

        this.pagination.total = res.total;
      });
      console.log('接口失效');
    },
    changePage(page) {
      this.page = page;
      this.handleSubmitData();
    },
    async productApi() {
      const res = await this.$api.category();
      this.categoryList = res.data;
    },
    editProduct(record) {
      this.$router.push({
        name: 'ProductEdit',
        params: {
          id: record.id,
        },
      });
    },
    removeProdoct(record) {
      this.$confirm({
        title: '是否删除商品',
        content: () => (
                    <div style="color:red;">{`确认删除产品标题：${record.title}商品吗？`}</div>
        ),
        onOk: () => {
          this.$api.removeProduct(record).then(() => {
            this.handleSubmitData();
          });
        },
        onCancel() {
          console.log('Cancel');
        },
        class: 'comfirm-box',
      });
    },
  },
  created() {
    this.handleSubmitData();
    this.productApi();
  },
};
</script>

<style lang="less" scoped>
.product-list-container {
    padding: 10px 30px;
    position: relative;
}
// .product-add-btn {
//     position: absolute;
//     right: 200px;
//     top: 10px;
// }
</style>
