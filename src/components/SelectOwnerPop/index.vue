<!--
 * @Author: wy
 * @LastEditors: Please set LastEditors
 * @Description: 弹窗--选择人员
-->
<template>
  <div>
    <el-dialog
      :visible.sync="isShow"
      :width="width"
      top="176px"
      :before-close="popClose"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <header class="owner-header flex">
        <div class="owner-header__search flex">
          <el-input placeholder="请输入负责人姓名" @input="inputName" v-model="searchName"></el-input>
          <img src="../../assets/icon/icon-search.svg" alt="" class="icon-search cursor" />
        </div>
        <div class="small-btn__green" @click="confirm()">确定</div>
      </header>
      <main class="owner-container">
        <ul>
          <li
            v-for="(item, index) in list"
            :key="index"
            class="owner-container__item flex"
            @click="selectPerson(item, index)"
          >
            <img class="owner-container__item--headImg" v-if="item.avatar" :src="item.avatar" alt="" />
            <p v-else>{{ item.nameText }}</p>
            <h2 class="f-w-400 c-666" v-html="item.realName"></h2>
            <img
              class="owner-container__item--radio"
              :src="
                item.isChecked
                  ? require('../../assets/icon/icon-radio-active.png')
                  : require('../../assets/icon/icon-radio.png')
              "
              alt=""
            />
          </li>
        </ul>
      </main>
    </el-dialog>
  </div>
</template>

<script>
import { DemandContrl } from '../../modules/demand/management/indexContrl'
export default {
  name: 'SelectOwnerPop',
  props: {
    width: {
      type: String,
      default: '800px',
    },
    nameId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isShow: false,
      searchName: '',
      checkedNameId: '',
      checkedName: '',
      list: [],
      copyList: [],
    }
  },
  methods: {
    show() {
      console.log('弹窗被激活')
      this.isShow = true
      this.getListReuqest()
    },
    inputName() {
      if (this.searchName && this.searchName.trim()) {
        this.updateBackupProductOwnerList('inputPersonName')
        this.list = this.changeColor(this.copyList.filter(item => item.originalName.includes(this.searchName)))
        return
      }
      this.copyList.forEach(item => (item.realName = item.originalName))
      this.list = this.copyList
      console.log('清空输入框时=====》', this.list)
      return
    },
    changeColor(array) {
      console.log('输入---->', this.searchName)
      array.map((item, index) => {
        let reg = new RegExp(this.searchName, 'g')
        let replaceStr = '<span class="c-2ca7b3">' + this.searchName + '</span>'
        array[index].realName = item.originalName.replace(reg, replaceStr)
      })
      console.log('改后的array', array)
      return array
    },
    updateBackupProductOwnerList(inputPersonName = '') {
      this.list.forEach(item => {
        this.copyList.forEach(el => {
          if (inputPersonName) {
            item.realName === el.realName && item.isChecked && (el.isChecked = true)
            return
          }
          if (item.realName === el.realName && item.isChecked) {
            el.isChecked = true
          } else {
            el.isChecked = false
          }
        })
      })
    },
    selectPerson(current, idx) {
      console.log('用户选择的=====》', current)
      this.updateBackupProductOwnerList()
      this.list.forEach((item, index) => {
        if (item.realName === current.realName) {
          item.isChecked = true
          return
        }
        item.isChecked = false
      })
      console.log('选择的======>', this.list)

      console.log('原装的======>', this.copyList)
    },
    confirm() {
      if (!this.list.some(item => item.isChecked)) return this.$warnToast('请选择一位产品负责人')
      this.checkedNameId = this.list.filter(item => item.isChecked)[0].id
      this.checkedName = this.list.filter(item => item.isChecked)[0].originalName
      this.isShow = false
      this.$emit('productOwner', this.checkedNameId, this.checkedName)
      this.list = []
      this.copyList = []
    },
    popClose() {
      this.isShow = false
      this.list = []
      this.copyList = []
    },
    async getListReuqest() {
      const { resultList } = await DemandContrl.getProductOwerRequest()
      resultList.forEach(item => {
        this.nameId === item.id ? (item.isChecked = true) : (item.isChecked = false)
        item.originalName = item.realName
        if (item.realName.length >= 3) {
          return (item.nameText = item.realName.substr(item.realName.length - 2, item.realName.length - 1))
        }
        return (item.nameText = item.realName)
      })
      this.list = resultList
      this.copyList = JSON.parse(JSON.stringify(resultList))
    },
  },
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
