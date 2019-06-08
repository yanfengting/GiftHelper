<template>
  <div class="orderlist">
    <head-bar :title="title"></head-bar>
    <div class="list-box">
      <van-panel title="订单"
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
            <van-cell title="合计"
                      style="color:#f44"
                      :value="'￥'+formatPrice(item.price*item.productNum)" />
          </van-cell-group>
        </div>
      </van-panel>
    </div>

    <div class="order-footer"
         v-if="orderList.length>3">到底了~</div>

    <div class="btn">
      <router-link to="/">
        <van-button style="width:100%">返回首页</van-button>
      </router-link>
    </div>

  </div>
</template>

<script>
import headBar from '../components/common/head-bar.vue'
import { mapGetters, mapMutations } from 'vuex'
import { Button, Dialog, Toast, Field, Icon, Card, SubmitBar, Cell, SwitchCell, CellGroup, Panel } from 'vant'

// import { getOrder, getGoodById } from '@/api/api'
export default {
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
    [Dialog.name]: Dialog,
    [Button.name]: Button
  },
  data () {
    return {
      orderList: [],
      title: '订单列表'
    }
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
    this.init()
    // var orderGoods = localStorage.getItem('orderGoods')
    // this.orderList = orderGoods
    // console.log(this.orderList)
    // this.axios.get('/users/orderList').then((response) => {
    //     let res = response.data
    //     // 这里什么样的情况就是登出呢？查看cookie没有了
    //     // eslint-disable-next-line eqeqeq
    //     if (res.status == '0') {
    //       console.log(res)
    //       this.orderList = res.result
    //     }
    //   })
    /*
    getOrder()
      .then(async result => {
        for (let i = 0; i < result.data.length; i++) {
          // substring 用于提取字符串中介于两个指定下标之间的字符
          var idArr = result.data[i].Goodid.substring(1, result.data[i].Goodid.length - 1).split(',')
          var countArr = result.data[i].Ordercount.substring(1, result.data[i].Ordercount.length - 1).split(',')
          //
          idArr = idArr.map(item => {
            return parseInt(item)
          })
          countArr = countArr.map(item => {
            return parseInt(item)
          })
          var mapped = {}
          for (let j = 0; j < idArr.length; j++) {
            mapped[idArr[j]] = countArr[j]
          }
          let { data } = await getGoodById({
            goodId: idArr
          })
          for (let k = 0; k < data.length; k++) {
            data[k].orderCount = mapped[data[k].Goodid]
          }
          result.data[i].goods = data
        }
        this.orderList = result.data.reverse()
        console.log(this.orderList)
      }) */
  },
  methods: {
    init () {
      this.axios.get('/users/orderList').then((response) => { // 订单确认列表不需要再写接口，直接用购物车列表的接口，渲染页面时选取选中的商品作为订单确认的商品
        let res = response.data
        this.orderList = res.result
        console.log(res)
        // this.orderList.forEach((item) => { // 遍历购物车商品，获取选中商品的总金额
        // })

        // this.orderTotal = this.subTotal + this.shipping - this.discount + this.tax // 获取用户最终支付的金额，(总金额+配送费-折扣+税费)
      })
    },
    goBack () {
      this.$router.push('/')
    },
    goGood (item) {
      this.setGood(item)
      this.$router.push('/list')
    },
    formatPrice (price) {
      return price.toFixed(2)
    },
    ...mapMutations({
      setGood: 'SET_GOOD_MUTATION'
    })
  }
}
</script>
<style lang="stylus" scoped>
.orderlist
  background-color #eee
.list-box
  .list
    margin-top 20px
    &:first-child
      margin-top 0
.order-footer
  height 50px
  margin-top 20px
  text-align center
  font-size 14px
.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  opacity 0
  transform translate3d(100%, 0, 0)
</style>
