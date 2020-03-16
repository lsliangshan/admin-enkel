<template>
  <div class="home">
    <Layout style="height: 100%;"
            type="primary">
      <Sider ref="SideMenu"
             collapsible
             hide-trigger
             class="side_menu_container"
             v-model="collapse">
        <SideMenu></SideMenu>
      </Sider>
      <Layout>
        <Header class="header_container">
          <Headers></Headers>
        </Header>
        <Content>
          <!-- <Button type="primary"
                  @click="setCollapse">切换</Button> -->

        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
// @ is an alias to /src
// import { Button, Layout, Header, Sider } from 'view-design'
import * as types from '../store/mutation-types'
export default {
  name: 'home',
  components: {
    // Button, Layout, Header, Sider,
    Headers: () => import('../components/Headers'),
    SideMenu: () => import('../components/SideMenu'),
    Content: () => import('../components/Content'),
  },
  data () {
    return {
      collapse: false // true: 收起；false: 展开
    }
  },
  computed: {
    collapsed () {
      return this.$store.state.collapsed
    }
  },
  mounted () {
    this.$refs.SideMenu.close = this.close
    this.$refs.SideMenu.open = this.open
  },
  methods: {
    toggleCollapse (collapsed) {
      this.$store.commit(types.SET_COLLAPSED, {
        collapsed: collapsed
      })
    },
    setCollapse () {
      this.$refs.SideMenu.toggleCollapse()
    },
    close () {
      this.collapse = true
    },
    open () {
      this.collapse = false
    },
    toggle () {
      this.collapse = !this.collapse
    }
  },
  watch: {
    collapsed: {
      immediate: true,
      handler (val) {
        this.collapse = val
      }
    }
  }
}
</script>

<style lang="less">
@import url("../themes/index.less");
.home {
  width: 100%;
  height: 100%;
  min-width: 1000px;
  .side_menu_container {
    overflow-y: hidden;
    background: @theme-bg-color;
  }
  .header_container {
    padding: 0;
    color: @theme-color;
    background: @theme-bg-color;
    background: -webkit-linear-gradient(
      90deg,
      @theme-bg-color,
      lighten(@theme-bg-color, 15%)
    );
    background: -moz-linear-gradient(
      to right,
      @theme-bg-color,
      lighten(@theme-bg-color, 15%)
    );
    background: -o-linear-gradient(
      to right,
      @theme-bg-color,
      lighten(@theme-bg-color, 15%)
    );
    background: linear-gradient(
      90deg,
      @theme-bg-color,
      lighten(@theme-bg-color, 15%)
    );
  }
}
</style>