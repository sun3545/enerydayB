<template>
    <div class="upload-imgs-container clearfix">
        <a-upload
            name="avatar"
            :action="uploadUrl"
            list-type="picture-card"
            :file-list="fileList"
            @preview="handlePreview"
            @change="handleChange"
        >
            <div v-if="fileList.length < 8">
                <a-icon type="plus" />
                <div class="ant-upload-text">Upload</div>
            </div>
        </a-upload>
        <a-modal
            :visible="previewVisible"
            :footer="null"
            @cancel="handleCancel"
        >
            <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
        <a-form-model-item lable="" class="btns">
            <a-button type="" @click="$emit('handlePrev')">上一步</a-button>
            <a-button type="primary" @click="$emit('handleNext', successUrl)"
                >提交</a-button
            >
        </a-form-model-item>
    </div>
</template>
<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default {
  props: ['fileList'],
  data() {
    return {
      uploadUrl: `https://mallapi.duyiedu.com/upload/images?appkey=${this.$store.state.user.appkey}`,
      previewVisible: false,
      previewImage: '',
      //   fileList: [],
      successUrl: [],
    };
  },
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      const obj = file;
      if (!obj.url && !obj.preview) {
        obj.preview = await getBase64(obj.originFileObj);
      }
      this.previewImage = obj.url || obj.preview;
      this.previewVisible = true;
    },
    handleChange({ file, fileList }) {
      this.fileList = fileList;
      if (file.status === 'done') {
        this.successUrl.push(file.response.data.url);
      } else if (file.status === 'removed') {
        const { url } = file.response.data;
        this.successUrl = this.successUrl.filter((item) => item !== url);
      }
    },
  },
};
</script>
<style lang="less" scoped>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
}
.btns {
    button {
        margin: 0 10px;
    }
}
</style>
