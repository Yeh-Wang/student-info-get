<template>
  <nav>
    <router-link to="/">信息填写</router-link> |
    <router-link to="/about">能力测试</router-link>
  </nav>
  <router-view/>
</template>

<script lang="ts"  setup>
import {onMounted} from "vue";
import request from "@/request/request";

onMounted(()=>{
  request.get("/question-source-entity/getAllQuestion").then(res=>{
    console.log(res)
  })
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
