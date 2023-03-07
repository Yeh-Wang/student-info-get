<template>
  <el-card v-model="showDialog" center>修改成功，请关闭界面</el-card>
</template>
<script lang="ts" setup>

import {ref} from "vue";

const showDialog = ref(true)
</script>
