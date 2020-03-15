<template>
  <div class="content_blank">
    <div class="content_blank_inner">
      content blank
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentBlank'
}
</script>

<style lang="less" scoped>
@import url("../themes/index.less");
.content_blank {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
  overflow: auto;
  .content_blank_inner {
    min-height: 150%;
    border-radius: 4px;
    font-size: 16px;
    background-color: @theme-bg-color;
    color: @theme-color;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
}
</style>