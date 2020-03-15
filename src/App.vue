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
</style>
