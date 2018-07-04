<template>
  <div class="container">
    <el-row type="flex" justify="center">
      <h1 class="title">My Planet</h1>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col class="container" :span="3"><h2>Login</h2></el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col class="container" :span="3">
        <el-form ref="login" :model="userinfo" :rules="rules" label-width="80px">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="userinfo.username" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="userinfo.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login">登录</el-button>
                <el-button @click="register">注册</el-button>
            </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { genValidator } from '../util/validator';

export default {
  name: 'login',
  data () {
    let checkUsername = genValidator('username', '用户名');
    let checkPassword = genValidator('password', '密码');
    return {
      userinfo: {'username': '', 'password': ''},
      rules: {
        username: [
          { validator: checkUsername, trigger: 'blur' },
        ],
        password: [
          { validator: checkPassword, trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    login: async function () {
      let valid = await this.$refs['login'].validate().catch(() => {});
      // console.log(valid);
      if (valid) {
        const response = await this.$axios.post('/api/login', this.userinfo);
        if (response.data.status !== true) {
          this.$notify.error({
            title: '错误',
            message: response.data.err || '登陆失败'
          });
        } else {
          // to-FIX: 应该为永久重定向
          this.$router.push('/home');
        }
      }
    },
    register: function () {
      this.$router.push('/register');
    }
  }
}
</script>

<style>
.container {
  min-width: 300px !important;
}

.title {
  font-size: 30pt;
}
</style>
