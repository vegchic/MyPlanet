<template>
  <div>
    <el-row type="flex" justify="center" class="margin">
      <el-upload ref="avatar"
        class="avatar-uploader"
        action="/api/profile/avatar"
        :show-file-list="false"
        :auto-upload="false"
        :before-upload="checkImg"
        :on-success="GetResponse"
        :on-error="uploadonfail"
        accept="jpg png jpeg"
        :on-change="handleAvatarSuccess">
        <img :src="userImg" class="avatar">
      </el-upload>
    </el-row>
    <el-row type="flex" justify="center">
      <el-button type="primary" @click="uploadImg">上传</el-button>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="4">
        <el-form :model="userinfo" ref="user" :rules="rules1">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="userinfo.username" auto-complete="off" readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="userinfo.nickname" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="userinfo.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="update">保存</el-button>
              <el-button @click="changePassword=true">更改密码</el-button>
          </el-form-item>
        </el-form>
        <el-form :model="passwords" v-if="changePassword" :rules="rules2" ref="pwd">
          <el-form-item label="旧密码" prop="oldpassword">
            <el-tooltip class="item" effect="dark" content="长度为6-18个字母或数字" placement="right">
              <el-input type="password" v-model="passwords.oldpassword" auto-complete="off"></el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="新密码" prop="newpassword">
            <el-tooltip class="item" effect="dark" content="长度为6-18个字母或数字" placement="right">
              <el-input type="password" v-model="passwords.newpassword" auto-complete="off"></el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="changePW">保存</el-button>
              <el-button @click="changePassword=false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { genValidator } from '../util/validator'
import onfail from '../util/onfail'

export default {
  name: 'userInfo',
  data () {
    return {
      userinfo: {nickname: '', email: ''},
      changePassword: false,
      userImg: '/api/profile/avatar',
      passwords: {'oldpassword': '', 'newpassword': ''},
      imgDataType: 'image/jpeg, image/png, image/jpg',
      rules1: {
        nickname: [
          { validator: genValidator('nickname', '昵称', true), trigger: 'blur' }
        ],
        email: [
          { validator: genValidator('email', '邮箱', true), trigger: 'blur' }
        ]
      },
      rules2: {
        oldpassword: [
          { validator: genValidator('password', '旧密码'), trigger: 'blur' }
        ],
        newpassword: [
          { validator: genValidator('password', '新密码'), trigger: 'blur' }
        ]
      }
    }
  },
  mounted: function () {
    const self = this;
    this.$axios.get('/api/profile')
      .then(function (response) {
        if (!response.data.status) {
          onfail(self, response, '获取个人信息失败');
        } else {
          self.userinfo = response.data.data;
        }
      })
      .catch(error => console.log(error))
  },
  methods: {
    handleAvatarSuccess(file) {
      this.userImg = URL.createObjectURL(file.raw);
    },
    GetResponse(res, file) {
      this.$notify.success({
        title: '成功',
        message: '上传成功'
      });
    },
    uploadonfail() {
      this.$notify.error({
        title: '错误',
        message: '上传失败'
      });
    },
    uploadImg() {
      this.$refs.avatar.submit();
    },
    checkImg: function (file) {
      // const file = ;
      var type = file.type
      var size = file.size
      if (this.imgDataType.indexOf(type) === -1) {
        this.$message.error('请上传jpg png jpeg格式！')
        return false
      }
      if (size > 409600) {
        this.$message.error('请选择400k以内的图片！')
        return false
      }
      return true;
    },
    changePW: async function () {
      const self = this;
      let valid = await this.$refs.pwd.validate().catch(()=>{});
      if (valid) {
        this.$axios.post('/api/profile/password', this.passwords)
          .then(function (response) {
            if (response.data.status === true) {
              self.$notify.success({
                title: '成功',
                message: '更改成功'
              });
            } else {
              onfail(self, response, '更改失败');
            }
          })
          .catch(error => console.log(error))
      }
    },
    update: async function () {
      const self = this;
      let valid = await this.$refs.user.validate().catch(()=>{});
      if (valid) {
        this.$axios.put('/api/profile', this.userinfo)
          .then(function (response) {
            if (response.data.status === true) {
              self.$notify.success({
                title: '成功',
                message: '更新信息成功'
              });
            } else {
              onfail(self, response, '更新失败');
            }
          })
          .catch(error => console.log(error))
      }
    }
  }
}
</script>

<style>
.margin {
  margin: 10px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>
