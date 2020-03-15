<template>
  <div class="content">
    <router-view name="ContentRouter"
                 v-if="$route.name !== 'home'"></router-view>
    <content-blank v-else></content-blank>
  </div>
</template>

<script>
export default {
  name: 'Content',
  components: {
    ContentBlank: () => import('./ContentBlank')
  }
}
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>