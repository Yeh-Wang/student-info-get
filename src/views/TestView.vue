<template>
 <el-button type="primary" @click="sentEmail">发送邮件</el-button>
</template>

<script lang="ts" setup>

const sentEmail = () =>{
  Email.send({
    Host: "smtp.163.com",  //邮箱地址
    Username: "Yeh Wang",
    Password: "NKPWNKROEOHMYXDB",//授权码
    To: "1627082750@qq.com",//接收邮件的地址
    From: "wyx1627082750@163.com",//发送邮箱的地址
    Subject: "合规确认消息提醒",//邮件主题
    Body: "xxxxxxxxxxxxxxx"  //邮件内容
  }).then(
      alert("sssss")//发送成功提示
  )
}

</script>

<style scoped>

</style>
