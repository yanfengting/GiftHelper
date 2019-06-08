<template>
  <div class="haitaos">
    <head-bar :title="title"></head-bar>
    <div class="jxcontent"
         v-for="(jxitem, index) in haitaosdata"
         :key="index">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-media">
          <a href="javascript:;">
            <img class="mui-media-object mui-pull-left"
                 :src="jxitem.cover_image_url">
            <div class="mui-media-body">
              叫我小公举~
              <p class="mui-ellipsis">资深买买买达人</p>
            </div>
          </a>
        </li>
      </ul>

      <ul @click="haitaosdetail(jxitem,index)">
        <li class="post-item">
          <a class="pitem"
             :href="jxitem.content_url">
            <!-- :href="jxitem.content_url" -->
            <div class="pitem-cover clearfix"
                 width="100%"
                 style="position:relative;height:auto;">
              <img :src="jxitem.cover_image_url"
                   width="100%"
                   height="auto"
                   alt="">
            </div>
          </a>
        </li>
      </ul>
      <div class=''
           style="width:100%;background-color:#fff; ">
        <div class="pitem-title">{{jxitem.title}}</div>
        <div class="pitem-content"
             style="font-size:12px">{{jxitem.introduction}}</div>
      </div>
      <div class='clearfix'
           style="margin-top:10px; border-top:1px #eee solid;padding:10px 0;font-size:12px">
        <div style="float:left">
          <span>栏目 </span>
          <span>解忧杂货铺</span>
        </div>
        <div style="float:right">
          <van-icon name="like-o" />
          <span> {{jxitem.likes_count}}</span>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import headBar from '../common/head-bar.vue'
import {
  Tabbar,
  TabbarItem,
  Icon
} from 'vant'

export default {
  components: {
    headBar,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Icon.name]: Icon
  },

  data () {
    return {
      haitaosdata: [],
      msg: 'vuex 使用实例',
      title: '送基友'
    }
  },
  created: function () {
    this.axios.get('/api/haitaos').then((res) => {
      console.log(res)
      console.log(res.data.haitaos[0].data.items)
      this.haitaosdata = res.data.haitaos[0].data.items
    }, function (err) {
      console.log(err)
    })
  },
  methods: {
    // 点击列表页面的每一项时，跳到对应的详情页面
    haitaosdetail (item, index) {
      // sessionStorage.setItem('itemJson', JSON.stringify(item))
      // let id = this.haitaosdata[index].id
      // console.log(id)
      // this.$router.push(`/jxdetail/${id}`)
    }
  }
}
</script>
<style lang="less" scoped>
.clearfix:after {
  content: "."; /*加一段内容*/
  display: block; /*让生成的元素以块级元素显示，占满剩余空间*/
  height: 0; /*避免生成的内容破坏原有布局高度*/
  clear: both; /*清除浮动*/
  visibility: hidden; /*让生成的内容不可见*/
}

.haitaos {
  padding-bottom: 60px;
  background-color: #faf4f4;
}
.goods {
  padding-bottom: 50px;

  &-swipe {
    img {
      width: 100%;
      display: block;
    }
  }
}
.jxcontent {
  padding: 0 10px;
  text-align: left;
  border-top: 10px solid #faf4f4;
  background-color: #fff;
}
.mui-table-view .mui-media-object {
  line-height: 42px;
  max-width: 42px;
  height: 42px;
  border-radius: 50%;
  display: block;
}
.mui-pull-left {
  float: left;
}

.mui-media {
  padding: 10px 10px 0 0;
}
.mui-table-view .mui-media-body {
  overflow: hidden;
  color: black;
  text-align: left;
  padding-left: 10px;
}
.mui-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.mui-media-body p {
  font-size: 14px;
  margin-top: 0;
  margin-bottom: 10px;
  color: #8f8f94;
}

.post-item {
  background-color: #fff;
}
.post-item .pitem-title {
  font-size: 15px;
  color: #333;
  line-height: 25px;
  z-index: 2;
}
.post-item .pitem-content {
  font-size: 12px;
  color: #888;
  // height: 30px;
  line-height: 21px;
}
.post-item .pitem-cover {
  height: 142px;
}
.pitem-cover img {
  width: 100%;
}
</style>
