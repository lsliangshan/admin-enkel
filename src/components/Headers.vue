<template>
  <div class="headers">
    <div class="menu_folder"
         @click="toggleMenuFold">
      <svg>
        <use :xlink:href="collapsed ? '#menu-unfold' : '#menu-fold'"></use>
      </svg>
    </div>
    <div class="header_content_wrapper">
      <header-content></header-content>
    </div>
    <login-box></login-box>
  </div>
</template>

<script>
  import { Icon } from 'view-design'
  import * as types from '../store/mutation-types'
  export default {
    name: 'Headers',
    components: {
      Icon,
      LoginBox: () => import('./LoginBox'),
      HeaderContent: () => import('./HeaderContent')
    },
    computed: {
      collapsed () {
        return this.$store.state.collapsed
      }
    },
    methods: {
      toggleMenuFold () {
        this.$store.commit(types.TOGGLE_SIDE_MENU)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import url("../themes/index.less");
  .headers {
    width: 100%;
    height: 64px;
    padding-right: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .menu_folder {
      width: 64px;
      height: 64px;
      cursor: pointer;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      &:hover {
        background-color: @hover-bg-color;
      }
      svg {
        width: 18px;
        height: 18px;
        fill: lighten(@theme-color, 2%);
      }
    }
    .header_content_wrapper {
      flex: 1;
      height: 100%;
      &:hover {
        background-color: @hover-bg-color;
      }
    }
  }
</style>