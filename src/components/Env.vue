<template>
  <div class="env_container">
    QA
  </div>
</template>

<script>
export default {
  name: 'Env'
}
</script>

<style lang="less" scoped>
@import url("../themes/index.less");
.env_container {
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 12px;
  height: 16px;
  padding: 0 8px;
  background-color: @theme-color;
  color: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>