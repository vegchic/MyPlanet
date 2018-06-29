<template>
  <div>
    <img :src="userImg" id="userImg">
    <!-- <span class="fileinput-button""> -->
       <!-- <span>更换头像</span> -->
    <input type="file" @change="uploadImg">
    <!-- </span> -->
    <table>
      <tr>
        <td>用户名</td>
        <td>
          <input type="text" name="text" v-model='userinfo.username' readonly="readonly">
        </td>
      </tr>
      <tr>
        <td>昵称</td>
        <td>
          <input type="text" name="text" v-model='userinfo.nickname'>
        </td>
        <td>
          <input type="text" class="first second" id="nicknameInvalid" value="不可为空" readonly="readonly"/>
        </td>
      </tr>
      <tr>
        <td>邮箱</td>
        <td>
          <input type="text" name="text" v-model='userinfo.email'>
        </td>
        <td>
          <input type="text" class="first second" id="emailInvalid" value="格式错误" readonly="readonly"/>
        </td>
      </tr>
    </table>
    <button @click="changePassword = true">更改密码</button>
    <button @click="update">更新</button>
    <div v-if="changePassword">
      <table>
        <tr>
          <td>原密码</td>
          <td>
            <input type="password" name="oldpassword" v-model='passwords.oldpassword'>
          </td>
          <td>
            <input type="text" class="first second" id="oldInvalid" value="原密码错误" readonly="readonly"/>
          </td>
        </tr>
        <tr>
          <td>新密码</td>
          <td>
            <input type="password" name="newpassword" v-model='passwords.newpassword'>
          </td>
          <td>
            <input type="text" class="first second" id="newInvalid" value="" readonly="readonly"/>
          </td>
        </tr>
      </table>
      <button @click='changePW'>确定更改</button>
      <button @click='changePassword = false'>取消</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userInfo',
  data () {
    return {
      userinfo: {'nickname': '', 'email': ''},
      changePassword: false,
      userImg: '',
      passwords: {'oldpassword': '', 'newpassword': ''},
      imgDataType: 'image/gif, image/jpeg, image/png, image/jpg'
    }
  },
  mounted: function () {
    this.$axios.get('/api/profile')
      .then(function (response) {
        if (response.status === 'false') {
          window.loactin.href = '/login'
        } else {
          this.userinfo = response.data
        }
      })
      .catch(error => console.log(error))
    this.$axios.get('/api/profile/avatar')
      .then(function (response) {
        if (response.status === 'false') {
          window.loactin.href = '/login'
        } else {
          this.userImg = response
        }
      })
      .catch(error => console.log(error))
  },
  methods: {
    uploadImg: function (event) {
      var imgfile = event.target.files[0]
      var type = imgfile.type
      var size = imgfile.size
      if (this.imgDataType.indexOf(type) === -1) {
        alert('请选择我们支持的图片格式！')
        return false
      }
      if (size > 409600) {
        alert('请选择400k以内的图片！')
        return false
      }
      // 显示图片
      var reader = new FileReader()
      var self = this
      reader.readAsDataURL(imgfile)
      reader.onloadend = function () {
        self.userImg = this.result
      }
      // 上传图片
      this.$axios.post('/api/profile/avatar', imgfile)
        .then(function (response) {
          if (response.status === true) {
            console.log('更换成功')
          }
        })
        .catch(error => console.log(error))
    },
    changePW: function () {
      $('#newInvalid').attr('class', 'first')
      $('#oldInvalid').attr('class', 'first')
      if (this.passwords.newpassword.length < 6 || this.passwords.newpassword.length > 18) {
        if (this.passwords.newpassword === '') {
          $('#newInvalid').val('不可为空')
        } else {
          $('#newInvalid').val('密码长度限制为6-18位')
        }
        $('#newInvalid').attr('class', 'second')
      } else {
        this.$axios.post('/api/profile/password', this.passwords)
          .then(function (response) {
            if (response.status === 'false') {
              $('#oldInvalid').attr('class', 'second')
            } else {
              console.log('更改成功')
            }
          })
          .catch(error => console.log(error))
      }
    },
    update: function () {
      var valid = true
      if (this.userinfo.nickname === '') {
        $('#nicknameInvalid').attr('class', 'second')
        valid = false
      } else {
        $('#nicknameInvalid').attr('class', 'first')
      }
      if (/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(this.userinfo.email)) {
        $('#emailInvalid').attr('class', 'first')
      } else {
        valid = false
        if (this.userinfo.email === '') {
          $('#emailInvalid').val('不可为空')
        } else {
          $('#emailInvalid').val('格式错误')
        }
        $('#emailInvalid').attr('class', 'second')
      }
      if (valid === true) {
        this.$axios.put('/api/profile', this.userinfo)
          .then(function (response) {
            if (response.status === true) {
              console.log('信息更新成功')
            }
          })
          .catch(error => console.log(error))
        this.$axios.post('/api/profile/avatar', this.userImg)
          .then(function (response) {
            if (response.status === true) {
              console.log('头像更新成功')
            }
          })
          .catch(error => console.log(error))
      }
    }
  }
}
</script>

<style>
#newInvalid, #oldInvalid, #nicknameInvalid, #emailInvalid
{
  color: red;
  width: 150px;
  border: none;
}

.second
{
  opacity: 1;
}

.first
{
  opacity: 0;
}

#userImg {
  width: 100px;
  height: 100px;
}

/*.fileinput-button {
  position: relative;
  display: inline-block;
  overflow: hidden;
}

.fileinput-button input {
  position: absolute;
  right: 0px;
  top: 0px;
  opacity: 0;
  -ms-filter: 'alpha(opacity=0)';
}*/
</style>
