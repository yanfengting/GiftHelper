<template>
  <div class="paySuc">
    <div class="paySuc-top">
      <p class="suc">
        <i class="van-icon van-icon-passed"></i>
        <span>支付成功</span>
      </p>

      <div class="msg">
        <h1>物流信息</h1>
        <span>我们将尽快安排发货，请买家保持手机通讯顺畅，以便快递哥哥能第一时间联系到您</span>
      </div>
    </div>
    <div class="btn">
      <router-link to="/">
        <van-button size="normal">返回首页</van-button>
      </router-link>
    </div>

  </div>
</template>

<script>
import { Button } from 'vant'
export default {
  components: {
    [Button.name]: Button
  }
}
</script>

<style lang="less" scoped>
.van-icon-passed:before {
  font-size: 30px;
}
.paySuc {
  .paySuc-top {
    padding: 20px 5%;
    background: #fff;
    color: #333;
    p {
      padding: 20px 0;
      border-bottom: 1px solid #e5e5e5;
      display: flex;
      flex-direction: column;
      align-items: center;
      .van-icon-passed:before {
        color: #00c000;
      }
      span {
        font-size: 0.4rem;
        margin: 0.2rem 0 0 0;
      }
    }
    .msg {
      display: flex;
      flex-direction: column;
      padding: 0.2rem 0;
      h1 {
        font-size: 0.32rem;
      }
      span {
        font-size: 12px;
        // line-height: 0.32rem;
        // margin: 0.2rem 0 0 0;
      }
    }
  }
  .btn {
    text-align: center;
    .van-button {
    }
  }
}
</style>
