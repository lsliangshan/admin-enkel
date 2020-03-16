<template>
  <Dropdown placement="bottom-end"
            class="login_box"
            @on-click="itemClickHandler">
    <div class="login_box_content">
      <div class="login_username">{{loginInfo.username || '登录'}}</div>
      <Avatar :size="32"
              :src="assets.avatar"
              @on-error="avatarLoadError"
              class="user-avatar"></Avatar>
    </div>
    <DropdownMenu slot="list">
      <DropdownItem name="profile">
        <Icon type="md-person"
              size="18" />
        个人中心
      </DropdownItem>
      <DropdownItem name="settings">
        <Icon type="ios-cog-outline"
              size="18" />
        设置
      </DropdownItem>
      <DropdownItem divided
                    name="logout">
        <Icon type="ios-log-out"
              size="18"
              style="font-weight: bold;" />
        退出登录
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
// import { Icon, Avatar, Dropdown, DropdownMenu, DropdownItem } from 'view-design'
import * as types from '../store/mutation-types'
export default {
  name: 'LoginBox',
  components: {
    // Icon, Avatar, Dropdown, DropdownMenu, DropdownItem
  },
  computed: {
    assets () {
      return this.$store.state.assets
    },
    loginInfo () {
      return this.$store.state.loginInfo
    }
  },
  methods: {
    avatarLoadError (evt) {
      evt.target.setAttribute('src', this.assets.defaultAvatar)
    },
    itemClickHandler (name) {
      if (name === 'logout') {
        this.logout()
      }
    },
    logout () {
      this.$router.replace({
        name: 'Login'
      })
      this.$store.commit(types.LOG_OUT)
    }
  }
}
</script>

<style lang="less" scoped>
@import url("../themes/index.less");
.login_box {
  user-select: none;
}
.login_box_content {
  padding: 0 15px;
  height: 100%;
  user-select: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
  &:hover {
    background-color: @hover-bg-color;
  }
  .login_username {
    margin-right: 15px;
  }
}
</style>