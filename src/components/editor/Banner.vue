<template>
  <div class="editor_container"
       ref="container">
    <div class="editor_container_header">
      <Button type="primary"
              @click="openMaterialDrawer">新增</Button>
    </div>
    <div class="editor_container_content">
      <Table class="entrance_table"
             :loading="loading"
             :stripe="true"
             border
             :height="containerHeight"
             :data="list"
             :columns="columns"></Table>
    </div>

    <Drawer title="选择素材"
            placement="left"
            :closable="false"
            width="424"
            :styles="{backgroundColor: '#f0f0f0'}"
            v-model="material.shown">
      <div slot="header"
           class="material_header">
        <div class="material_header_title">选择素材</div>
        <Button type="primary"
                :disabled="material.activeIndex < 0"
                @click="add">确定</Button>
      </div>
      <div class="material_container">
        <div class="material_item"
             v-for="(item, index) in material.list"
             :key="index"
             @click="chooseMaterial(index)">
          <div class="material_item_img">
            <img :src="item.cover"
                 :alt="item.title">
          </div>
          <div class="material_item_desc">
            {{item.title}}
          </div>
          <transition name="fade">
            <div class="material_item_selected"
                 v-if="index === material.activeIndex">
              <Icon type="ios-checkmark-circle"
                    size="22"
                    color="#4cae4c" />
            </div>
          </transition>
        </div>
        <div class="material_item_blank"></div>
      </div>
    </Drawer>

  </div>
</template>

<script>
// import { Button, Icon, Drawer, Table, Switch, Modal, Input, Form, FormItem } from 'view-design'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('../../store/modules')
export default {
  name: 'EditorBanner',
  components: {
    // Button, Icon, Drawer, Table, Modal, Input, Form, FormItem,
    // Switch
  },
  data () {
    return {
      material: {
        shown: false,
        list: [],
        activeIndex: -1,
        pageIndex: 1,
        pageSize: 20
      },
      list: [],
      loading: true,
      pageIndex: 1,
      pageSize: 20,
      containerHeight: 300,
      modifyModal: {
        shown: false,
        data: {
          status: false
        },
        loading: true
      }
    }
  },
  computed: {
    store () {
      return this.$store
    },
    state () {
      return this.store.state
    },
    columns () {
      return [
        {
          type: 'index',
          width: 60,
          align: 'center',
          // fixed: 'left'
        },
        {
          title: '标题',
          width: 200,
          // fixed: 'left',
          render: (h, params) => {
            return h('span', params.row.enkel_banner.title)
          }
        },
        {
          title: '图片',
          width: 250,
          render: (h, params) => {
            console.log('params: ', params.row)
            return h('div', {
              style: {
                width: '214px',
                height: '150px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
              }
            }, [
              h('img', {
                style: {
                  maxWidth: '100%',
                  maxHeight: '100%'
                },
                attrs: {
                  src: params.row.enkel_banner.cover
                }
              })
            ])
          }
        },
        {
          title: '跳转地址',
          width: 250,
          render: (h, params) => {
            return h('span', params.row.enkel_banner.url)
          }
        },
        {
          title: '排序',
          width: 200,
          render: (h, params) => {
            return h('Input', {
              props: {
                // type: 'number',
                number: true
              },
              attrs: {
                placeholder: '排序',
                value: params.row.sort
              },
              style: {
                outline: 'none',
                userSelect: 'none',
                boxShadow: 'none'
              },
              on: {
                input: (value) => {
                  params.row.sort = Math.max(-1, value)
                }
              }
            })
          }
        },
        {
          width: 100,
          title: '状态',
          key: 'status',
          render: (h, params) => {
            return h('i-switch', {
              props: {
                value: params.row.status
              },
              style: {
                outline: 'none',
                userSelect: 'none',
                boxShadow: 'none'
              },
              attrs: {
                trueColor: '#13ce66',
                falseColor: '#ff4949'
              }
            })
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          align: 'center',
          // fixed: 'right',
          render: (h, params) => {
            return h('div', {
              style: {
                paddingTop: '8px',
                paddingBottom: '8px'
              }
            }, [
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                style: {
                  marginRight: '8px'
                },
                on: {
                  click: () => {
                    // alert('编辑')
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                  }
                }
              }, '删除')
            ])
          }
        }
      ]
    }
  },
  created () {
    this.init()
  },
  mounted () {
    this.$nextTick(() => {
      this.containerHeight = parseInt(this.$refs['container'].offsetHeight) - 48
    })
    window.addEventListener('resize', (e) => {
      if (this.$refs['container']) {
        this.containerHeight = parseInt(this.$refs['container'].offsetHeight) - 48
      }
    })
  },
  methods: {
    ...mapActions([
      'moduleBanner',
      'editorBanner'
    ]),
    requestMaterialList () {
      return new Promise(async (resolve) => {
        let res = await this.store.dispatch('moduleBanner/list', {})
        resolve(res)
      })
    },
    requestList () {
      return new Promise(async (resolve) => {
        let res = await this.store.dispatch('editorBanner/list', {})
        resolve(res)
      })
    },
    requestAdd (data) {
      return new Promise(async (resolve) => {
        let res = await this.store.dispatch('editorBanner/add', data)
        resolve(res)
      })
    },
    requestModify (data) {
      return new Promise(async (resolve) => {
        let res = await this.store.dispatch('editorBanner/modify', data)
        resolve(res)
      })
    },
    requestDel (data) {
      return new Promise(async (resolve) => {
        let res = await this.store.dispatch('editorBanner/del', data)
        resolve(res)
      })
    },
    async initMaterialList () {
      let response = await this.requestMaterialList({
        pageIndex: this.material.pageIndex,
        pageSize: this.material.pageSize
      })
      if (response.status == 200) {
        this.material.pageIndex = response.data.pageIndex
        if (this.material.pageIndex === 1) {
          this.material.list = response.data.list || []
        } else {
          this.material.list = this.material.list.concat(response.data.list || [])
        }
      } else {
      }
    },
    async init () {
      this.loading = true
      let response = await this.requestList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      })
      if (response.status == 200) {
        this.pageIndex = response.data.pageIndex
        if (this.pageIndex === 1) {
          this.list = response.data.list || []
        } else {
          this.list = this.list.concat(response.data.list || [])
        }
      } else {
      }
      this.loading = false
    },
    openMaterialDrawer () {
      this.initMaterialList()
      this.material.shown = true
    },
    closeMaterialDrawer () {
      this.material.shown = false
    },
    chooseMaterial (index) {
      this.material.activeIndex = Number(index)
    },
    async add () {
      let response = await this.requestAdd({
        materialId: this.material.list[this.material.activeIndex].uuid
      })
      if (response.status === 200) {
        // 新增成功
        this.$Message.success('新增成功')
        response.data && this.list.unshift(response.data)
        this.closeMaterialDrawer()
      } else {
        this.$Message.error(response.message || '新增失败，请稍后再试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.editor_container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: center;
  &_header {
    position: sticky;
    left: 0;
    top: 0;
    z-index: 9;
    width: 100%;
    height: 48px;
    background-color: #fff;
    padding: 0 15px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &_content {
    width: 100%;
    height: calc(~"100% - 48px");
  }
}
.material_header {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  .material_header_title {
    width: 300px;
    font-size: 16px;
    color: #17233d;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.material_container {
  width: 392px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  .material_item {
    position: relative;
    width: 120px;
    height: 152px;
    margin-bottom: 16px;
    border-radius: 4px;
    overflow: hidden;
    background-color: #fff;
    cursor: pointer;
    box-shadow: 0 0 15px 1px #c8c8c8;
    transition: all 0.2s ease-in-out;
    .material_item_img {
      width: 120px;
      height: 120px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    .material_item_desc {
      width: 100%;
      height: 32px;
      padding: 0 8px;
      box-sizing: border-box;
      // display: flex;
      // flex-direction: row;
      // align-items: center;
      // justify-content: center;
      line-height: 32px;
      text-align: center;
      font-size: 13px;
      color: #888;
      background-color: #f8f8f8;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &:hover {
      box-shadow: 0 0 15px 1px #888;
    }
    .material_item_selected {
      position: absolute;
      right: 2px;
      top: 2px;
      width: 24px;
      height: 24px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
  }
  .material_item_blank {
    width: 200px;
    height: 0;
  }
}
</style>