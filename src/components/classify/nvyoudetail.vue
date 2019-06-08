<template>
  <div>
    <head-bar :title="title"></head-bar>
    <img :src="nvyoudata.cover_image_url"
         width="100%">
    <div width="100%"
         class="gonglve">
      <h3 style="font-size:20px;">{{nvyoudata.title}}</h3>
      <p style="margin-bottom:15px;">{{nvyoudata.share_msg}}</p>
      <p>
        <img :src="nvyoudata.img"
             alt="">
      </p>

      <!-- <p v-text="nvyoudata.content_url"></p> -->
      <div class="content"
           v-for="(item, index) in nvyoudata.list"
           :key="index">
        <h3 class="item-title">
          <span class="ititle-serial"
                style="font-size:25px;font-style:italic;padding-right:15px;">{{index+1}}</span>
          <span class="ititle">{{item.title}}</span>
        </h3>
        <p style="margin-bottom:15px;">{{item.text}}</p>
        <img :src="item.img"
             alt="">

        <div class="item-info">
          <p class="item-info-price"><span style="font-family: arial;color:red;font-size:18px;">{{item.price}}</span></p>
          <p class="item-like-info">{{item.like}}</p>
        </div>
      </div>
      <p>{{nvyoudata.text}}</p>
    </div>
  </div>
</template>
<script>
import headBar from '../common/head-bar.vue'
export default {
  components: {
    headBar
  },
  data () {
    return {
      title: '攻略详情',
      nvyoudata: {}
    }
  },
  created () {
    var itemJson = sessionStorage.getItem('itemJson')
    var itemObj = JSON.parse(itemJson)
    // itemObj.allitemThumbsUrl = itemObj.itemUrlThumbs.split('|')
    this.nvyoudata = itemObj
    console.log(this.nvyoudata)
  },
  methods: {
    goBack: function () {
      window.history.go(-1)
    }
  },
  mounted () {
    // console.log('111')
    // console.log(this.$route.params.id)
    // var id = this.$route.params.id
    // var that = this
    // const url = `/api/nvyou/${id}`
    // that.axios.get(url)
    //   .then((res) => {
    //     console.log(url)
    //     console.log(res.data)
    //   })
    // var itemJson = sessionStorage.getItem('nvyoudata')
    // this.nvyoudata = JSON.parse(itemJson)
    // itemObj.allitemThumbsUrl = itemObj.itemUrlThumbs.split('|')
    // this.nvyoudata = itemObj
  }
}
</script>
<style scoped>
p {
  color: black;
}
.gonglve {
  margin: 15px;
}
</style>
