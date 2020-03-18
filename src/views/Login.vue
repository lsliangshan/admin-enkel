<template>
  <div class="login_container">
    <div class="login_bg">
      <svg>
        <use xlink:href="#body"></use>
      </svg>
    </div>
    <div class="login_box">
      <div class="login_box_header">Enkel</div>
      <div class="login_box_form">
        <Form ref="formRef"
              :model="formData"
              :rules="formRules">
          <FormItem prop="username">
            <Input type="text"
                   placeholder="用户名"
                   @on-keydown.13="login"
                   clearable
                   v-model="formData.username"
                   prefix="ios-person-outline" />
          </FormItem>
          <FormItem prop="password"
                    class="password-item">
            <Input type="password"
                   placeholder="密码"
                   @on-keydown.13="login"
                   password
                   v-model="formData.password"
                   prefix="ios-lock-outline" />
          </FormItem>
          <FormItem>
            <Button :loading="isLoggingIn"
                    long
                    @click.13="login"
                    ghost>登录</Button>
          </FormItem>
        </Form>
      </div>
      <div class="login_box_footer">Enkel Admin</div>
    </div>
  </div>
</template>

<script>
// import { Form, FormItem, Input, Button, Icon } from 'view-design'
import { isEmptyObj } from '../utils'
import * as types from '../store/mutation-types'
export default {
  name: 'Login',
  components: {
    // Form, FormItem, Input, Button, Icon
  },
  data () {
    return {
      isLoggingIn: false, // 正在登录中
      formData: {
        username: '',
        password: ''
      },
      formRules: {
        username: [
          {
            required: true,
            message: '请输入您的用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入您的密码',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 6,
            message: '密码最少6位',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    users () {
      return this.$store.state.users
    }
  },
  methods: {
    verifyUser () {
      let allUsers = this.users
      let i = 0
      let outUser = {}
      for (i; i < allUsers.length; i++) {
        if (allUsers[i].username === this.formData.username.trim() && allUsers[i].password === this.formData.password.trim()) {
          outUser = allUsers[i]
          i = allUsers.length
        }
      }
      return outUser
    },
    login () {
      const that = this
      if (this.isLoggingIn) return
      this.isLoggingIn = true
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.isLoggingIn = false
          let _user = this.verifyUser()
          if (!isEmptyObj(_user)) {
            that.$Message.success('登录成功!')
            this.$store.commit(types.CACHE_LOGIN_INFO, {
              username: this.formData.username,
              role: _user.role,
              loginTime: (new Date()).getTime()
            })
            that.$router.replace('/')
          } else {
            that.$Message.error('账号或密码不正确')
          }
        } else {
          this.isLoggingIn = false
          this.$Message.error('表单填写不正确!')
        }
      })
    }
  }
}
</script>

<style lang="less">
@import url("../themes/index.less");
.login_container {
  position: relative;
  width: 100%;
  height: 100%;
  user-select: none;
  background-color: @theme-bg-color;
  color: @theme-color;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .ivu-input {
    background-color: darken(@theme-color, 80%);
    border-color: transparent;
    box-shadow: none;
    color: #c8c8c8;
    &::placeholder {
      color: #888;
      font-size: 13px;
    }
    &:hover {
      border-color: transparent;
    }
    &:active {
      border-color: transparent;
    }
    &:focus {
      border-color: transparent;
    }
  }
  .ivu-input-prefix {
    i {
      color: @theme-color;
      font-weight: bold;
    }
  }
  .login_bg {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 0;
    svg {
      width: 100%;
      height: 100%;
      fill: #c8c8c8;
    }
  }
  .login_box {
    z-index: 1;
    width: 320px;
    height: 320px;
    border-radius: 15px;
    background-color: @theme-bg-color; //darken(@theme-bg-color, 10%);
    box-shadow: 0 0 10px darken(@theme-color, 80%);
    .login_box_header {
      width: 100%;
      height: 64px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      padding: 0 15px;
      box-sizing: border-box;
      border-bottom: 1px solid darken(@theme-bg-color, 10%);
    }
    .login_box_form {
      width: 100%;
      height: calc(100% - 64px - 48px);
      padding: 32px 16px;
      box-sizing: border-box;
      .ivu-btn-ghost {
        &.ivu-btn-default {
          border-color: @theme-color;
          color: @theme-color;
        }
      }
      .ivu-btn {
        &:active {
          background-color: lighten(@theme-color, 5%);
        }
      }
    }
    .login_box_footer {
      width: 100%;
      height: 48px;
      color: #555;
      font-size: 15px;
      border-top: 1px solid darken(@theme-bg-color, 5%);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>