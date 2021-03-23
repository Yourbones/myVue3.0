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
      <div class="demandPop-header flex">
        <div class="demandPop-header__search flex">
          <el-input placeholder="请输入关键词" v-model.trim="searchName"></el-input>
          <img src="../../assets/icon/icon-search.svg" alt="" class="icon-search cursor" />
        </div>
        <div class="small-btn__green" @click="confirm">确定</div>
      </div>
      <main class="demandPop-container">
        <div
          class="demandPop-container__list flex"
          v-for="(item, index) in filterList"
          :key="index"
          @click="selectItem(item)"
        >
          <div class="flex">
            <div style="margin-right: 10px">{{ item.code }}</div>
            <div
              v-for="(item2, index2) in item.title"
              :key="index2"
              :class="searchName.includes(item2) ? 'demandPop-container__name--active' : ''"
            >
              {{ item2 }}
            </div>
          </div>
          <img
            class="demandPop-container__change"
            v-if="item.isChange"
            src="../../assets/icon/icon_duoxuan2.png"
            alt=""
          />
          <img
            class="demandPop-container__change"
            v-else
            src="../../assets/icon/icon_noduoxuan.png"
            alt=""
          />
        </div>
      </main>
    </el-dialog>
  </div>
</template>

<script>
  import MineContrl from '../../modules/demand/mine/mineContrl'
  import { cloneDeep } from 'lodash'

  export default {
    props: {
      width: {
        type: String,
        default: '800px'
      },
      selectData: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data() {
      return {
        searchName: '',
        list: [],
        selectList: []
      }
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
        return (this.list || []).filter((val) => val.title.includes(this.searchName))
      }
    },
    methods: {
      async getList() {
        const { list } = await MineContrl.getListRequest({
          state: 0,
          selectUser: true
        })
        this.list = this.selectAssign(list || [])
      },
      // 选中赋值
      selectAssign(resultList) {
        let list = resultList.map((val) => {
          return {
            ...val,
            isChange: this.selectList.some((val2) => val2.id === val.id)
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
        let index = (this.selectList || []).findIndex((val) => val.id === item.id)

        if (index > -1) {
          this.$set(item, 'isChange', false)
          this.selectList.splice(index, 1)
        } else {
          this.$set(item, 'isChange', true)
          this.selectList.push(item)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
