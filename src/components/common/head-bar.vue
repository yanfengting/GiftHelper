<template>
  <div id="head"
       class="head">
    <span class="title-left"
          @click="goBack">
      <van-icon name="arrow-left"
                class="leftback" />返回</span>
    <span class="title-mid">{{title}}</span>
    <span class="title-right"></span>
  </div>
</template>

<script>
import { Icon } from 'vant'
export default {
  props: {
    title: String
    // default: '首页',
    // required: true
  },
  methods: {
    goBack: function () {
      window.history.go(-1)
    }

    // onClickLeft () {
    //   window.history.go(-1)
    // }
  },
  components: {
    [Icon.name]: Icon
  }
}
</script>

<style scoped>
.leftback {
  font-size: 22px;
  top: 5px;
}
.head {
  width: 100%;
  height: 44px;
  line-height: 50px;
  text-align: center;
  background-color: rgb(255, 66, 88);
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

a {
  text-decoration: none;
  color: white;
}
</style>
