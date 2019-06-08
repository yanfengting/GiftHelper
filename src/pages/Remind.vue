<template>
  <div class="remind">
    <div id="head"
         class="head">
      <span class="title-left"
            @click="onClickLeft">
        <van-icon name="arrow-left"
                  class="leftback" />返回</span>
      <span class="title-mid">送礼提醒</span>
      <span class="title-right"
            @click="onClickRight">新建提醒</span>
    </div>

    <!-- <img src="../assets/images/giftremind.png"
         alt=""> -->

    <div v-if="remindList!=0" >
      <van-steps direction="vertical" >
        <van-step v-for="(item, index) in remindList"
                  :key="index">
          <p style="font-weight:600;font-size:15px;">{{item.sendTime}}</p>
          <p><span>{{item.sendPerson}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>{{item.sendReason}}</span></p>
          <p>{{item.text}}</p>
        </van-step>
      </van-steps>
    </div>
    <div v-else>
      <img src="../assets/images/giftremind2.png"
           alt="">
      <p>你还没有送礼提醒记录哦！</p>
      <!-- <van-goods-action-big-btn primary class="new"
                                  text="新建提醒"
                                  @click="onClickRight" /> -->
    </div>

  </div>
</template>
<script>
import { NavBar, Button, Icon, GoodsActionBigBtn, Step, Steps } from 'vant'
export default {
  data() {
    return {
      remindList: []
    }
  },
  components: {
    [Button.name]: Button,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [GoodsActionBigBtn.name]: GoodsActionBigBtn,
    [Step.name]: Step,
    [Steps.name]: Steps
  },
  mounted() {
    this.axios.get('/users/remindList').then((response) => {
        let res = response.data
        // 这里什么样的情况就是登出呢？查看cookie没有了
        // eslint-disable-next-line eqeqeq
        if (res.status == '0') {
          console.log(res)
          this.remindList = res.result
        }
      })
  },
  methods: {
    onClickLeft () {
      window.history.go(-1)
    },
    onClickRight () {
      this.$router.push('/newremind')
    }
  }
}
</script>
<style scoped>
.van-steps--vertical {
    padding: 0 0 0 35px;
}
.new{
  position: relative;;
  bottom:0
}
.leftback {
  font-size: 22px;
  top: 5px;
}
.remind {
  text-align: center;
}
.remind-title {
  background-color: rgb(255, 66, 88) !important;
  color: white;
}
.remind img {
  width: 100%;
}
.remind p {
  margin: 0 auto;
  color: rgb(104, 103, 102);
  font-size: 13px;
  padding-bottom: 10px;
}

.van-nav-bar__text {
  color: #000;
}
</style>
