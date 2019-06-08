<template>
  <div class='cart'>
    <head-bar :title="title"></head-bar>
    <!--购物车不为空-->
    <div class="cart-section" v-if="goods!=0">
      <div  >
      <van-checkbox-group class="card-goods" v-model="checkedGoods" >
        <van-checkbox  class="card-goods__item"
           v-for="item in goods"
          :key="item.id"
          :name="item.id">
          <van-card
            :title="item.name"
            :desc="item.short_description"
            :price="parseInt(item.price)"
            :thumb="item.cover_image_url"
          >
          <div slot="footer">
            <div class="sum_cont">
              <label class="minute" @click.stop="editCart('minu',item)">-</label>
              <input class="input" v-model="item.productNum"  />
              <label class="add" @click.stop="editCart('add',item)">+</label>
            </div>
            <van-button class="delete operate-delete"
                      size="mini"
                      type="danger" v-on:click.stop="delCartConform(item.id)">删除</van-button>
          </div>
          </van-card>
        </van-checkbox>

      </van-checkbox-group>
      </div>
      <van-submit-bar
        class="submit"
        :price="totalPrice"
        :disabled="!checkedGoods.length"
        :button-text="submitBarText"
        @submit="onSubmit"
      >
        <div style="margin-left:5px;" >
          <van-checkbox v-model="allChecked" @click="checkall($event)">全选</van-checkbox>
        </div>
      </van-submit-bar>
    </div>
    <!--购物车为空-->
    <div class="cart-empty" v-else>
        <div class="cart-ico">
          <i class="van-icon van-icon-cart"></i>
        </div>
        <p class="empty-warm">购物车还是空的</p>
        <router-link to="/list">
          <van-button size="small">去榜单看看</van-button>
        </router-link>
    </div>
  </div>
</template>
<script>
import headBar from '../components/common/head-bar.vue'
import { Checkbox, CheckboxGroup, Card, SubmitBar, Toast, Button, Dialog, Stepper } from 'vant'
import { mapMutations } from 'vuex'

export default {
  components: {
    [Card.name]: Card,
    [Checkbox.name]: Checkbox,
    [SubmitBar.name]: SubmitBar,
    [CheckboxGroup.name]: CheckboxGroup,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    [Stepper.name]: Stepper,
    [Toast.name]: Toast,
    headBar
  },
  data () {
    return {
      title: '购物车列表',
      checked: true,
      checkedGoods: [], // 双向数据绑定的数组
      goods: [], // 从数据库拿到的加入购物车的商品
      allChecked: false,
      flag: true
    }
  },
  watch: {
    // 监听单选框（ 监视双向绑定的数组变化），选择状态
    checkedGoods(e, old) {
      console.log(e)
      console.log(this.checkedGoods)
      // eslint-disable-next-line eqeqeq
      if (this.goods.length == e.length) {
        this.allChecked = true
      } else {
        this.allChecked = false
      }
    }
  },
  created () {
    this.init()
  },
  computed: {
    submitBarText() {
      const count = this.checkedGoods.length
      return '结算' + (count ? `(${count})` : '')
    },
    totalPrice() {
    // 有出现则累加，没有则为0
      return this.goods.reduce((total, item) => total + (this.checkedGoods.indexOf(item.id) !== -1 ? parseInt(item.price * 100) * item.productNum : 0), 0)
    }
  },
  methods: {
    init () {
      this.axios.get('/users/cartList').then((response) => {
        let res = response.data
        this.goods = res.result
        // console.log(res.result)
      })
    },
    editCart(flag, item) {
        // eslint-disable-next-line eqeqeq
        if (flag == 'add') { // 添加商品数量
          item.productNum++
        // eslint-disable-next-line eqeqeq
        } else if (flag == 'minu') { // 减少商品数量
          if (item.productNum <= 1) {
            return
          }
          item.productNum--
        } else { // 商品控制选中
          // eslint-disable-next-line eqeqeq
          item.checked = (item.checked == '1') ? '0' : '1'
        }
        this.axios.post('/users/cartEdit', {
          productId: item.id,
          productNum: item.productNum,
          checked: item.checked
        }).then((response) => {
          let res = response.data
          console.log(res)
        })
      },

    // 全选返选
    checkall(e) {
      // console.log(e)
      // if (e.target.checked) {
      //     this.goods.forEach((el, i) => {
      //         // 数组里没有这一个value才push，防止重复push
      //         // eslint-disable-next-line eqeqeq
      //         if (this.checkedGoods.indexOf(el.value) == '-1') {
      //             this.checkedGoods.push(el.value)
      //         }
      //     })
      // } else { // 全不选选则清空绑定的数组
      //     this.checkedGoods = []
      // }
      let arr = []
      if (this.allChecked) {
            this.goods.forEach((item, index) => {
              arr.push(this.goods[index].id)
          })
          this.checkedGoods = arr
      } else {
        this.checkedGoods = []
      }
    },
    // 跳到结算页
    onSubmit() {
      console.log('111')
      console.log(this.checkedGoods[0])
      var orderGood = this.goods.filter(item => {
          if (this.checkedGoods.indexOf(item.id) !== -1) {
            return item
          }
        })
        this.setOrderGood(orderGood)
      this.$router.push('/order')
    },
    ...mapMutations({
      setOrderGood: 'SET_ORDERGOOD_MUTATION' // // 将 `this.setOrderGood()` 映射为 `this.$store.commit('SET_ORDERGOOD_MUTATION')`
    }),
    delCartConform (id) {
      this.prodectId = id
      Dialog.confirm({
        title: '你确定要删除此条数据吗？'
      }).then(() => {
        // on confirm
        this.axios.post('/users/cartDel', {
          id: id
        }).then((response) => {
          let res = response.data
          console.log(res)
          // eslint-disable-next-line eqeqeq
          if (res.status == '0') {
            this.init() // 重新初始化购物车数据
          }
        })
      }).catch(() => {
        // on cancel
      })
    },
    formatPrice (price) {
      return (price / 100).toFixed(2)
    }
  }
}
</script>
<style scoped lang="less">
.submit{
  z-index:200;
}
.van-icon-cart:before {
    font-size: 30px;
}
p{
  margin:10px;
}
.van-checkbox__label {
  margin: 0;
  width: 100%;
  padding-left: 35px;
  box-sizing: border-box;
  .van-card{
    background: #fff;
  }
}
/* 总数量*/
.sum_cont {
  z-index:200;
  position: absolute;
  right: 0;
  bottom: 10px;
  width: 130px;
  height: 20px;
  line-height: 20px;
}
/*减号*/
.minute {
  position: absolute;
  width: 20px;
  text-align: center;
  height: 20px;
  line-height: 20px;
  left: 20px;
  font-size: 18px;
  border: 1px solid #DD524D;
}
/*加号*/
.add {
  width: 20px;
  border: 1px solid #DD524D;
  height: 20px;
  line-height: 20px;
  text-align: center;
  position: absolute;
  right: 10px;
  font-size: 18px;
}
/*文本框*/
.input {
  width: 40px;
  height: 21px;
  display: inline-block;
  line-height: 20px;
  text-align: center;
  position: absolute;
  right: 40px;
}

.cart{
  width:100%;
  margin-bottom: 50px;
    .cart-section{
      .card-goods {
      background-color: #fff;
      position: relative;
      &__item {
        position: relative;
          padding: 10px 0 10px 5px;
          border-bottom: 1px solid #e5e5e5;

        .van-checkbox__input {
          top: 50%;
          left: 15px;
          margin-top: -10px;
          position: absolute;
        }
        .van-card__title{
          width:155px;
        }
        .van-card__price {
          color: #f44;
        }
        .delete{
          z-index: 200;
          position: absolute;
          top: 40px;
          right:10px;
        }
      }

      .steper{
          position: absolute;
          top: 50px;
          right: 4%;
        li{
          height: 118px;
          div{
            display: flex;
            align-items: flex-end;
          }
        }
      }
    }
    .van-submit-bar{
      .van-checkbox{
          font-size: 0.26rem;
          padding-left: 0.15rem;
        }
    }
    }
  .cart-empty{
    padding: 1.5rem 5%;
    text-align: center;
    .cart-ico{
      .van-icon-cart{
        font-size: 0.5rem;
        color:#999;
      }
    }
    .empty-warm{
      font-size: 0.32rem;
      margin-top: 0.3rem;
      color: #999;
    }
  }
}

</style>
