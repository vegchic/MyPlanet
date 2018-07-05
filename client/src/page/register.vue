<template>
  <div>
    <el-row type="flex" justify="center">
      <h1 class="title">My Planet</h1>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="2" class="container"><h2>Register</h2></el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="4" class="container">
        <el-form ref="register" :model="userinfo" :rules="rules" label-width="80px">
          <el-tooltip class="item" effect="dark" content="以字母开头，数字、字母、下划线组成，长度为6-18个字符" placement="right">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="userinfo.username" auto-complete="off"></el-input>
            </el-form-item>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="长度为6-18个字母或数字" placement="right">
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="userinfo.password" auto-complete="off"></el-input>
            </el-form-item>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="可选，1到17个字符" placement="right">
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model="userinfo.nickname" auto-complete="off"></el-input>
            </el-form-item>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="可选，形如jack@example.com" placement="right">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="userinfo.email" auto-complete="off"></el-input>
            </el-form-item>
          </el-tooltip>
          <el-form-item>
              <el-button type="primary" @click="register">注册</el-button>
              <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { genValidator } from '../util/validator';

export default {
  name: 'register',
  data () {
    let checkUsername = genValidator('username', '用户名');
    let checkPassword = genValidator('password', '密码');
    let checkNickname = genValidator('nickname', '昵称', true);
    let checkEmail = genValidator('email', '邮箱', true);

    return {
      userinfo: {'username': '', 'password': '', 'nickname': '', 'email': ''},
      rules: {
        username: [
          { validator: checkUsername, trigger: 'blur' },
        ],
        password: [
          { validator: checkPassword, trigger: 'blur' },
        ],
        nickname: [
          { validator: checkNickname, trigger: 'blur' },
        ],
        email: [
          { validator: checkEmail, trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    reset: function () {
      this.$refs['register'].resetFields();
    },
    register: async function () {
      let valid = this.$refs['register'].validate().catch(() => {});
      if (valid) {
        let response = await this.$axios.post('/api/register', this.userinfo);
        if (response.data.status === true) {
          await this.$confirm('注册成功', '提示', {
            confirmButtonText: '返回登录页面',
            cancelButtonText: '取消',
            type: 'info',
            center: true,
          }).then(() => this.$router.push('/login')).catch(() => {});
        } else {
          this.$notify.error({
            title: '错误',
            message: response.data.err || '注册失败'
          });
        }
      }
    },
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
