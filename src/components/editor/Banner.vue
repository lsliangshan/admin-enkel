<template>
  <div class="editor_container"
       ref="container">
    <div class="editor_container_header">
      <Button type="primary"
              @click="openMaterialDrawer">新增</Button>
    </div>
    <div class="editor_container_content">
      <!-- <Table class="entrance_table"
             :loading="loading"
             :stripe="true"
             border
             :height="containerHeight"
             :data="list"
             :columns="columns"></Table> -->
      <div class="editor_container_content_left">
        <div class="list-group-header"
             slot="header">
          <Button type="warning"
                  size="small"
                  style="margin-right: 5px;"
                  @click="resetList">重置</Button>
          <Button type="primary"
                  size="small"
                  @click="save">确定</Button>
        </div>
        <draggable element="span"
                   v-model="list2"
                   v-bind="dragOptions"
                   :move="onMove">
          <transition-group name="no"
                            class="list-group"
                            tag="div">
            <div class="list-group-item"
                 v-for="(item, index) in list2"
                 :key="item.uuid"
                 :class="{'disabled': !item.status}">
              <!-- <i :class="!item.status? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'"
                 @click=" item.status=!item.status"
                 aria-hidden="true"></i>
              {{item.enkel_banner.title}} -->
              <div class="list-group-item-img">
                <img :src="item.enkel_banner.cover"
                     :alt="item.enkel_banner.title">
              </div>
              <div class="list-group-item-desc">{{item.enkel_banner.title}}</div>
              <div class="list-group-item-header">{{index + 1}}</div>
            </div>
          </transition-group>
        </draggable>

      </div>
      <div class="editor_container_content_right">
        <div class="list-group-header"
             slot="header">
          <Select v-model="sortBy"
                  style="width: 150px"
                  @on-change="sortList">
            <Option v-for="item in sorts"
                    :value="item.value"
                    :key="item.value">{{ item.name }}</Option>
          </Select>
        </div>
        <draggable element="span"
                   v-model="list"
                   v-bind="dragOptions"
                   :move="onMove"
                   @start="isDragging=true"
                   @end="isDragging=false">
          <transition-group type="transition"
                            :name="'flip-list'"
                            class="list-group"
                            tag="div">
            <div class="list-group-item"
                 v-for="(item, index) in list"
                 :key="item.uuid"
                 :class="{'disabled': !item.status}">
              <div class="list-group-item-img">
                <img :src="item.enkel_banner.cover"
                     :alt="item.enkel_banner.title">
              </div>
              <div class="list-group-item-desc">{{item.enkel_banner.title}}</div>
              <div class="list-group-item-status">
                <i-switch size="small"
                          style="outline: none;"
                          true-color="#13ce66"
                          false-color="#ff4949"
                          :value="item.status"
                          :true-value="true"
                          :false-value="false"
                          @on-change="status => {changeStatus(status, item.uuid, index)}" />
              </div>

              <div class="list-group-item-delete">
                <Poptip confirm
                        transfer
                        title="删除后将无法恢复，确认吗？"
                        @on-ok="deleteItem(item.uuid, index)">
                  <Icon type="md-trash"
                        size="18"
                        color="#ff4949" />
                </Poptip>
              </div>

            </div>
          </transition-group>
        </draggable>
      </div>
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
        <div class="material_item_blank"></div>
      </div>
    </Drawer>

  </div>
</template>

<script>
// import { Button, Icon, Drawer, Table, Switch, Modal, Input, Form, FormItem } from 'view-design'
import qs from "querystring"
import draggable from 'vuedraggable'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('../../store/modules')
export default {
  name: 'EditorBanner',
  components: {
    // Button, Icon, Drawer, Table, Modal, Input, Form, FormItem,
    // Switch
    draggable
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
      list2: [],
      cachedSortedList: [],
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
      },
      editable: true,
      isDragging: false,
      delayedDragging: false,
      sortBy: 'timeDesc',
      sorts: [
        {
          name: '按时间降序',
          value: 'timeDesc'
        },
        {
          name: '按时间升序',
          value: 'timeAsc'
        },
        {
          name: '可用优先',
          value: 'statusTrue'
        },
        {
          name: '不可用优先',
          value: 'statusFalse'
        }
      ]
    }
  },
  computed: {
    store () {
      return this.$store
    },
    state () {
      return this.store.state
    },
    dragOptions () {
      return {
        animation: 0,
        group: "description",
        disabled: !this.editable,
        ghostClass: "ghost"
      };
    },
  },
  created () {
    this.initSortedList()
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
    requestSortedList () {
      return new Promise(async (resolve) => {
        let res = await this.store.dispatch('editorBanner/sortedlist')
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
    requestSave (data) {
      return new Promise(async (resolve) => {
        let res = await this.store.dispatch('editorBanner/save', data)
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
    async initSortedList () {
      let response = await this.requestSortedList()
      if (response.status == 200) {
        this.list2 = response.data.list || []
        this.cachedSortedList = response.data.list || []
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
    },
    onMove ({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      // return (
      //   (!relatedElement || relatedElement.status) && draggedElement.status
      // );
      return draggedElement.status
    },
    sortList () {
      this.list.sort((item1, item2) => {
        if (this.sortBy === 'timeDesc') {
          if (Number(item1.updateTime) < Number(item2.updateTime)) {
            return 1
          } else {
            return -1
          }
        } else if (this.sortBy === 'timeAsc') {
          if (Number(item1.updateTime) > Number(item2.updateTime)) {
            return 1
          } else {
            return -1
          }
        } else if (this.sortBy === 'statusTrue') {
          if (!item1.status && item2.status) {
            return 1
          } else {
            return -1
          }
        } else if (this.sortBy === 'statusFalse') {
          if (item1.status && !item2.status) {
            return 1
          } else {
            return -1
          }
        } else {
          return -1
        }
      })
    },
    resetList () {
      this.list = this.list.concat(this.list2)
      this.list2 = []
    },
    async changeStatus (status, uuid, index) {
      this.list[index].status = status
      let response = await this.requestModify({
        uuid: uuid,
        status: status
      })
      if (response.status !== 200) {
        setTimeout(() => {
          this.list[index].status = !status
        }, 500)
      }
    },
    async deleteItem (uuid, index) {
      let response = await this.requestDel({
        uuid: uuid
      })
      if (response.status === 200) {
        // 删除成功
        this.list.splice(index, 1)
        this.$Message.success('删除成功')
      } else {
        this.$Message.error('删除失败')
      }
    },
    async save () {
      let _list = JSON.parse(JSON.stringify(this.list2))
      _list = _list.map((item, index) => Object.assign({}, item, {
        sort: index
      }))
      let response = await this.requestSave({
        list: JSON.stringify(_list)
      })
      if (response.status === 200) {
        this.$Message.success('保存成功')
      } else {
        this.$Message.error('保存失败')
      }
    }
  },
  watch: {
    isDragging (newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      });
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
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    &_left {
      width: 280px;
      height: 100%;
      overflow-y: auto;
      background-color: #f0f0f0;
      .list-group {
        min-height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        &-header {
          position: sticky;
          top: 0;
          left: 0;
          z-index: 2;
          padding-left: 15px;
          width: 100%;
          height: 48px;
          display: flex;
          flex-direction: row;
          align-items: center;
          background-color: #f0f0f0;
        }
        &-item {
          position: relative;
          cursor: move;
          margin: 8px;
          width: 150px;
          height: 182px;
          border-radius: 4px;
          overflow: hidden;
          background-color: #fff;
          box-shadow: 0 0 15px 1px #c8c8c8;
          // opacity: 1;
          transition: all 0.25s cubic-bezier(0.215, 1.61, 0.355, 1);
          transform: scale3d(1, 1, 1);
          &.disabled {
            opacity: 0.3;
          }
          &-img {
            width: 150px;
            height: 150px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            img {
              max-width: 100%;
              max-height: 100%;
            }
          }
          &-desc {
            width: 100%;
            height: 32px;
            padding: 0 8px;
            box-sizing: border-box;
            line-height: 32px;
            text-align: center;
            font-size: 13px;
            color: #888;
            background-color: #f8f8f8;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          &-header {
            position: absolute;
            width: 100%;
            height: 20px;
            left: 0;
            top: 0;
            padding: 0 5px;
            box-sizing: border-box;
            font-size: 13px;
            color: #000;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
          }
        }
      }
    }
    &_right {
      width: calc(~"100% - 280px");
      height: 100%;
      overflow-y: auto;
      // background-color: #8c8c8c;
      .list-group {
        min-height: 182px;
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        padding: 10px;
        box-sizing: border-box;
        &-item {
          position: relative;
          cursor: move;
          margin: 8px;
          width: 150px;
          height: 182px;
          border-radius: 4px;
          overflow: hidden;
          background-color: #fff;
          box-shadow: 0 0 15px 1px #c8c8c8;
          // opacity: 1;
          transition: all 0.5s ease-in-out;
          // transition: all 0.5s cubic-bezier(0.215, 1.61, 0.355, 1);
          transform: scale3d(1, 1, 1);
          &.disabled {
            opacity: 0.3;
          }
          &-img {
            width: 150px;
            height: 150px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            img {
              max-width: 100%;
              max-height: 100%;
            }
          }
          &-desc {
            width: 100%;
            height: 32px;
            padding: 0 8px;
            box-sizing: border-box;
            line-height: 32px;
            text-align: center;
            font-size: 13px;
            color: #888;
            background-color: #f8f8f8;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          &-status {
            position: absolute;
            right: 4px;
            top: 4px;
            width: 30px;
            height: 20px;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: flex-end;
          }
          &-delete {
            position: absolute;
            left: 4px;
            top: 4px;
            width: 30px;
            height: 20px;
            z-index: 3;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: flex-start;
          }
        }
        &-header {
          position: sticky;
          top: 0;
          left: 0;
          z-index: 2;
          padding-left: 15px;
          width: 100%;
          height: 48px;
          display: flex;
          flex-direction: row;
          align-items: center;
          background-color: #f5f7f9;
        }
      }
    }
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
    width: 120px;
    height: 0;
  }
}

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  transform: scale3d(0.8, 0.8, 1) !important;
  // background: #c8ebfb;
}
// .list-group {
//   // min-height: 20px;
//   width: 100%;
//   height: 100%;
//   padding: 10px;
//   box-sizing: border-box;
//   span {
//     display: flex;
//     flex-direction: row;
//     flex-wrap: wrap;
//   }
// }
// .list-group-item {
//   cursor: move;
//   margin: 8px;
//   width: 150px;
//   height: 182px;
//   background-color: lightcyan;
// }
// .list-group-item i {
//   cursor: pointer;
// }
</style>