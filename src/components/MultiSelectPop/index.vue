<template>
  <div>
    <el-dialog
      :visible="true"
      :width="width"
      top="176px"
      :before-close="popClose"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="multiSelectPop-title flex">
        <div>负责人</div>
        <div class="flex">
          <div>{{ filterList.length || 0 }}人</div>
          <div v-if="isSearch">(已选{{ selectList.length || 0 }}人)</div>
        </div>
      </div>
      <div class="multiSelectPop-header flex" v-if="isSearch">
        <div class="multiSelectPop-header__search flex">
          <el-input placeholder="请输入关键词" v-model.trim="searchName"></el-input>
          <img src="../../assets/icon/icon-search.svg" alt="" class="icon-search cursor" />
        </div>
        <div class="small-btn__green" @click="confirm">确定</div>
      </div>
      <main class="multiSelectPop-container flex">
        <div
          class="multiSelectPop-container__list flex"
          v-for="(item, index) in filterList"
          :key="index"
          @click="selectItem(item)"
        >
          <img class="multiSelectPop-container__avator" :src="item.avatar" alt="" v-if="item.avatar" />
          <div class="multiSelectPop-container__avator" v-else>
            {{ item.realName | getName }}
          </div>
          <div class="multiSelectPop-container__name flex">
            <div
              v-for="(item2, index2) in item.realName"
              :key="index2"
              :class="searchName.includes(item2) ? 'multiSelectPop-container__name--active' : ''"
            >
              {{ item2 }}
            </div>
          </div>
          <img
            v-if="item.isChange"
            src="../../assets/icon/icon_duoxuan.png"
            alt=""
            class="multiSelectPop-container__select"
          />
        </div>
      </main>
    </el-dialog>
  </div>
</template>

<script>
import { DemandContrl } from '../../modules/demand/management/indexContrl'
import { cloneDeep } from 'lodash'
export default {
  props: {
    width: {
      type: String,
      default: '800px',
    },
    selectData: {
      type: Array,
      default: () => {
        return []
      },
    },
    maxLength: {
      type: Number,
      default: null,
    },
    data: {
      type: Array,
      default: () => {
        return []
      },
    },
    executorType: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      searchName: '',
      list: [],
      selectList: [],
    }
  },
  filters: {
    getName(val) {
      return val.substring(val.length - 2, val.length)
    },
  },
  created() {
    this.selectList = cloneDeep(this.selectData)
    if (this.data && this.data.length > 0) {
      this.list = this.selectAssign(this.data)
    } else {
      this.getList()
    }
  },
  computed: {
    filterList() {
      return (this.list || []).filter(val => (val.realName || '').includes(this.searchName))
    },
    // 是否可多选加搜索
    isSearch() {
      return !(this.data && this.data.length > 0)
    },
  },
  methods: {
    async getList() {
      const { resultList } = await DemandContrl.getProductOwerRequest({
        executorType: this.executorType,
      })
      this.list = this.selectAssign(resultList || [])
    },
    // 选中赋值
    selectAssign(resultList) {
      let list = resultList.map(val => {
        return {
          ...val,
          isChange: this.selectList.some(val2 => val2.id === val.id),
        }
      })
      return list
    },
    confirm() {
      this.$emit('confirm', this.selectList)
    },
    popClose() {
      this.$emit('close', '')
    },
    selectItem(item) {
      if (!this.isSearch) return
      let index = (this.selectList || []).findIndex(val => val.id === item.id)

      if (index > -1) {
        this.$set(item, 'isChange', false)
        this.selectList.splice(index, 1)
      } else if (!(this.maxLength && this.selectList.length >= this.maxLength)) {
        this.$set(item, 'isChange', true)
        this.selectList.push(item)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
