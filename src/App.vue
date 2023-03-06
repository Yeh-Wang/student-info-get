<template>
  <div>
    <router-view />
  </div>
  <div>
  <van-action-bar>
    <van-action-bar-button type="primary" text="填写信息" @click="onClickFill" />
    <van-action-bar-button type="primary" text="个人信息" @click="onClickPerson" />
  </van-action-bar>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router";

const onClickFill = () =>{
  router.push({
    path:"/"
  })
}
const onClickPerson = () =>{
  router.push({
    path:"/about"
  })
}
</script>

<style lang="scss">
#app {
  font-family: 'Helvetica Neue', Helvetica, Avenir, 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 16px;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
