<template>
  <div class="home">
    <!-- <van-nav-bar title="首页"
                 left-text="礼物帮手" /> -->
    <div id="head" class="head">
      <span class="title-left"> 礼物帮手</span>
      <span class="title-mid">首页</span>
      <span class="title-right"></span>
    </div>
    <van-tabs v-model="active" swipeable title-active-color="#f44">
      <van-tab title="精选">
        <jingxuan />
      </van-tab>
      <van-tab title="送同事">
        <Sendcolleagues />
      </van-tab>
      <van-tab title="送基友">
        <Sendgays />
      </van-tab>
      <van-tab title="送女票">
        <Sendnvyou />
      </van-tab>
      <van-tab title="送爸妈">
        <Sendbama />
      </van-tab>
      <van-tab title="送宝贝">
        <Sendbaby />
      </van-tab>
    </van-tabs>
    <div id="footbar">
      <van-tabbar v-model="tabactive" active-color="#fa294a">
        <van-tabbar-item icon="shop-collect" to="/">首页</van-tabbar-item>
        <van-tabbar-item icon="fire" to="/list">榜单</van-tabbar-item>
        <van-tabbar-item icon="more" to="/classify">攻略</van-tabbar-item>
        <van-tabbar-item icon="manager" to="/person">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import Jingxuan from '../components/home/jingxuan.vue';
import Sendcolleagues from '../components/home/Sendcolleagues.vue';
import Sendgays from '../components/home/Sendgays.vue';
import Sendnvyou from '../components/home/Sendnvyou.vue';
import Sendbama from '../components/home/Sendbama.vue';
import Sendbaby from '../components/home/Sendbaby.vue';
import { Tabbar, TabbarItem, NavBar, Checkbox, CheckboxGroup, Card, SubmitBar, Tab, Tabs } from 'vant';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      tabactive: 0,
      active: 0,
      checkedGoods: ['1', '2', '3']
    };
  },
  created() {
    this.setUserInfo();
  },

  methods: {
    ...mapActions(['setUserInfo'])
  },
  computed: {},
  components: {
    Jingxuan,
    Sendnvyou,
    Sendbama,
    Sendcolleagues,
    Sendgays,
    Sendbaby,
    [Card.name]: Card,
    [Checkbox.name]: Checkbox,
    [SubmitBar.name]: SubmitBar,
    [CheckboxGroup.name]: CheckboxGroup,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [NavBar.name]: NavBar,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  }
};
</script>
<style lang="less">
.van-tabbar {
  position: fixed;
  bottom: 0;
}
.van-tabbar-item--active {
  cursor: pointer;
  color: #fa294a;
}
.leftback {
  font-size: 22px;
  top: 5px;
}
.head {
  width: 100%;
  height: 44px;
  line-height: 50px;
  text-align: center;
  background-color: #fa294a;
  color: white;
}

.title-left {
  display: inline-block;
  float: left;
  height: 44px;
  line-height: 50px;
  width: 20%;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 700;
}

.title-right {
  display: inline-block;
  float: right;
  height: 44px;
  line-height: 50px;
  width: 20%;
  text-align: center;
  font-size: 0.8rem;
}

.title-mid {
  display: inline-block;
  width: 60%;
}

img {
  width: 100%;
}
</style>
