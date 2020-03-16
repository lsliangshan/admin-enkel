<template>
  <div id="app">
    <router-view name="HomeRouter" />
    <all-svgs></all-svgs>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    AllSvgs: () => import('./Svgs.vue')
  }
}
</script>

<style lang="less">
@import url("./themes/index.less");
* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
}
#app {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}

.icon_only {
  display: inline-block;
  width: 100%;
  text-align: center;
  user-select: none;
  .ivu-poptip-rel {
    width: 100%;
  }
  .ivu-poptip-body {
    padding: 8px 0;
  }
  .menu_dropdown_items {
    line-height: normal;
    clear: both;
    color: rgb(73, 80, 96);
    white-space: nowrap;
    cursor: pointer;
    font-size: 12px;
    margin: 0px;
    /*padding: 7px 16px;*/
    list-style: none;
    transition: background 0.2s ease-in-out;
    .menu_dropdown_item {
      /*background-color: rgba(169,134,255,0.38);*/
      margin: 0;
      line-height: normal;
      padding: 7px;
      clear: both;
      color: #495060;
      font-size: 12px !important;
      white-space: nowrap;
      list-style: none;
      cursor: pointer;
      text-align: left;
      padding-left: 15px;
      -webkit-transition: background 0.2s ease-in-out;
      transition: background 0.2s ease-in-out;
      &:hover {
        background: #f3f3f3;
      }
    }
  }
}
.ivu-loading-bar {
  bottom: 0 !important;
  top: auto;
}
.ivu-menu-item-active {
  color: @theme-color!important;
}

.btn-warning {
  display: inline-block;
  margin-bottom: 0;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid #f90;
  white-space: nowrap;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: color 0.2s linear, background-color 0.2s linear,
    border 0.2s linear, box-shadow 0.2s linear;
  height: 24px;
  margin-right: 5px;
  color: #fff;
  background-color: #f90;
  padding: 0 7px;
  font-size: 14px;
  border-radius: 3px;
  outline: none;
  &:hover {
    color: #fff;
    background-color: #ffad33;
    border-color: #ffad33;
  }
  &:active {
    color: #f2f2f2;
    background-color: #f29100;
    border-color: #f29100;
  }
}
.btn-error {
  display: inline-block;
  margin-bottom: 0;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid #ed4014;
  white-space: nowrap;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: color 0.2s linear, background-color 0.2s linear,
    border 0.2s linear, box-shadow 0.2s linear;
  height: 24px;
  margin-right: 5px;
  color: #fff;
  background-color: #ed4014;
  padding: 0 7px;
  font-size: 14px;
  border-radius: 3px;
  outline: none;
  &:hover {
    color: #fff;
    background-color: #f16643;
    border-color: #f16643;
  }
  &:active {
    color: #f2f2f2;
    background-color: #e13d13;
    border-color: #e13d13;
  }
}
</style>
