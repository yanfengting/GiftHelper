import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login.vue'
import Main from '@/pages/Main.vue'
import Jxdetail from '@/components/home/Jxdetail.vue'
import Home from '@/pages/Home.vue'
import Classify from '@/pages/classify.vue'
import List from '@/pages/list.vue'
import Listdetail from '@/pages/listdetail.vue'
import Person from '@/pages/person.vue'
import Remind from '@/pages/Remind.vue'
import NewRemind from '@/pages/NewRemind.vue'
import Mineinfo from '@/pages/Mineinfo.vue'
import Cart from '@/pages/Cart.vue'
import Order from '@/pages/Order.vue'
import paysuc from '@/pages/pay_suc.vue'

import gays from '@/components/classify/gays.vue'
import colleagues from '@/components/classify/colleagues.vue'
import tsdetail from '@/components/classify/tsdetail.vue'
import gift from '@/components/classify/gift.vue'
import haitao from '@/components/classify/haitao.vue'
import nvyou from '@/components/classify/nvyou.vue'
import nvyoudetail from '@/components/classify/nvyoudetail.vue'
import zhangbei from '@/components/classify/zhangbei.vue'
import cysh from '@/components/classify/cysh.vue'
import qpgg from '@/components/classify/qpgg.vue'
import mmd from '@/components/classify/mmd.vue'
import kjf from '@/components/classify/kjf.vue'
import sjg from '@/components/classify/sjg.vue'
import wyf from '@/components/classify/wyf.vue'
import address from '@/pages/address.vue'
import addressEdit from '@/pages/addressEdit.vue'
import OrderList from '@/pages/OrderList.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/login',
      name: 'Login',
      component: Login

    }, {
      path: '/main',
      name: 'Main',
      component: Main,
      beforeEnter: (to, from, next) => {
        console.log('进入mainPage模板')
        console.log(to)
        console.log(from)
        next() // 支持跳转  感觉像goto或者汇编里面的jump
      }
    }, {
      path: '/jxdetail/:id',
      // path: '/posts/:id/content',
      name: 'jxdetail',
      component: Jxdetail
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/listdetail/:id',
      // path: '/posts/:id/content',
      name: 'Listdetail',
      component: Listdetail
    },
    {
      path: '/classify',
      name: 'Classify',
      component: Classify
    }, {
      path: '/person',
      name: 'Person',
      component: Person

    },
    {
      path: '/remind',
      name: 'Remind',
      component: Remind
    },
    {
      path: '/newremind',
      name: 'NewRemind',
      component: NewRemind
    }, {
      path: '/mineinfo',
      name: 'Mineinfo',
      component: Mineinfo
    }, {
      path: '/cart',
      name: 'Cart',
      component: Cart
    }, {
      path: '/order',
      name: 'order',
      component: Order
    }, {
      path: '/paysuc',
      name: '/paysuc',
      component: paysuc
    },
    // 攻略
    {
      path: '/gift',
      name: '/gift',
      component: gift
    }, {
      path: '/haitao',
      name: '/haitao',
      component: haitao
    }, {
      path: '/nvyou',
      name: '/nvyou',
      component: nvyou
    }, {
      path: '/nydetail/:id',
      // path: '/posts/:id/content',
      name: 'nydetail',
      component: nvyoudetail
    }, {
      path: '/tongshi',
      name: '/tongshi',
      component: colleagues
    }, {
      path: '/tsdetail/:id',
      // path: '/posts/:id/content',
      name: 'tsdetail',
      component: tsdetail
    }, {
      path: '/gay',
      name: '/gay',
      component: gays
    }, {
      path: '/zhangbei',
      name: '/zhangbei',
      component: zhangbei
    }, {
      path: '/chuangyishenghuo',
      name: '/chuangyishenghuo',
      component: cysh
    }, {
      path: '/qipagaoguai',
      name: '/qipagaoguai',
      component: qpgg
    }, {
      path: '/kejifan',
      name: '/kejifan',
      component: kjf
    }, {
      path: '/mengmengda',
      name: '/mengmengda',
      component: mmd
    }, {
      path: '/shejigan',
      name: '/shejigan',
      component: sjg
    }, {
      path: '/wenyifeng',
      name: '/wenyifeng',
      component: wyf
    }, {
      path: '/address',
      name: '/address',
      component: address
    }, {
      path: '/addressEdit',
      name: '/addressEdit',
      component: addressEdit
    }, {
      path: '/OrderList',
      name: '/OrderList',
      component: OrderList
    }
  ]
})
