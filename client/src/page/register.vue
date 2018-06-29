<template>
  <div id="registerBox">
    <h1>注册</h1>
    <div>
    <p><span>用户注册</span></p>
    <p>用户名
       <input type="text" class="_input" id="username" name="username" @blur="checkinfo(1)" v-model="userinfo.username"/>
       <input type="text" class="first second" id="usernameInvalid" value="格式错误" readonly="readonly"/>
    </p>
    <p>密码
      <input type="password" class="_input" id="password" name="password" @blur="checkinfo(2)" v-model="userinfo.password"/>
      <input type="text" class="first second" id="passwordInvalid" value="长度错误" readonly="readonly"/>
    </p>
    <p>昵称
      <input type="text" class="_input" id="nickname" name="nickname" @blur="checkinfo(3)" v-model="userinfo.nickname"/>
      <input type="text" class="first second" id="nicknameInvalid" value="不可为空" readonly="readonly"/>
    </p>
    <p>邮箱
      <input type="text" class="_input" id="email" name="email" @blur="checkinfo(4)" v-model="userinfo.email"/>
      <input type="text" class="first second" id="emailInvalid" value="格式错误" readonly="readonly"/>
    </p>
      <button id="reset" @click="reset">重置</button>
      <button id="register" @click="register">注册</button>
    </div>
    <div>
      <ul id="tips">注册要求：
        <li>账号为数字、字母、下划线组成，长度为6-18个字符，请以字母开头；</li>
        <li>密码长度为6-18个任意字符；</li>
        <li>邮箱请输入正确有效的邮箱；</li>
        <li>请注意任意数据不能为空。</li>
      </ul>
      没按照要求则无法成功注册。
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      userinfo: {'username': '', 'password': '', 'nickname': '', 'email': ''},
      infoError: [1, 1, 1, 1]
    }
  },
  methods: {
    reset: function () {
      this.userinfo.username = ''
      this.userinfo.password = ''
      this.userinfo.nickname = ''
      this.userinfo.email = ''
      for (var i = 0; i < 4; ++i) {
        this.infoError[i] = 1
      }
      $('#usernameInvalid').attr('class', 'first')
      $('#passwordInvalid').attr('class', 'first')
      $('#nicknameInvalid').attr('class', 'first')
      $('#emailInvalid').attr('class', 'first')
    },
    register: function () {
      if (!this.allInfosRight()) {
        return
      }
      this.$axios.post('/api/register', this.userinfo)
        .then(function (response) {
          if (response.status === true) {
            window.location.href = '/login'
          } else {
            console.log('this username has existed')
          }
        })
        .catch(error => console.log(error))
    },
    allInfosRight: function () {
      for (var i = 0; i < 4; ++i) {
        if (this.infoError[i] === 1) {
          return false
        }
      }
      return true
    },
    checkinfo: function (index) {
      switch (index) {
        case 1:
          if (/^[a-zA-Z]\w{5,17}/.test(this.userinfo.username)) {
            $('#usernameInvalid').attr('class', 'first')
            this.infoError[0] = 0
          } else {
            if (this.userinfo.username === '') {
              $('#usernameInvalid').val('不可为空')
            }
            $('#usernameInvalid').attr('class', 'second')
            this.infoError[0] = 1
          }
          break
        case 2:
          if (this.userinfo.password.length < 6 || this.userinfo.password.length > 18) {
            if (this.userinfo.password === '') {
              $('#passwordInvalid').val('不可为空')
            }
            $('#passwordInvalid').attr('class', 'second')
            this.infoError[1] = 1
          } else {
            $('#passwordInvalid').attr('class', 'first')
            this.infoError[1] = 0
          }
          break
        case 3:
          if (this.userinfo.nickname === '') {
            $('#nicknameInvalid').attr('class', 'second')
            this.infoError[2] = 1
          } else {
            $('#usernameInvalid').attr('class', 'first')
            this.infoError[2] = 0
          }
          break
        case 4:
          if (/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(this.userinfo.email)) {
            $('#emailInvalid').attr('class', 'first')
            this.infoError[3] = 0
          } else {
            if (this.userinfo.email === '') {
              $('#emailInvalid').val('不可为空')
            }
            $('#emailInvalid').attr('class', 'second')
            this.infoError[3] = 1
          }
          break
        default: break
      }
    }
  }
}
</script>

<style>
/* @import '../assets/css/register.css'; */
</style>
