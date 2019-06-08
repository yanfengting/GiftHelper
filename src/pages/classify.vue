<template>
  <div class="classify">
    <!--增加一个标题栏-->
    <head-bar :title="title"></head-bar>
    <!-- <div style="margin:0 15px;">
      <div style="margin:15px 0;">品类</div>
      <van-row gutter="18">
          <van-col span="12" class="img-margin"><img src="../assets/images/object/lw.jpg" @click="gift" alt=""></van-col>
          <van-col span="12" class="img-margin"><img src="../assets/images/object/ht.jpg" @click="haitao" alt=""></van-col>
        </van-row>
    </div> -->
    <div style="margin:15px;">
      <div style="margin:15px 0;">对象</div>
      <van-row gutter="18">
          <van-col span="12" class="img-margin"><img src="../assets/images/object/ny.jpg" @click="nvyou" alt=""></van-col>
          <van-col span="12" class="img-margin"><img src="../assets/images/object/ts.jpg" @click="tongshi" alt=""></van-col>
          <van-col span="12" class="img-margin"><img src="../assets/images/object/jy.jpg" @click="gay" alt=""></van-col>
          <van-col span="12" class="img-margin"><img src="../assets/images/object/zb.jpg" @click="zhangbei" alt=""></van-col>
        </van-row>
    </div>
    <div style="margin:0 15px;">
      <div style="margin-bottom:15px;">风格</div>
      <van-row gutter="18">
          <van-col span="12" class="img-margin"><img src="../assets/images/style/cysh.jpg" @click="cysh" alt=""></van-col>
          <van-col span="12" class="img-margin"><img src="../assets/images/style/qpgg.jpg" @click="qpgg" alt=""></van-col>
          <van-col span="12" class="img-margin"><img src="../assets/images/style/kjf.jpg" @click="kjf" alt=""></van-col>
          <van-col span="12" class="img-margin"><img src="../assets/images/style/mmd.jpg" @click="mmd" alt=""></van-col>
          <van-col span="12" class="img-margin"><img src="../assets/images/style/sjg.jpg" @click="sjg" alt=""></van-col>
          <van-col span="12" class="img-margin"><img src="../assets/images/style/wyf.jpg" @click="wyf" alt=""></van-col>
        </van-row>
    </div>
    <div id="footbar">
      <van-tabbar v-model="tabactive"
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
import { Tabbar, TabbarItem, NavBar, Row, Col } from 'vant'
import headBar from '../components/common/head-bar.vue'

export default {
  components: {
    [NavBar.name]: NavBar,
    [Row.name]: Row,
    [Col.name]: Col,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    headBar
    },
  data () {
    return {
      msg: 'vuex 使用实例',
      title: '分类',
      tabactive: 2
    }
  },
  methods: {
    gift() {
      this.$router.push({ path: '/gift' })
    },
    haitao() {
      this.$router.push({ path: '/haitao' })
    },
    nvyou() {
      this.$router.push({ path: '/nvyou' })
    },
    tongshi() {
      this.$router.push({ path: '/tongshi' })
    },
    gay() {
      this.$router.push({ path: '/gay' })
    },
    zhangbei() {
      this.$router.push({ path: '/zhangbei' })
    },
    cysh() {
      this.$router.push({ path: '/chuangyishenghuo' })
    },
    qpgg() {
      this.$router.push({ path: '/qipagaoguai' })
    },
    kjf() {
      this.$router.push({ path: '/kejifan' })
    },
    mmd() {
      this.$router.push({ path: '/mengmengda' })
    },
    sjg() {
      this.$router.push({ path: '/shejigan' })
    },
    wyf() {
      this.$router.push({ path: '/wenyifeng' })
    }
  }
}
</script>
<style scoped>
img{
  width:99%;
}
.classify{
  background-color: #faf4f4;
  margin-bottom: 50px;
}
  .col{
    width:47%;
    height:auto;
    float:left;
    margin:5px ;
    /* border: 1px solid black; */
  }
  .img-margin{
    margin-bottom: 15px;
  }
</style>
