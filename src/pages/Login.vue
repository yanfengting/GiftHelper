<template>
  <div>
    <div class="login-wrap" v-show="showLogin">
      <h3>登录</h3>
      <!-- v-if区别，p标签显示不显示，v-if把标签干掉，v-show是hidden隐藏了 -->
      <p v-show="showTishi">{{ tishi }}</p>
      <input type="text" placeholder="请输入用户名" v-model="username" />
      <input type="password" placeholder="请输入密码" v-model="password" @keyup.enter="login" />
      <!-- 回车登录 @keyup.enter="login" -->
      <button @click="login">登 录</button>
      <span @click="ToRegister">没有账号？马上注册</span>
      <div style="margin-top:10px;font-size:12px; color:red" v-on:click="NoLogin">不想登录，去主页转转</div>
    </div>

    <div class="register-wrap" v-show="showRegister">
      <h3>注册</h3>
      <p v-show="showTishi">{{ tishi }}</p>
      <input type="text" placeholder="请输入用户名" v-model="newUsername" />
      <input type="password" placeholder="请输入密码" v-model="newPassword" />
      <input type="password" placeholder="请确认密码" v-model="renewPassword" />
      <button v-on:click="register">注 册</button>
      <span v-on:click="ToLogin">已有账号？马上登录</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showLogin: true,
      showRegister: false,
      showTishi: false,
      tishi: '',
      username: 'admin',
      password: '123456',
      newUsername: '',
      newPassword: '',
      renewPassword: ''
    };
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      this.axios.get('/users/checkLogin').then(response => {
        let res = response.data;
        console.log(res);
        // eslint-disable-next-line eqeqeq
        if (res.status == '0') {
          // this.nickName = res.result
        }
      });
    },
    NoLogin() {
      this.$router.push('/');
    },
    login() {
      // 要求密码长度大于8，且正则表达式要求必须同时含有字母和数字，否则报错
      // var re = /[a-zA-Z](?=.*?[1-9].*?)[a-zA-Z1-9]+|[1-9](?=.*?[a-zA-Z].*?)[a-zA-Z1-9]+/g
      // else if (!re.test(this.password)) {
      //   this.tishi('密码必须大于八位并且包含字母和数字')
      // }
      if (this.username === '' || this.password === '') {
        this.tishi('用户名或密码不能为空1233');
      } else {
        // localStorage.setItem('password', JSON.stringify(this.password))
        localStorage.setItem('username', JSON.stringify(this.username)); // JSON.stringify 将JSON转为字符串存到变量里

        // get传参加一个params
        this.axios
          .post('/users/login', {
            username: this.username,
            password: this.password
          })
          .then(res => {
            console.log(res);
            // let res = response.data
            // // eslint-disable-next-line eqeqeq
            // if (res.status == '0') {
            //   this.showTishi = true
            //   this.tishi = '登录成功'
            //   // to-do
            //   setTimeout(
            //     function () {
            //       this.$router.push('/home')
            //       // this.$router.push({ path: 'main', query: { id: 1 } })
            //     }.bind(this),
            //     500
            //   ) // 这是1秒延迟跳转
            // } else {
            //   this.showTishi = true
            //   this.tishi = '用户名或密码错误'
            // }
            if (res.status === 200) {
              // if (res.data.userInfo.username === 'admin') {
              //   this.$router.push('/main')
              // }
              if (res.data.code === 2) {
                this.tishi = '用户名或密码错误';
                this.showTishi = true;
                this.username = '';
                this.password = '';
              } else {
                this.tishi = '登录成功';
                this.showTishi = true;
                setTimeout(
                  function() {
                    this.$router.push('/');
                    // this.$router.push({ path: 'main', query: { id: 1 } })
                  }.bind(this),
                  500
                ); // 这是1秒延迟跳转
              }
            }
          });
      }
    },
    register() {
      if (this.newUsername === '' || this.newPassword === '') {
        this.tishi = '请输入用户名或密码';
        this.showTishi = true;
      } else {
        const registerUrl = '/users/register';
        var params = new URLSearchParams();
        params.append('username', this.newUsername);
        params.append('password', this.newPassword);
        params.append('repassword', this.renewPassword);
        this.axios({
          method: 'post',
          url: registerUrl,
          data: params
        })
          .then(res => {
            console.log(res);
            if (res.status === 200) {
              // 注册成功,1s后跳转到登录
              if (res.data.code === 1 || res.data.code === 2) {
                this.tishi = '用户名或密码不能为空';
                this.showTishi = true;
              } else if (res.data.code === 3) {
                this.tishi = '两次输入密码不一致';
                this.showTishi = true;
              } else if (res.data.code === 4) {
                this.tishi = '该用户已被注册';
                this.showTishi = true;
                this.username = '';
                this.password = '';
                setTimeout(
                  function() {
                    this.showRegister = false;
                    this.showLogin = true;
                    this.showTishi = false;
                  }.bind(this),
                  1000
                ); // 这是1秒延迟跳转
              } else {
                this.tishi = '注册成功';
                this.showTishi = true;
                this.username = '';
                this.password = '';
                setTimeout(
                  function() {
                    this.showRegister = false;
                    this.showLogin = true;
                    this.showTishi = false;
                  }.bind(this),
                  1000
                ); // 这是1秒延迟跳转
              }
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    ToLogin() {
      this.showRegister = false;
      this.showLogin = true;
    },
    ToRegister() {
      this.showRegister = true;
      this.showLogin = false;
    }
  }
};
</script>
<style>
.login-wrap,
.register-wrap {
  text-align: center;
  margin-top: 100px;
}
.login-wrap button {
  color: #fff;
}
.register-wrap button {
  color: #fff;
}
/* */
input {
  display: block;
  width: 250px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
  margin-bottom: 10px;
  outline: none;
  border: 1px solid #888;
  padding: 10px;
  box-sizing: border-box;
}
p {
  color: #e71844;
}
button {
  display: block;
  width: 250px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
  border: none;
  background-color: #e71844;
  color: #fff;
  font-size: 16px;
  margin-bottom: 5px;
}
span {
  cursor: pointer;
}
span:hover {
  color: #41b883;
}
</style>
