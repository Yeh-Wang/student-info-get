<template>
  <div id="login">
    <h2>输入学号查看信息:</h2>
    <br>
    <el-input v-model="stuNum" clearable maxlength="11" style="width: 80%" />
    <br><br><br>
    <el-button style="width: 80%;">查看</el-button>
  </div>
</template>

<script lang="ts" setup>

import {ref} from "vue";

//学号
const stuNum = ref('')

</script>

