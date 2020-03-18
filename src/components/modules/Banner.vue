<template>
  <div class="module_container">
    <div class="module_container_header">
      <Button type="primary"
              @click="openAddModal">新增</Button>
    </div>
    <div class="module_container_content">
      <Row>
        <Col v-for="(item, index) in list"
             :key="index"
             :xs="24"
             :sm="12"
             :md="8"
             :lg="6">
        <div class="module_container_content_item">
          <div class="module_container_content_item_inner"
               v-limit-height>
            <img :src="item.cover"
                 :alt="item.title">
            <div class="module_container_content_item_inner_desc">{{item.title}}</div>
            <transition name="fade">
              <Tooltip content="正在使用中"
                       transfer
                       class="module_container_content_item_inner_status"
                       v-if="item.status">
                <div></div>
              </Tooltip>
            </transition>
            <div class="module_container_content_item_inner_edit">
              <Tooltip content="编辑">
                <div class="edit_item"
                     @click="openModifyModal(item, index)">
                  <Icon type="md-create"
                        color="#5bc0de"
                        size="24" />
                </div>
              </Tooltip>
              <Poptip confirm
                      transfer
                      title="删除后无法恢复，确认删除吗?"
                      @on-ok="del(item, index)">
                <Tooltip content="删除">
                  <div class="edit_item">
                    <Icon type="md-trash"
                          color="#d9534f"
                          size="24" />
                  </div>
                </Tooltip>
              </Poptip>
            </div>
          </div>
        </div>
        </Col>
      </Row>
      <transition name="fade">
        <div class="module_container_content_blank"
             v-if="list.length === 0">
          暂未添加任何素材
        </div>
      </transition>
    </div>

    <Modal v-model="addModal.shown"
           title="新增"
           :loading="addModal.loading"
           @on-ok="add">
      <Form :model="addModal.data"
            :label-width="80"
            ref="formAdd"
            :rules="rules">
        <FormItem label="标题"
                  prop="title">
          <Input v-model="addModal.data.title"></Input>
        </FormItem>
        <FormItem label="类型">
          <Select v-model="addModal.data.type">
            <Option v-for="(item, index) in allTypes"
                    :key="index"
                    :value="item.value"
                    :label="item.label">
              <span>{{item.label}}</span>
              <span v-if="item.value == 'tag'"
                    style="float:right;color:#ccc">用【标题】作为关键词搜索，请认真填写【标题】</span>
              <span v-if="item.value == 'url'"
                    style="float:right;color:#ccc">跳转到【跳转链接】</span>
            </Option>
          </Select>
        </FormItem>
        <transition name="fade">
          <FormItem label="跳转链接"
                    prop="url"
                    v-if="addModal.data.type == 'url'">
            <Input v-model="addModal.data.url"></Input>
          </FormItem>
        </transition>
        <FormItem label="图片"
                  prop="cover">
          <Input v-model="addModal.data.cover"></Input>
        </FormItem>
        <transition name="fade">
          <FormItem label="图片预览"
                    v-if="addModal.data.cover">
            <div class="img_previewer">
              <img :src="addModal.data.cover"
                   alt="">
            </div>
          </FormItem>
        </transition>
      </Form>
    </Modal>

    <Modal v-model="modifyModal.shown"
           :loading="modifyModal.loading"
           @on-ok="modify">
      <div class="modify_form_header"
           slot="header">
        <p>
          <span>修改【</span>
          <span style="color: red;"
                v-text="modifyModal.data.title"></span>
          <span>】</span>
        </p>
      </div>
      <Form :model="modifyModal.data"
            :label-width="80"
            ref="formModify"
            :rules="rules">
        <FormItem label="标题"
                  prop="title">
          <Input v-model="modifyModal.data.title"></Input>
        </FormItem>
        <FormItem label="类型">
          <Select v-model="modifyModal.data.type">
            <Option v-for="(item, index) in allTypes"
                    :key="index"
                    :value="item.value"
                    :label="item.label">
              <span>{{item.label}}</span>
              <span v-if="item.value == 'tag'"
                    style="float:right;color:#ccc">用【标题】作为关键词搜索，请认真填写【标题】</span>
              <span v-if="item.value == 'url'"
                    style="float:right;color:#ccc">跳转到【跳转链接】</span>
            </Option>
          </Select>
        </FormItem>
        <transition name="fade">
          <FormItem label="跳转链接"
                    prop="url"
                    v-if="modifyModal.data.type == 'url'">
            <Input v-model="modifyModal.data.url"></Input>
          </FormItem>
        </transition>
        <!-- <FormItem label="跳转链接"
                  prop="url">
          <Input v-model="modifyModal.data.url"></Input>
        </FormItem> -->
        <FormItem label="图片"
                  prop="cover">
          <Input v-model="modifyModal.data.cover"></Input>
        </FormItem>
        <transition name="fade">
          <FormItem label="图片预览"
                    v-if="modifyModal.data.cover">
            <div class="img_previewer">
              <img :src="modifyModal.data.cover"
                   alt="">
            </div>
          </FormItem>
        </transition>
      </Form>
    </Modal>
  </div>
</template>

<script>
// import { Button, Icon, Row, Col, Tooltip, Poptip, Modal, Form, FormItem, Input } from 'view-design'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('../../store/modules')
export default {
  name: 'ModuleBanner',
  components: {
    // Button, Icon, Row, Col, Tooltip, Poptip, Modal, Form, FormItem, Input
  },
  data () {
    return {
      list: [],
      pageIndex: 1,
      pageSize: 20,
      addModal: {
        shown: false,
        loading: true,
        data: {
          title: '',
          cover: '',
          url: '',
          type: 'tag'
        }
      },
      modifyModal: {
        shown: false,
        loading: true,
        activeIndex: -1,
        data: {
          title: '',
          cover: '',
          url: '',
          type: 'tag'
        }
      },
      allTypes: [
        {
          label: '标签',
          value: 'tag'
        },
        {
          label: 'URL',
          value: 'url'
        }
      ],
      rules: {
        title: [
          {
            required: true,
            message: '标题不能为空',
            trigger: 'blur'
          }
        ],
        url: [
          {
            required: true,
            message: '跳转链接不能为空',
            trigger: 'blur'
          }
        ],
        cover: [
          {
            required: true,
            message: '图片不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    store () {
      return this.$store
    },
    state () {
      return this.store.state
    }
  },
  created () {
    this.init()
  },
  methods: {
    ...mapActions([
      'moduleBanner'
    ]),
    requestList () {
      return new Promise(async (resolve) => {
        let res = await this.store.dispatch('moduleBanner/list', {})
        resolve(res)
      })
    },
    requestAdd (data) {
      return new Promise(async (resolve) => {
        let res = await this.store.dispatch('moduleBanner/add', data)
        resolve(res)
      })
    },
    requestModify (data) {
      return new Promise(async (resolve) => {
        let res = await this.store.dispatch('moduleBanner/modify', data)
        resolve(res)
      })
    },
    requestDel (data) {
      return new Promise(async (resolve) => {
        let res = await this.store.dispatch('moduleBanner/del', data)
        resolve(res)
      })
    },
    async init () {
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
    },
    openAddModal () {
      this.addModal.shown = true
    },
    openModifyModal (item, index) {
      this.modifyModal.data = item
      this.modifyModal.activeIndex = Number(index)
      this.modifyModal.shown = true
    },
    add () {
      this.addModal.loading = false
      this.$refs.formAdd.validate(async (valid) => {
        if (valid) {
          let response = await this.requestAdd(this.addModal.data)
          if (response.status === 200) {
            // 新增成功
            this.$Message.success('新增成功')
            response.data && this.list.unshift(response.data)
            this.addModal.shown = false
          } else {
            this.$nextTick(() => {
              this.addModal.loading = true
            })
            this.$Message.error(response.message || '新增失败，请稍后再试')
          }
        } else {
          this.$nextTick(() => {
            this.addModal.loading = true
          })
          this.$Message.error('新增失败，请稍后再试');
        }
      })
    },
    modify () {
      this.modifyModal.loading = false
      this.$refs.formModify.validate(async (valid) => {
        if (valid) {
          let response = await this.requestModify(this.modifyModal.data)
          if (response.status === 200) {
            // 新增成功
            this.$Message.success('修改成功')
            this.modifyModal.shown = false
          } else {
            this.$nextTick(() => {
              this.modifyModal.loading = true
            })
            this.$Message.error(response.message || '修改失败，请稍后再试')
          }
        } else {
          this.$nextTick(() => {
            this.modifyModal.loading = true
          })
          this.$Message.error('修改失败，请稍后再试');
        }
      })
    },
    async del (item, index) {
      let response = await this.requestDel(item)
      if (response.status === 200) {
        // 新增成功
        this.$Message.success('删除成功')
        this.list.splice(Number(index), 1)
      } else {
        this.$nextTick(() => {
          this.modifyModal.loading = true
        })
        this.$Message.error(response.message || '修改失败，请稍后再试')
      }
    }
  },
  directives: {
    limitHeight: {
      inserted (el) {
        el.style.height = el.getBoundingClientRect().width + 'px'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.module_container {
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
    position: relative;
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    // height: 2000px;
    // display: flex;
    // flex-direction: row;
    // align-items: flex-end;
    &_blank {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      color: #888;
    }
    &_item {
      padding: 10px;
      box-sizing: border-box;
      &_inner {
        position: relative;
        border-radius: 3px;
        overflow: hidden;
        box-shadow: 0 0 15px 1px #c8c8c8;
        cursor: pointer;
        background-color: #fff;
        padding-bottom: 32px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease-in-out;
        img {
          max-width: 100%;
          max-height: 100%;
        }
        &_desc {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 32px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          color: #888;
          background-color: #f8f8f8;
        }
        &_status {
          position: absolute;
          right: 8px;
          top: 8px;
          z-index: 2;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: green;
        }
        &_edit {
          position: absolute;
          left: 0;
          top: 0;
          // z-index: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
          opacity: 0;
          transition: all 0.2s ease-in-out;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          .edit_item {
            width: 48px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
          }
        }
        &:hover {
          box-shadow: 0 0 15px 1px #888;
          .module_container_content_item_inner_edit {
            opacity: 1;
            // z-index: 3;
          }
        }
      }
    }
  }
}
.img_previewer {
  width: 360px;
  height: 300px;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>