<template>
  <div class="side_menu">
    <transition-group name="full-name"
                      :css="false"
                      @before-enter="logoBeforeEnter"
                      @before-leave="logoBeforeLeave"
                      @enter="logoEnter"
                      @leave="logoLeave">
      <div class="side_menu_log"
           style="width: 200px;"
           key="full-name"
           data-name="fullName"
           v-if="!collapsed">{{fullName}}</div>
      <div class="side_menu_log"
           style="width: 64px;"
           key="short-name"
           data-name="shortName"
           v-else>{{shortName}}</div>
    </transition-group>
    <div class="side_menu_content">
      <Menu :active-name="mainMenu + '-' + subMenu"
            theme="dark"
            width="auto"
            :open-names="[mainMenu]"
            @on-select="navTo">
        <transition-group name="unfold-menu"
                          :css="false"
                          @before-enter="beforeEnter"
                          @before-leave="beforeLeave"
                          @enter="enter"
                          tag="div">
          <div v-for="(menu, index) in authorizedMenus"
               :key="menu.name"
               :data-index="index"
               v-if="!collapsed">
            <Submenu :name="menu.name">
              <template slot="title">
                <div class="menu_item">
                  <svg class="menu_item_icon">
                    <use :xlink:href="'#' + menu.icon"></use>
                  </svg>
                  <span v-text="menu.label"></span>
                </div>
              </template>
              <MenuItem v-for="(item, idx) in menu.children"
                        :key="idx"
                        :name="menu.name + '-' + item.name"
                        v-text="item.label">
              </MenuItem>
            </Submenu>
          </div>
        </transition-group>
        <transition-group name="fold-menu"
                          :css="false"
                          @before-enter="beforeEnter"
                          @before-leave="beforeLeave"
                          @enter="enter2"
                          tag="div">
          <div v-for="(menu, index) in authorizedMenus"
               :key="menu.name"
               :data-index="index"
               class="fold_menu_item"
               v-if="collapsed">
            <Poptip trigger="hover"
                    transfer
                    class="icon_only"
                    popper-class="icon_only"
                    :width="150"
                    word-wrap
                    placement="right">
              <div class="fold_menu_item_icon">
                <svg>
                  <use :xlink:href="'#' + menu.icon"></use>
                </svg>
              </div>
              <div class="api"
                   slot="content">
                <div class="menu_dropdown_items">
                  <div class="menu_dropdown_item"
                       v-for="(item, idx) in menu.children"
                       :key="idx"
                       :name="item.name"
                       @click="navTo(menu.name + '-' + item.name)"
                       v-text="item.label"></div>
                </div>
              </div>
            </Poptip>
          </div>
        </transition-group>
      </Menu>
    </div>
  </div>
</template>

<script>
// https://blog.csdn.net/Hua929323125/article/details/85319341
import Velocity from 'velocity-animate'
// import { Menu, MenuGroup, MenuItem, Submenu, Icon, Poptip } from 'view-design'
import { routes } from '../router/routes'
export default {
  name: 'SideMenu',
  components: {
    // Menu, MenuGroup, MenuItem, Submenu, Icon, Poptip
  },
  data () {
    return {
      routes: []
    }
  },
  computed: {
    menus () {
      return this.$store.state.menus
    },
    collapsed () {
      return this.$store.state.collapsed
    },
    shortName () {
      return this.$store.state.shortName
    },
    fullName () {
      return this.$store.state.fullName
    },
    loginInfo () {
      return this.$store.state.loginInfo
    },
    authorizedMenus () {
      return this.routes.filter(item => {
        let authorized = item.children.filter(itm => itm.role.indexOf(this.loginInfo.role) > -1)
        item.children = authorized || []
        return authorized.length > 0
      })
    },
    mainMenu () {
      return this.$route.path.split('/')[1]
    },
    subMenu () {
      return this.$route.path.split('/')[2]
    },
  },
  mounted () {
    this.routes = routes
  },
  methods: {
    beforeEnter (el) {
      el.style.opacity = 0
    },
    beforeLeave (el) {
      el.style.opacity = 0
    },
    enter (el, done) {
      let delay = el.dataset.index * 50
      Velocity(el, {
        opacity: [1, 'ease-in', 0],
        translateX: [0, -200]
      }, {
        complete: done,
        easing: [250, 20],
        duration: 500,
        delay: delay
      })
    },
    enter2 (el, done) {
      let delay = el.dataset.index * 50
      Velocity(el, {
        opacity: [1, 'linear', 0],
        scale: [1, [250, 20], 0.1]
        // translateX: [0, -200]
      }, {
        complete: done,
        // easing: [250, 20],
        duration: 300,
        delay: delay
      })
    },
    logoBeforeEnter (el) {
      // el.style.opacity = 0
    },
    logoBeforeLeave (el) {
      // el.style.opacity = 0
    },
    logoEnter (el, done) {
      let refName = el.dataset.name
      if (this.collapsed) {
        if (refName === 'fullName') {
          Velocity(el, {
            translateX: [-200, 0]
          }, {
            easing: 'linear',
            duration: 500
          })
        }
        if (refName === 'shortName') {
          Velocity(el, {
            translateX: [0, 200]
          }, {
            easing: 'linear',
            duration: 500
          })
        }
      } else {
        if (refName === 'fullName') {
          Velocity(el, {
            translateX: [0, -200]
          }, {
            easing: 'linear',
            duration: 500
          })
        }
        if (refName === 'shortName') {
          Velocity(el, {
            translateX: [64, 0]
          }, {
            easing: 'linear',
            duration: 500
          })
        }
      }
    },
    logoLeave (el, done) {
      let refName = el.dataset.name
      if (this.collapsed) {
        if (refName === 'fullName') {
          Velocity(el, {
            translateX: [-200, 0]
          }, {
            easing: 'linear',
            duration: 500
          })
        }
        if (refName === 'shortName') {
          Velocity(el, {
            translateX: [0, 64]
          }, {
            easing: 'linear',
            duration: 500
          })
        }
      } else {
        if (refName === 'fullName') {
          Velocity(el, {
            translateX: [0, -200]
          }, {
            easing: 'linear',
            duration: 500
          })
        }
        if (refName === 'shortName') {
          Velocity(el, {
            translateX: [200, 0]
          }, {
            easing: 'linear',
            duration: 500
          })
        }
      }
    },
    navTo (e) {
      this.$router.replace(`/${e.split('-')[0]}/${e.replace(/^([^-]*-)(.*)$/, '$2')}`)
    }
  }
}
</script>

<style lang="less" scoped>
@import url("../themes/index.less");
.w100p {
  width: 100%;
}
.side_menu {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  user-select: none;
  .side_menu_log {
    position: absolute;
    top: 0;
    z-index: 999;
    width: 100%;
    height: 64px;
    border-bottom: 1px solid darken(@theme-bg-color, 10%);
    background: @theme-bg-color;
    color: @theme-color;
    font-size: 18px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .side_menu_content {
    width: 100%;
    height: calc(100% - 64px);
    padding-top: 84px;
    overflow-y: auto;
    .fold_menu_item {
      padding: 14px 0;
      box-sizing: none;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      outline: 0;
      list-style: none;
      font-size: 14px;
      position: relative;
      z-index: 1;
      cursor: pointer;
      color: rgba(255, 255, 255, 0.7);
      -webkit-transition: all 0.2s ease-in-out;
      transition: all 0.2s ease-in-out;
      &:hover {
        color: rgba(255, 255, 255, 1);
      }
      &_icon {
        svg {
          width: 24px;
          height: 24px;
          fill: #c8c8c8;
        }
      }
    }
    .menu_item {
      display: flex;
      flex-direction: row;
      align-items: center;
      svg {
        width: 18px;
        height: 18px;
        fill: #c8c8c8;
        margin-right: 8px;
        margin-bottom: 2px;
      }
    }
  }
}
</style>