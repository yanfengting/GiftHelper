<template>
  <div class="list">
    <!--增加一个标题栏-->
    <head-bar :title="title"></head-bar>
    <van-address-edit :area-list="areaList"
                      show-postal
                      :show-delete="isShowDeleteBtn"
                      show-set-default
                      :address-info="addressInfo"
                      @save="onSave"
                      @delete="onDelete" />
  </div>
</template>

<script>
import headBar from '../components/common/head-bar.vue'
import areaList from '@/assets/js/area'
import { AddressEdit } from 'vant'
import { mapMutations } from 'vuex'
export default {
  components: {
    [AddressEdit.name]: AddressEdit,
    headBar
  },
  data () {
    return {
      msg: 'vuex 使用实例',
      title: '地址编辑',
      areaList,
      queryIdx: '',
      addressInfo: {},
      isShowDeleteBtn: false
    }
  },
  created () {
    if (this.$route.query.idx >= 0) {
      this.queryIdx = this.$route.query.idx
      this.addressInfo = this.$store.state.address[this.$route.query.idx]
      this.isShowDeleteBtn = true
    }
  },
  methods: {
    onSave (e) {
      let data = {}
      data.name = e.name
      data.tel = e.tel
      data.address = e.province + e.city + e.county + e.addressDetail + ''
      data.addressDetail = e.addressDetail
      data.areaCode = e.areaCode
      data.postalCode = e.postalCode
      data.isDefault = e.isDefault
      console.log(data)
      let obj = {
        'Name': e.name, // 收货人
        'Phonenum': e.tel, // 电话
        'Address': e.province + e.city + e.county + e.addressDetail + '', // 收货地址
        'AddressDetail': e.addressDetail, // 详细地址
        'PostalCode': e.postalCode, // 邮政编码
        'Isdefault': e.isDefault // 是否默认
      }
      if (this.queryIdx !== '') {
        this.editAddress({ data: data, idx: this.queryIdx })
      } else {
        this.saveAddress(data)
      }
      this.axios.post('/users/addressList', obj).then((res) => {
        console.log(res)
        // console.log(res.data.goods[0].data.items)
        // this.bangdata = res.data.goods
      }, function (err) {
        console.log(err)
      })
      this.$router.push({
        path: '/address'
      })
    },
    onDelete (e) {
      this.removeAddress(this.idx)
      this.$router.push({
        path: '/address'
      })
    },
    ...mapMutations(['saveAddress', 'removeAddress', 'editAddress'])
  }
}
</script>
<style  scoped>
</style>
