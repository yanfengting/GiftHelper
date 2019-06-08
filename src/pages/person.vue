<template>
  <div class="user" >
    <head-bar :title="title"></head-bar>

    <div class="userinfo">
      <div class="userinfo-avatar">
        <span class="m-img-box">
          <!-- <van-uploader :after-read="onRead" accept="image/gif, image/jpeg" >
            <van-icon name="photograph" style="z-index:-1"/>
            <img  name="adapter" src="https://tva1.sinaimg.cn/crop.0.0.664.664.180/006euR6Xjw8f0kyhp8skej30ig0igdhu.jpg" ref="goodsImg" />
          </van-uploader> -->
          <img src="https://tva1.sinaimg.cn/crop.0.0.664.664.180/006euR6Xjw8f0kyhp8skej30ig0igdhu.jpg" v-if='!img_url' ref="goodsImg" >
          <img :src="img_url" v-if='img_url'  ref="goodsImg" >
        </span>
        <span style="position:absolute;left:130px;top:75px;color:white;line-height:30px">
          <div v-text="username" v-if='username'> </div>
          <div @click="onlogin" v-if='!username'>立即登录</div>
          <div @click="quit" v-if='username'>退出登录</div>
        </span>
        <div class="ziliao" style="" v-if='username' @click="mineinfo">个人资料</div>
      </div>
    </div>
    <!-- 购物车 订单 礼券 送礼提醒 -->
    <van-row class="user-links">
        <van-col span="6">
          <img src="../assets/images/gwc.png"
               alt=""
               @click="cart">
        </van-col>
        <van-col span="6">
          <img src="../assets/images/dd.png"
               alt="" @click="orderlist">
        </van-col>
        <van-col span="6">
          <img src="../assets/images/lj.png"
               alt="" @click="showList = true">
        </van-col>
        <van-col span="6"
                 >
          <img src="../assets/images/sltx.png"
               alt=""
               @click="remind">
        </van-col>
      </van-row>
      <van-popup v-model="showList" position="bottom">
        <van-coupon-list
          :coupons="coupons"
          :chosen-coupon="chosenCoupon"
          :disabled-coupons="disabledCoupons"
          @change="onChange"
          @exchange="onExchange"
        />
      </van-popup>
    <!-- 列表区 -->
    <!-- 弹出层 -->
    <van-popup v-model="shows" position="top" :overlay="true">
      <van-col span='24' class="title" style="width:100%;height:100%;paddingBottom:20px;">
      <!-- 物流信息 -->
          <div v-if="wuliu">
            <h4 style="margin-left:10px;">{{menu[0]}}</h4>

            <van-steps
              :active="active"
              icon="logistics"
              title=""
              description=""
            >
              <van-step>买家下单</van-step>
              <van-step>商家接单</van-step>
              <van-step>买家提货</van-step>
                <van-step></van-step>
              <van-step>交易完成</van-step>
            </van-steps>

            <van-steps direction="vertical" :active="0" active-color="#06bf04">
              <van-step>
                <h3>【常州市】快件已到菜鸟驿站请带好证件来取件</h3>
                <p>2018-06-12 12:40</p>
              </van-step>
              <van-step>
                <h3>【无锡市】已到无锡集散中心正准备发往下一站</h3>
                <p>2016-06-11 10:00</p>
              </van-step>
              <van-step>
                <h3>快件已发货</h3>
                <p>2018-06-10 09:30</p>
              </van-step>
            </van-steps>

          </div>
      <!-- 收货地址 -->
          <div v-if="contact" style="height:700px;">
            <h4>{{menu[1]}}</h4>
          </div>
      <!-- 密码设置 -->
          <div v-if="pass" style="height:700px;">
            <h4 style="margin-left:10px;">{{menu[2]}}</h4>

            <!-- 密码输入框 -->
            <van-password-input
              :value="value"
              info="密码为 6 位数字"
              @focus="showKeyboard = true"
            />

            <!-- 数字键盘 -->
            <van-number-keyboard
              :show="showKeyboard"
              @input="onInputs"
              @blur="showKeyboard = false"
            />
          <div style="fontSize:12px;color:#A9A9A9;marginTop:20px;marginLeft:10px;">{{'请小主人妥善保管好密码哦~~'}}</div>
        </div>
      </van-col>
    </van-popup>
    <div>
      <van-cell-group class="user-group">
        <van-cell icon="home-o"
                  title="收货地址"
                  is-link @click="Shouhuo"/>
        <van-cell icon="logistics"
                  title="物流信息"
                  is-link @click="Wuliu"/>
        <van-cell icon="records"
                  title="密码设置"
                  is-link @click="Pass"/>
      </van-cell-group>
    </div>
    <div id="footbar">
      <van-tabbar v-model="active"
                  active-color="#fa294a">
        <van-tabbar-item icon="shop-collect"
                        to="/">首页</van-tabbar-item>
        <van-tabbar-item icon="fire"
                        to="/list">榜单</van-tabbar-item>
        <van-tabbar-item icon="more"
                        to="/classify">攻略</van-tabbar-item>
        <van-tabbar-item icon="manager"
                        to="/person">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import headBar from '../components/common/head-bar.vue'
import { AddressList, Tabbar, TabbarItem, Row, Col, Icon, Cell, CellGroup, NavBar, Button, Uploader, Toast, Switch, Popup, Dialog, Step, Steps, ContactCard, ContactList, ContactEdit, PasswordInput, NumberKeyboard, CouponList } from 'vant'
const coupon = {
  available: 1,
  condition: '无使用门槛\n最多优惠12元',
  reason: '',
  value: 150,
  name: '送礼提醒礼券',
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: '1.5',
  unitDesc: '元'
}
export default {
  components: {
    headBar,
    [AddressList.name]: AddressList,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Uploader.name]: Uploader,
    [Toast.name]: Toast,
    [Switch.name]: Switch,
    [Popup.name]: Popup,
    [Dialog.name]: Dialog,
    [Step.name]: Step,
    [Steps.name]: Steps,
    [ContactCard.name]: ContactCard,
    [ContactList.name]: ContactList,
    [ContactEdit.name]: ContactEdit,
    [ContactEdit.name]: ContactCard,
    [PasswordInput.name]: PasswordInput,
    [NumberKeyboard.name]: NumberKeyboard,
    [CouponList.name]: CouponList
  },
  data () {
    return {
      title: '我的',
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon],
      img_url: '',
      username: '',
      active: 3,
      tabactive: 3,
      menu: ['物流信息', '收货地址管理', '密码设置'],
      login: ['立即登录'],
      shows: false,
      xinyong: false,
      wuliu: false,
      contact: false,
      pass: false,
      value: '',
      chosenContactId: null,
      editingContact: {},
      showList: false,
      showEdit: false,
      isEdit: false,
      list: [{
        name: '张三',
        tel: '13000000000',
        id: 0
      }],
      showKeyboard: true
    }
  },
  computed: {
     cardType() {
      return this.chosenContactId !== null ? 'edit' : 'add'
    },
    currentContact() {
      const id = this.chosenContactId
      return id !== null ? this.list.filter(item => item.id === id)[0] : {}
    }
  },
  mounted () {
    // this.axios.get('/users').then((response) => {
    //     let res = response.data
    //     // 这里什么样的情况就是登出呢？查看cookie没有了
    //     // eslint-disable-next-line eqeqeq
    //     if (res.status == '0') {
    //       console.log(res.result)
    //       this.username = res.result.username
    //       this.img_url = res.result.img_url
    //     }
    //   })
    /* 页面挂载获取保存的值，渲染到页面上 */
    var username = localStorage.getItem('username')
    this.username = JSON.parse(username)
    // /* 如果cookie不存在，则跳转到登录页 */
  },
  methods: {
    orderlist() {
      this.$router.push('/orderList')
    },
    Shouhuo() {
      this.$router.push('/address')
    },
    Wuliu() {
      this.contact = false
      this.pass = false
      this.wuliu = true
      this.shows = true
    },
    Pass() {
      this.wuliu = false
      this.contact = false
      this.pass = true
      this.shows = true
    },
    onChange(index) {
      this.showList = false
      this.chosenCoupon = index
    },
    onExchange(code) {
      this.coupons.push(coupon)
    },
    onlogin () {
      this.$router.push('/login')
    },
    cart () {
      this.$router.push('/cart')
    },
    onClickLeft () {
      window.history.go(-1)
    },
    quit () {
      /* 删除cookie */
      this.axios.post('/users/logout').then((response) => {
        let res = response.data
        // 这里什么样的情况就是登出呢？查看cookie没有了
        // eslint-disable-next-line eqeqeq
        if (res.status == '0') {
          console.log(res)
          localStorage.clear()
          this.$router.push('/login')
        }
      })
    },
    remind () {
      this.$router.push('/remind')
    },
    mineinfo () {
      this.$router.push('/mineinfo')
    },
     onInputs(key) {
      this.value = (this.value + key).slice(0, 6)
      if ((this.value).split('').length >= 6) {
        Toast('密码设置成功 ^_^')
        this.shows = false
      }
    }
  }

}
</script>
<style lang="less" scoped>
.userinfo{
  height: 110px;
  padding-left:20px;
  padding-top:20px;
  align-items: left;
  background-color: rgb(255, 66, 88);
  display: flex;
  flex-direction: column;
}
.ziliao{
  position:absolute;
  left:180px;
  top:80px;
  color:white;
  font-size:13px;
}

.m-img-box{
  border-radius: 50%;
  position: relative;
}

span img{
  width: 77px;
  height: 77px;
  display: inline-block;
  padding: 3px;
  background-color: hsla(0, 0%, 100%, 0.4);
}

.m-img-box img{
  border-radius: 50%;
}
.userinfo-nickname{
  width: 100%;
  height: 20px;
  text-align: center;
  margin: 25px;
  color: white;
}
.van-tabbar {
  position: fixed;
  bottom: 0;
}
.van-tabbar-item--active {
  cursor: pointer;
  color: #fa294a;
}
.headerImg {
    margin-top: 1px;
    height: 70px;
    background: white;
    position: relative;
    .me-img{
        height: 50px;
    img{
        width:50px;
        height: 50px;
        border-radius: 50px;
        background-size: 200%;
        background-position: 50% 50%;
        position: absolute;
        left: 20px;
        top: 7px;
    }
  }
  .me-img-t{
      position: absolute;
      top: 0;
      left: 80px;
      font-size: 17px;
  }
  .me-img-p{
    position: absolute;
    top: -5px;
    right:30px;
    font-size: 20px;
    color: #F2F2F2;
    font-weight: normal;
  }
}
.btns{
        margin-top: 30px;
    }
.headerList{
    height: 40px;
    background: white;
    position: relative;
    margin-top: 1px;
    .me-img-ts{
        position: absolute;
        top: 10px;
        left: 20px;
        font-size: 14px;
    }
    .me-img-ps{
        position: absolute;
        top: -20px;
        right:30px;
        font-size: 20px;
        color: #F2F2F2;
        font-weight: normal;
    }
}

.boxer{
    height: 370px;
    background: white;
    margin-top: 1px;
    position: relative;
    .range{
        position: absolute;
        left: 32%;
        top: 28%;
    }
    span{
        display: block;
        margin-top:68%;
        font-size: 14px;
        color:#A9A9A9;
    }
}
</style>
