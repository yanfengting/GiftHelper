<template>
  <div id="app">
    <!-- <transition name="fade" mode="out-in"> -->
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <router-view />
    <!-- </transition> -->
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>

// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app'
  // components: {
  //   HelloWorld
  // }
}
</script>
<style >
/* body
  margin 0
  padding 0*/
p {
  font-size: 13px;
  color: black;
  padding: 0;
  margin: 0;
  margin-top: 5px;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #555;
}
.clearfix:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.van-tab span:hover {
  color: #e71844;
}
/* .fade-enter
  opacity 0
.fade-enter-active
  transition opacity 0.5s
.fade-leave
  opacity 1
.fade-leave-active
  opacity 0
  transition opacity 0.5s */
</style>
