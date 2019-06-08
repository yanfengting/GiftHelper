<template>
  <div id="footbar">
    <van-tabbar v-model="active"
                active-color="#fa294a">
      <van-tabbar-item icon="shop-collect"
                       to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="fire"
                       to="/list">榜单</van-tabbar-item>
      <van-tabbar-item icon="more"
                       to="/classify">攻略</van-tabbar-item>
      <van-tabbar-item icon="manager"
                       to="/person">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'

export default {
  props: {
    active: Number
    // default: '首页',
    // required: true
  },
  data () {
    return {
      // tabactive: 0
    }
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  methods: {

  }
}
</script>

<style lang="less" >
.van-tabbar {
  position: fixed;
  bottom: 0;
}
.van-tabbar-item--active {
  cursor: pointer;
  color: #fa294a;
}
</style>
