<template>
  <div class="container">
    <el-row type="flex" justify="center">
      <el-col :span="2"><h1>登录</h1></el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="4">
        <el-form ref="form" :model="userinfo" :rules="rules" label-width="80px">
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
import { match } from '../util/validator';

export default {
  name: 'login',
  data () {
    let checkUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else if (!match(value, 'username')) {
        callback(new Error('用户名不合法'));
      } else {
        callback();
      }
    }
    let checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!match(value, 'password')) {
        callback(new Error('密码不合法'));
      } else {
        callback();
      }
    }
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
    login: function () {
      const self = this;
      // console.log(this.$refs['form'].validate());
      this.$refs['form'].validate().then(valid => {
        console.log(valid);
        if (valid) {
          return self.$axios.post('/api/login', self.userinfo);
        }
      }).then(function (response) {
        if (response.data.status === false) {
            self.$notify.error({
            title: '错误',
            message: response.data.err
          });
        } else {
          // to-FIX: 应该为永久重定向
          self.$router.push('/home');
        }
      }).catch(error => console.log(error));
    },
    register: function () {
      this.$router.push('/register');
    }
  }
}
</script>

<style>
</style>
