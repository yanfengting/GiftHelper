<template>
  <div class="newremind">
    <div id="head" class="head">
      <span class="title-left"
            @click="onClickLeft">
        <van-icon name="arrow-left"
                  class="leftback" />返回</span>
      <span class="title-mid">新建提醒</span>
      <span class="title-right"
            @click="save">保存</span>
    </div>
    <div>
      <p>提醒内容(必选)</p>
      <van-actionsheet v-model="show"
                       :actions="actions"
                       @select="onSelect" />
      <!-- 送礼对象 -->
      <van-cell :title="titleobj"
                class="color-grey"
                :style="obj"
                icon="contact"
                is-link
                @click="showpopupobj">
      </van-cell>
      <van-popup v-model="showobj"
                 position="bottom">
        <van-picker show-toolbar
                    title="请选择送礼对象"
                    :default-index="2"
                    :columns="object"
                    @cancel="onCancel"
                    @confirm="onConfirm1"
                    @change="onChange1" />
      </van-popup>
      <!-- 送礼原因 -->
      <van-cell :title="titlereason"
                class="color-grey"
                :style="rea"
                icon="question-o"
                is-link
                @click="showpopupreason" />
      <van-popup v-model="showreason"
                 position="bottom">
        <van-picker show-toolbar
                    title="请选择送礼原因"
                    :default-index="2"
                    :columns="reason"
                    @cancel="onCancel"
                    @confirm="onConfirm2"
                    @change="onChange2" />
      </van-popup>
      <!-- 送礼时间 -->
      <van-cell :title="titletime"
                class="color-grey"
                :style="tim"
                icon="clock-o"
                is-link
                @click="showpopuptime" />
      <van-popup v-model="show"
                 position="bottom">
        <van-datetime-picker v-model="currentDate"
                             title="请选择送礼时间"
                             :default-index="2"
                             type="date"
                             :min-date="minDate"
                             :max-date="maxDate"
                             :formatter="formatter"
                             @cancel="onCancel"
                             @confirm="onConfirm3"
                             @change="onChange3" />
      </van-popup>
    </div>
    <div>
      <p>备注内容</p>
      <van-cell-group>
        <van-field placeholder="最多可输入15个字"
                   left-icon="edit"
                   maxlength="15"
                   v-model="beizhu" />
      </van-cell-group>
      <p>提醒设置</p>

      <van-cell class="left">
        <template slot="title">
          <van-tag color="rgb(163, 162, 162)"
                   class="tag"
                   plain>默认</van-tag>
          <span>小礼君会提前10天和当天联系你</span>
        </template>
      </van-cell>

      <!-- <van-cell class="left">
        <template slot="title">
          <van-tag color="rgb(163, 162, 162)"
                   class="tag1"
                   plain>可选</van-tag>
          <span style="display:inline-block">
            <van-checkbox-group v-model="result">
              <van-checkbox class="checkbox"
                            checked-color="#e71844"
                            v-for="(item) in list"
                            :key="item"
                            :name="item">
                提前 {{ item }} 天
              </van-checkbox>
            </van-checkbox-group>
          </span>
        </template>
      </van-cell> -->
    </div>
  </div>
</template>
<script>
import { NavBar, Button, Cell, CellGroup, Tag, Actionsheet, Field, Icon, Popup, Picker, DatetimePicker, Checkbox, CheckboxGroup } from 'vant'
export default {
  data () {
    return {
      list: ['7', '5', '1'],
      result: ['1'],
      titleobj: '送礼对象',
      titlereason: '送礼原因',
      titletime: '送礼时间',
      beizhu: '',
      obj: {
        color: '#a1a1a1'
      },
      rea: {
        color: '#a1a1a1'
      },
      tim: {
        color: '#a1a1a1'
      },
      showobj: false,
      showreason: false,
      show: false,
      minDate: new Date(2019, 1, 1),
      maxDate: new Date(2030, 1, 1),
      currentDate: new Date(),
      reason: ['生日', '纪念日', '升学/毕业', '婚礼', '商务', '其他'],
      object: ['爸爸', '妈妈', '老公', '老婆', '蓝颜', '红颜', '闺蜜', '基友', '其他'],
      actions: [
        {
          name: '选项'
        },
        {
          name: '选项',
          subname: '描述信息'
        }
      ]
    }
  },
  components: {
    [Button.name]: Button,
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Tag.name]: Tag,
    [Popup.name]: Popup,
    [Actionsheet.name]: Actionsheet,
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Picker.name]: Picker,
    [DatetimePicker.name]: DatetimePicker,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup
  },
  methods: {
    save () {
      console.log(this.titleobj)
      console.log(this.titlereason)
      console.log(this.titletime)
      console.log(this.beizhu)
      // console.log(this.result)
      let obj = {
        'sendPerson': this.titleobj,
        'sendReason': this.titlereason,
        'sendTime': this.titletime,
        'text': this.beizhu
      }
      this.axios.post('/users/remindList', obj).then((response) => {
        let res = response.data
        // 这里什么样的情况就是登出呢？查看cookie没有了
        // eslint-disable-next-line eqeqeq
        if (res.status == '0') {
          console.log(res)
           this.$router.push('/person')
          // this.username = res.result.username
        }
      })
      this.$router.push('/remind')
    },
    showpopupobj () {
      if (!this.showobj) {
        this.showobj = true
      } else {
        this.showobj = false
      }
    },
    showpopuptime () {
      if (!this.show) {
        this.show = true
      } else {
        this.show = false
      }
    },
    showpopupreason () {
      if (!this.showreason) {
        this.showreason = true
      } else {
        this.showreason = false
      }
    },
    onConfirm1 (value) {
      console.log(`当前值：${value}`)
      this.titleobj = value
      this.obj.color = 'black' // 点击来控制字体颜色切换
      this.showobj = false
    },
    onConfirm2 (value) {
      console.log(`当前值：${value}`)
      this.titlereason = value
      this.rea.color = 'black' // 点击来控制字体颜色切换
      this.showreason = false
    },
    onConfirm3 (value) {
      console.log(`当前值：${value}`)
      this.tim.color = 'black' // 点击来控制字体颜色切换
      this.show = false
    },
    onChange1 (e) {
      console.log(e.getValues())
      let endTimeArr = e.getValues()
      this.titleobj = `${endTimeArr[0]} `
      console.log(this.titleobj)
    },
    onChange2 (e) {
      console.log(e.getValues())
      let endTimeArr = e.getValues()
      this.titlereason = `${endTimeArr[0]} `
      console.log(this.titlereason)
    },
    onChange3 (e) {
      console.log(e.getValues())
      let endTimeArr = e.getValues()
      this.titletime = `${endTimeArr[0]}${endTimeArr[1]}${endTimeArr[2]}  `
      console.log(this.titletime)
    },
    onCancel () {
      this.showobj = false
      this.showreason = false
      this.show = false
    },

    // 通过传入 formatter 函数对选项文字进行处理
    formatter (type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day') {
        return `${value}日`
      }
      console.log(value)
      return value
    },
    onClickLeft () {
      window.history.go(-1)
    },
    onClickRight () {

    },
    onSelect (item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false
      console.log(item.name)
    }
  }
}
</script>
<style scoped>
.van-checkbox{
  margin-left:10px;
}
.checkbox {
  display: inline-block;
}
.color-grey {
  color: #a1a1a1;
}
.leftback {
  font-size: 22px;
  top: 5px;
}
.newremind {
  width: 100%;
  height: 100%;
  background-color: #faf4f4;
  color: black;
  padding-bottom: 110px;
}
.newremind p {
  color: rgb(163, 162, 162);
  font-size: 13px;
  text-align: left;
  padding: 10px;
}
.tag {
  position: relative;
  left: -10px;
}
.tag1 {
  position: relative;
  left: -10px;
}
.day {
  border: 1px solid rgb(236, 236, 236);
  margin-left: 10px;
  padding: 5px;
}
.left {
  text-align: left;
}
</style>
