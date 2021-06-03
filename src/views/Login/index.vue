<template>
    <div class="login-container">
        <!-- <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button :type="getName"> 登录 </a-button>
            <a-button style="margin-left: 10px" :type="getSubName"> 注册 </a-button>
        </a-form-model-item> -->
        <a-form-model ref="login" :model="login" :rules="rules" v-bind="layout">
            <a-form-model-item has-feedback label="邮箱" prop="email">
                <a-input v-model="login.email" type="text" autocomplete="off" />
            </a-form-model-item>
            <a-form-model-item has-feedback label="密码" prop="password">
                <a-input
                    v-model="login.password"
                    type="password"
                    autocomplete="off"
                />
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button type="" @click="submitForm('login')"> 提交 </a-button>
                <a-button style="margin-left: 10px" @click="resetForm('login')">
                    重置
                </a-button>
            </a-form-model-item>
        </a-form-model>
    </div>
</template>
<script>
export default {
  data() {
    const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入邮箱'));
      }
      if (emailReg.test(value)) {
        return callback();
      }
      return callback(new Error('邮箱格式不正确'));
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      login: {
        email: '',
        password: '',
      },
      rules: {
        password: [{ validator: validatePass, trigger: 'change' }],
        email: [{ validator: checkEmail, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.login(this.login).then(
            (res) => {
              this.$store.dispatch('A_setUserInfo', res);
              this.$router.push({ name: 'Home' }).catch(() => {
                console.log('连续跳转了');
                this.$router.push({ name: 'Home' });
              });
            },
            (err) => this.$message.error(err),
          );
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  computed: {
    getName() {
      return this.$route.name === 'Login' ? 'primary' : '';
    },
    getSubName() {
      return this.$route.name === 'Logon' ? 'primary' : '';
    },
  },
};
</script>
<style lang="less" scoped>
.login-container {
    max-width: 500px;
    margin: 100px auto 0;
    border: 1px solid #eee;
    padding: 50px 20px 0 50px;
    box-sizing: border-box;
    text-align: center;
}
</style>
