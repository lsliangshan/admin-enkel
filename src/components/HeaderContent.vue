<template>
  <div class="header_content">
    {{cachedTitle}}
  </div>
</template>

<script>
export default {
  name: 'HeaderContent',
  data () {
    return {
      title: '',
      cachedTitle: ''
    }
  },
  created () {
    this.cachedTitle = this.title

    setTimeout(() => {
      // this.title = '职位详情页'
      this.cachedTitle = this.title
    }, 3000)
  }
}
</script>

<style lang="less" scoped>
.header_content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>