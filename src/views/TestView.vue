<template>
  <div id="login" >
    <h2>输入学号修改信息:</h2>
    <br>
    <el-input v-model="stuNum" clearable maxlength="11" show-word-limit style="width: 80%"/>
    <br><br><br>
    <el-button style="width: 80%;" @click="findStudentInfo">查找</el-button>
  </div>

  <el-dialog
      title="修改个人信息"
      width="90%"
      v-model="modifyInfoVisible"
  >
    <el-form label-width="5rem">
      <el-form-item label="姓名">
        <el-input v-model="modifyInfo.stuName" clearable/>
      </el-form-item>
      <el-form-item label="学号">
        <el-input v-model="modifyInfo.stuNumber" disabled/>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="modifyInfo.age" clearable/>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="modifyInfo.sex">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="modifyInfo.telephone" clearable maxlength="11" show-word-limit/>
      </el-form-item>
      <el-form-item label="家庭住址">
        <el-input v-model="modifyInfo.address" clearable/>
      </el-form-item>
      <el-form-item label="QQ">
        <el-input v-model="modifyInfo.qq" clearable maxlength="11" show-word-limit/>
      </el-form-item>
      <el-button @click="submit">提交</el-button>
    </el-form>
  </el-dialog>

</template>

<script lang="ts" setup>

import {onMounted, reactive, ref} from "vue";
import request from "@/request/request";
import {ElMessage} from "element-plus";

//学号
const stuNum = ref('')
//修改对话框可见性
const modifyInfoVisible = ref(false)

const info = ref({
  stuId: "",
  stuNumber: "",
  stuName: "",
  age: 0,
  sex: "",
  telephone: "",
  address: "",
  qq: " ",
  permissions: 0,
  learningAbility: "",
  expressAbility: "",
  thinkingAbility: "",
  executeAbility: ""
})

const modifyInfo = ref({
  stuId: "",
  stuNumber: "",
  stuName: "",
  age: 1,
  sex: "",
  telephone: "",
  address: "",
  qq: " ",
  permissions: 0,
  learningAbility: "",
  expressAbility: "",
  thinkingAbility: "",
  executeAbility: "",
})

const submit = () => {
  if (modifyInfo.value.stuName === '') {
    ElMessage({
      showClose: true,
      type: 'error',
      message: '名字不能为空'
    })
    return
  }
  if (modifyInfo.value.address === '') {
    ElMessage({
      showClose: true,
      type: 'error',
      message: '地址不能为空'
    })
    return
  }
  if (modifyInfo.value.telephone === '') {
    ElMessage({
      showClose: true,
      type: 'error',
      message: '电话不能为空'
    })
    return
  }
  request.post("/student-info-entity/updateSelfInfo", modifyInfo.value).then(res => {
    ElMessage({
      showClose: true,
      type: 'success',
      message: res.data.message
    })
    request.get("/student-info-entity/findStudentByStuNumber/" + stuNum.value).then(res => {
      info.value = res.data.data
      modifyInfoVisible.value = false
    })
  })
}



//通过学号查找信息
const findStudentInfo = () => {
  request.get("/student-info-entity/findStudentByStuNumber/" + stuNum.value).then(res => {
    console.log(res.data)
    if (res.data.data == null) {
      ElMessage({
        type: 'error',
        message: '该学号学生未填写信息',
        showClose: true,
      })
    }else if(res.data.data.permissions===0){
      ElMessage({
        type: 'error',
        message: '无权限修改，如果已经申请请等待申请通过',
        showClose: true,
      })
    } else {
      modifyInfo.value = res.data.data
      console.log(modifyInfo.value)
      modifyInfoVisible.value = true
    }
  })
}

</script>


