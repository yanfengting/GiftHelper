<template>
  <transition name="slide">
    <div class="order">
      <head-bar :title="title"></head-bar>
      <div class="address"
           @click="goAddressList"
           :editable="false">
        <div class="next-icon"
             v-if="hasDefaultAddress">
          <van-icon name="arrow" />
        </div>
        <div class="address-item">
          <div address="address-top">
            <van-icon name="location" />
            <span class="user-info">{{hasDefaultAddress?defaultAddress.Name:'添加收货地址'}}</span>
            <span class="phonenum"
                  v-if="hasDefaultAddress">{{defaultAddress.Phonenum}}</span>
          </div>
          <div class="address-bottom"
               v-if="hasDefaultAddress">
            <div class="address-info">{{defaultAddress.Address}}{{defaultAddress.AddressDetail}}</div>
          </div>
        </div>
      </div>
      <van-panel title="商品"
                 v-for="item in orderGoodList"
                 :key="item.id"
                 class="allGood">
        <div class="allGood-item">
          <van-card :title="item.name"
                    :desc="item.short_description"
                    :num="item.productNum"
                    :price="item.price"
                    :thumb="item.cover_image_url" />
          <van-cell-group>
            <van-cell title="配送方式"
                      :value="'免运费'" />
            <van-field v-model="item.message"
                       label="留言"
                       placeholder="点击给买家留言" />
            <van-cell title="合计"
                      style="color:#f44"
                      :value="'￥'+formatPrice(item.price*item.productNum)" />
          </van-cell-group>
        </div>
      </van-panel>
      <van-cell-group class="cell">
        <van-cell title="优惠券码"
                  is-link
                  value="使用优惠券" />
      </van-cell-group>
      <van-cell-group class="cell">
        <van-switch-cell v-model="checked"
                         title="短信通知收件人" />
      </van-cell-group>
      <div class="order-footer">购物愉快~</div>
      <van-submit-bar :price="totalMoney"
                      button-text="结算"
                      @submit="onSubmit" />
    </div>
  </transition>
</template>

<script>
import headBar from '../components/common/head-bar.vue'
import { mapGetters, mapMutations } from 'vuex'
import { Dialog, Toast, Field, Icon, Card, SubmitBar, Cell, SwitchCell, CellGroup, Panel } from 'vant'

// import store from '@/vuex/store'
// import { mapState } from 'vuex'
// import {eventBus} from '../../assets/js/eventBus'

export default {
  data () {
    return {
      title: '提交订单',
      checked: true,
      addressList: [],
      hasDefaultAddress: false,
      defaultAddress: {}
    }
  },
  components: {
    headBar,
    [Toast.name]: Toast,
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Card.name]: Card,
    [SubmitBar.name]: SubmitBar,
    [Cell.name]: Cell,
    [SwitchCell.name]: SwitchCell,
    [CellGroup.name]: CellGroup,
    [Panel.name]: Panel,
    [Dialog.name]: Dialog
  },

  computed: {
    orderGoodList () {
      this.orderGood.forEach(item => {
        item.message = ''
      })
      return this.orderGood
    },
    totalMoney () {
      var total = 0
      this.orderGoodList.forEach(item => {
        total += item.price * item.productNum
      })
      return total * 100
    },
    ...mapGetters(['orderGood', 'addressId'])
  },
  created () {
    console.log(this.orderGood)
    if (!this.orderGood.length) {
      this.$router.push('/')
    } else {
      this.axios.get('/users/addressList').then((res) => {
        console.log(res.data.result)
        this.addressList = res.data.result
        if (this.addressId) {
          res.data.result.forEach(item => {
            if (item.Addressid === this.addressId) {
              this.defaultAddress = item
              this.hasDefaultAddress = true
            }
          })
        } else {
          res.data.result.forEach(item => {
            if (item.Isdefault === 1) {
              this.defaultAddress = item
              this.hasDefaultAddress = true
            }
          })
        }
      }, function (err) {
        console.log(err)
      })
    }
  },
  methods: {
    onSubmit () {
      console.log('this.orderGood')
      console.log(this.orderGood)
      if (this.hasDefaultAddress) {
        localStorage.setItem('orderGood', JSON.stringify(this.orderGood))
        var idStr = ''
        var countStr = ''
        var idArr = []
        var countArr = []
        for (let i = 0; i < this.orderGood.length; i++) {
          idArr.push(this.orderGood[i].id)
          countArr.push(this.orderGood[0].productNum)
        }
        idStr = idArr.toString()
        countStr = countArr.toString()
        let obj = {
          goodId: idStr,
          productNum: countStr,
          Addressid: this.defaultAddress.Addressid,
          totalMoney: this.totalMoney / 100
        }
        console.log(obj)
        this.axios.post('/users/commitOrder', obj).then((res) => {
          // this.axios.post('/users/Order', this.orderGood).then((res) => {
          console.log(res)
          setTimeout(() => {
            this.$router.push('/OrderList')
          }, 500)
        })
        this.axios.post('/users/cartDel', { id: idStr }).then((res) => {
          console.log(res)
        })
      } else {
        Dialog.alert({
          message: '请选择一个收货地址'
        }).then(() => {
          // on close
        })
      }
    },
    formatPrice (price) {
      return price.toFixed(2)
    },
    goAddressList () {
      this.setAddressList(this.addressList)
      this.$router.push('/address')
    },
    goBack () {
      this.$router.go(-1)
    },
    ...mapMutations({
      setAddressList: 'SET_ADDRESSLIST_MUTATION'
    })
  }
}
</script>

<style lang="stylus" scoped>
.order
  background-color #faf4f4
.address
  padding-top 10px
  position relative
  background-color #fff
  &::after
    content ''
    display block
    height 2px
    background -webkit-repeating-linear-gradient(135deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #3283fa 0, #3283fa 45%, transparent 0, transparent 50%)
    background repeating-linear-gradient(-45deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #3283fa 0, #3283fa 45%, transparent 0, transparent 50%)
    background-size 80px
  .address-item
    padding 15px 10px
    .user-info
      margin-left 10px
      font-weight bold
    .phonenum
      float right
      margin-right 20px
    .address-bottom
      margin-top 6px
      .address-info
        font-size 14px
        margin-left 24px
        margin-right 20px
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
  .next-icon
    position absolute
    right 10px
    top 76px
    i
      font-weight bold
      color #888
.allGood
  margin-top 14px
.cell
  margin-top 10px
.order-footer
  height 120px
  margin-top 10px
  text-align center
  font-size 14px
.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  opacity 0
  transform translate3d(100%, 0, 0)
</style>
