<template>
  <div class="listdetail">
    <div width="100%">
      <head-bar :title="title"></head-bar>
      <van-tabs v-model="active"
                swipeable
                title-active-color="#f44">
        <van-tab title="单品">
          <img :src="bangdandata.cover_image_url"
               width="100%">
          <div style="margin:10px;">
            <p style="font-size:18px;color:black;">{{bangdandata.short_description}}</p>
            <p>{{bangdandata.name}}</p>
            <!-- <h4>{{bangdandata.title}}</h4> -->
            <p style="font-size:20px;color: rgb(255, 66, 88);">￥ {{bangdandata.price}}</p>
            <p>
              <van-icon name="like-o" /> {{bangdandata.favorites_count}}</p>

            <p style="text-align:left">{{bangdandata.description}}</p>
          </div>

        </van-tab>
        <van-tab title="详情">
          <img :src="imgurl"
               alt=""
               v-for="(imgurl, index) in bangdandata.image_urls"
               :key="index">
        </van-tab>

      </van-tabs>
      <van-goods-action>
        <!-- <van-goods-action-mini-btn icon="like-o"
                                   text="喜欢"
                                   @click="onClickMiniBtn" /> -->
        <van-goods-action-mini-btn icon="shopping-cart-o"
                                   text="购物车"
                                   @click="onClickshop" />
        <van-goods-action-big-btn primary
                                  text="加入购物车"
                                  @click="addCart" />
        <!-- <van-goods-action-big-btn text="立即购买"
                                  @click="onClickBigBtn" /> -->
      </van-goods-action>
    </div>
  </div>
</template>
<script>
import headBar from '../components/common/head-bar.vue'
import { Tab, Tabs, GoodsAction, Icon, Dialog, Toast,
  GoodsActionBigBtn,
  GoodsActionMiniBtn } from 'vant'
// var that = this
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionBigBtn.name]: GoodsActionBigBtn,
    [GoodsActionMiniBtn.name]: GoodsActionMiniBtn,
    [Icon.name]: Icon,
    [Dialog.name]: Dialog,
    [Toast.name]: Toast,
    headBar
  },
  data () {
    return {
      title: '详情页',
      bangdandata: {},
      active: 0,
      id: this.$route.params.id,
      nickname: ''
    }
  },
  created () {
    var itemJson = sessionStorage.getItem('itemJson')
    this.nickname = localStorage.getItem('username')
    // console.log(username)
    var itemObj = JSON.parse(itemJson)
    // itemObj.allitemThumbsUrl = itemObj.itemUrlThumbs.split('|')
    this.bangdandata = itemObj
    console.log(this.bangdandata)
    // eslint-disable-next-line eqeqeq
  },
  methods: {
    addCart () {
      console.log(this.nickname)
      // eslint-disable-next-line eqeqeq
      if (this.nickname != null) {
        this.axios.post('/users/goods/addCart', { productId: this.id, username: this.username }).then((res) => {
          console.log(res)
          // eslint-disable-next-line eqeqeq
          if (res.status == 200) {
            Dialog.confirm({
              title: '加入购物车成功',
              confirmButtonText: '查看购物车',
              confirmButtonColor: 'red',
              cancelButtonText: '继续购物',
              cancelButtonColor: 'red'
            }).then(() => {
              // on confirm
              this.$router.push('/cart')
            }).catch(() => {
              // on cancel
            })
          } else {
            console.log(res.msg)
          }
        })
      } else {
        var that = this
        Dialog.alert({
          message: '去登录'
        }).then(() => {
          console.log(that.nickname)
          that.$router.push('/login')
        })
      }
    },
    onClickMiniBtn () {
      // Toast('点击按钮');
    },
    onClickshop () {
      this.$router.push('/cart')
    },
    onClickBigBtn () {
      // Toast('去支付');
    }
  }
}
</script>
<style scoped>
p {
  color: rgb(122, 100, 100);
  font-size: 13px;
  padding: 0;
  margin: 0;
  margin-top: 10px;
  text-align: center;
}
.listdetail {
  padding-bottom: 60px;
}
button {
  margin: 0;
}
</style>
