<template>
  <div class="list">
    <!--增加一个标题栏-->
    <head-bar :title="title"></head-bar>

    <img src="../assets/images/3.png"
         alt="">

    <div style="margin:10px">
      <ul class="tem-flex">
        <li class="tem-list"
            v-for="(bitem, index) in bangdata"
            :key="index">
          <div class="list-item"
               @click="bangdandetail(bitem,index)">
            <div class="img-con">
              <img :src="bitem.cover_image_url"
                   width="90%"
                   alt="">
            </div>
            <div class="info-con">
              <p class="list-item-name line2">
                <van-tag color="#ffe1e1"
                         text-color="#ad0000">Top{{index+1}}</van-tag>&nbsp;{{bitem.short_description}}
              </p>
              <p class="price_sell">{{bitem.name}}</p>
              <p style="color:rgb(255, 66, 88);font-size:18px;">￥ {{bitem.price}}</p>
            </div>
          </div>
        </li>
      </ul>
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
import headBar from '../components/common/head-bar.vue'

import {
  Row,
  Col,
  Tag,
  NavBar,
  Tabbar,
  TabbarItem
} from 'vant'

export default {
  components: {
    [NavBar.name]: NavBar,
    [Row.name]: Row,
    [Col.name]: Col,
    [Tag.name]: Tag,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    headBar
  },
  created () {
    this.axios.get('/api/goods').then((res) => {
      console.log(res)
      // console.log(res.data.goods[0].data.items)
      this.bangdata = res.data.goods
    }, function (err) {
      console.log(err)
    })
  },
  data () {
    return {
      msg: 'vuex 使用实例',
      title: '礼物榜',
      tabactive: 1,
      bangdata: ''
    }
  },
  methods: {
    bangdandetail (bitem, index) {
      sessionStorage.setItem('itemJson', JSON.stringify(bitem))
      let id = this.bangdata[index].id
      console.log(id)
      this.$router.push(`/listdetail/${id}`)
    }
  }
}
</script>
<style  scoped>
.tem-flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  text-align: justify;
}

.tem-list {
  width: 49%;
  margin-bottom: 10px;
}

.list {
  background-color: #faf4f4;
  padding-bottom: 45px;
}
p {
  font-size: 13px;
  color: black;
  padding: 0;
  margin-top: 5px;
}

.list-item {
  /* margin: 10px 0; */
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 5px;
}
.list-item img {
  border-radius: 5px 5px 0 0;
}
.list-item .info-con {
  padding: 0 10px;
}
.list-item .info-con .list-item-name {
  font-size: 13px;
  line-height: 20px;
  margin-top: 5px;
}
.list-item .line2 {
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  height: 18px;
}
.list-item .info-con .price_sell {
  font-size: 12px;
  color: #9b9b9b;
  position: relative;
  margin-top: 10px;
}
.price_sell {
  font-size: 12px;
  color: #9b9b9b;
  position: relative;
  height: 35px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
