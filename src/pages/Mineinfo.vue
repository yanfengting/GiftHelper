<template>
  <div>
    <div id="head"
         class="head">
      <head-bar :title="title"></head-bar>
      <!-- <span class="title-right"
            @click="save">保存</span> -->
    </div>
    <div class="userinfo">
      <div class="userinfo-avatar">
        <span class="m-img-box">
          <van-uploader :after-read="onRead" accept="image/gif, image/jpeg" >
            <van-icon name="photograph" style="z-index:-1"/>
            <img src="https://tva1.sinaimg.cn/crop.0.0.664.664.180/006euR6Xjw8f0kyhp8skej30ig0igdhu.jpg" v-if='!img_url' ref="goodsImg" >
          <img :src="img_url" v-if='img_url'  ref="goodsImg" >
          </van-uploader>
          <!-- <img src="https://tva1.sinaimg.cn/crop.0.0.664.664.180/006euR6Xjw8f0kyhp8skej30ig0igdhu.jpg"  ref="goodsImg" > -->
        </span>
        <span style="position:absolute;left:130px;top:75px;color:white;line-height:30px">
          <div v-text="username" v-if='username'></div>
          <div v-if='username' style="font-size:12px">(登录名不允许修改)</div>
        </span>
        <!-- <div class="ziliao" style=""  @click="mineinfo">修改</div> -->
      </div>
    </div>
    <van-cell-group ref="modalFormData">
      <van-field
        v-model="phone"
        label="手机"
        type="textarea"
        placeholder="请输入手机号"
        rows="1"
        autosize
      />
      <van-field
        v-model="sex"
        label="性别"
        type="textarea"
        placeholder="请输入性别"
        rows="1"
        autosize
      />
      <van-field
        v-model="birthday"
        label="生日"
        type="textarea"
        placeholder="请输入生日"
        rows="1"
        autosize
      />
    </van-cell-group>

      <van-goods-action-big-btn primary class="save"
                                  text="保存修改"
                                  @click="save" />

  </div>
</template>
<script>
import headBar from '../components/common/head-bar.vue'
import { Field, Icon, CellGroup, Uploader, Toast, GoodsActionBigBtn } from 'vant'
export default {
  components: {
    headBar,
    [Field.name]: Field,
    [Icon.name]: Icon,
    [CellGroup.name]: CellGroup,
    [Uploader.name]: Uploader,
    [Toast.name]: Toast,
    [GoodsActionBigBtn.name]: GoodsActionBigBtn
  },
  data () {
    return {
      title: '我的资料',
      message: '',
      birthday: '',
      sex: '',
      phone: '',
      username: '',
      img_url: ''
    }
  },
  watch: {
      modalFormData: {
          // 注意：当观察的数据为对象或数组时，curVal和oldVal是相等的，因为这两个形参指向的是同一个数据对象
          handler(curVal, oldVal) {
              // 自动保存方法
            this.autoSave()
          },
          deep: true
      }
  },
  mounted() {
    this.init()
  },
  methods: {
    onRead(file) {
      console.log(file)
      // 将原图片显示为选择的图片
      this.$refs.goodsImg.src = file.content
      Toast('头像上传成功 ^_^')
    },
    init() {
      this.axios.get('/users').then((response) => {
        let res = response.data
        // 这里什么样的情况就是登出呢？查看cookie没有了
        // eslint-disable-next-line eqeqeq
        if (res.status == '0') {
          console.log(res.result)
          this.mineinfo = res.result
          this.phone = res.result.phone
          this.sex = res.result.sex
          this.birthday = res.result.birthday
          this.username = res.result.username
          this.img_url = res.result.img_url
        }
      })
    },
    save() {
      let obj = {
        'sex': this.sex,
        'phone': this.phone,
        'birthday': this.birthday,
        'img_url': this.$refs.goodsImg.src
      }
      this.axios.post('/users', obj).then((response) => {
        let res = response.data
        // 这里什么样的情况就是登出呢？查看cookie没有了
        // eslint-disable-next-line eqeqeq
        if (res.status == '0') {
          console.log(res)
           this.$router.push('/person')
          // this.username = res.result.username
        }
      })
    },
    onClickLeft () {
      window.history.go(-1)
    }
  }
}
</script>
<style scoped>
.save{
  position: absolute;
  bottom:0
}
.leftback{
  font-size:22px;
}
.userinfo{
  height: 110px;
  padding-left:20px;
  padding-top:20px;
  align-items: left;
  background-color: rgb(255, 66, 88);
  display: flex;
  flex-direction: column;
}
.ziliao{
  position:absolute;
  left:180px;
  top:80px;
  color:white;
  font-size:13px;
}

.m-img-box{
  border-radius: 50%;
  position: relative;
}

span img{
  width: 77px;
  height: 77px;
  display: inline-block;
  padding: 3px;
  background-color: hsla(0, 0%, 100%, 0.4);
}

.m-img-box img{
  border-radius: 50%;
}
</style>
