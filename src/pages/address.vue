<template>
  <div class="list">
    <!--增加一个标题栏-->
    <span class="title-left" @click="onClickLeft"> <van-icon name="arrow-left" class="leftback" />返回</span>
    <span class="title-mid">地址列表</span>
    <span class="title-right"></span>
    <!-- <head-bar :title="title"></head-bar> -->
    <div class="no-data" v-if="addressList.length === 0">暂无地址数据</div>
    <van-address-list v-model="chosenAddressId" :list="list" @add="onAdd" @edit="onEdit" @select="onSelect" />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
// import headBar from '../components/common/head-bar.vue'

import { AddressList, Icon } from 'vant';

export default {
  components: {
    [Icon.name]: Icon,
    [AddressList.name]: AddressList
    // headBar
  },

  data() {
    return {
      msg: 'vuex 使用实例',
      title: '地址列表',
      chosenAddressId: ''
      // list: []
      // addressList: []
      // list: [
      //   {
      //     id: '1',
      //     name: '张三',
      //     tel: '13000000000',
      //     province: '江苏',
      //     city: '无锡',
      //     county: '崇安区',
      //     area_code: '120000',
      //     address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
      //     postal_code: '123456'
      //   }
      // ]
    };
  },
  mounted() {
    this.setAddressList();
  },
  methods: {
    onAdd() {
      this.$router.push({
        path: '/addressEdit'
      });
    },
    onEdit(item, index) {
      this.$router.push({
        path: '/addressEdit',
        query: {
          idx: index
        }
      });
      console.log(item);
      this.editAddress(item);

      // let id = item.id
      // for (let i = 0; i < this.addressList.length; i++) {
      //   // eslint-disable-next-line eqeqeq
      //   if (this.addressList[i].Addressid == id) {
      //     var address = this.addressList[i]
      //     console.log(address)
      //     this.setEditAddress(address)
      //     this.$router.push({
      //       path: '/addressEdit',
      //       query: {
      //         idx: index
      //       }
      //     })
      //     break
      //   }
      // }
    },
    onSelect(item, index) {
      console.log('onSelect', item);
      console.log(this.$store.state.isSelectAddress);
      if (this.$store.state.isSelectAddress) {
        this.setAddressId(item.id);
        this.$router.go(-1);
      }
      // this.setAddressId(this.chosenAddressId);
      // this.setAddressId(item.id);
    },
    getDefaultId() {
      let id = '';
      for (let i = 0; i < this.addressList.length; i++) {
        if (this.addList[i].Isdefault === 1) {
          id = this.addList[i]._id;
          break;
        }
      }
      this.chosenAddressId = id;
    },
    onClickLeft() {
      this.$router.push({
        path: '/order'
      });
    },
    ...mapActions(['setAddressList', 'editAddress']),
    ...mapMutations({
      setAddressId: 'SET_ADDRESSID_MUTATION'
    })
  },
  computed: {
    list() {
      var arr = [];
      console.log(this.addressList);
      this.addressList.forEach(item => {
        var obj = {};
        // obj.id = item.Addressid;
        obj.id = item._id;
        obj.name = item.Name;
        obj.tel = item.Phonenum;
        obj.address = item.Address + item.AddressDetail;
        arr.push(obj);
      });
      return arr;
    },
    // mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：
    // 使用对象展开运算符将此对象混入到外部对象中
    ...mapGetters(['addressList'])
  }
};
</script>
<style lang="stylus" scoped>
.leftback
  font-size 22px
  top 5px
.list
  width 100%
  height 44px
  line-height 50px
  text-align center
  background-color rgb(255, 66, 88)
  color white
.title-left
  display inline-block
  float left
  height 44px
  line-height 50px
  width 20%
  text-align center
  font-size 0.8rem
.title-right
  display inline-block
  float right
  height 44px
  line-height 50px
  width 20%
  text-align center
  font-size 0.8rem
.address-list
  padding-top 46px
.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  opacity 0
  transform translate3d(100%, 0, 0)
.no-data
  color #00000054
</style>
