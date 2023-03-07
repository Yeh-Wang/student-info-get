<template>
  <div id="login" v-show="!infoVisible">
    <h2>输入学号查看信息:</h2>
    <br>
    <el-input v-model="stuNum" clearable maxlength="11" show-word-limit style="width: 80%"/>
    <br><br><br>
    <el-button style="width: 80%;" @click="findStudentInfo">查看</el-button>
  </div>
  <div id="info" v-show="infoVisible" style="padding-bottom: 10rem">
    <van-collapse v-model=activeNames>
      <van-collapse-item title="学号" name="1">
        {{ info.stuNumber }}
      </van-collapse-item>
      <van-collapse-item title="姓名" name="2">
        {{ info.stuName }}
      </van-collapse-item>
      <van-collapse-item title="年龄" name="3">
        {{ info.age }}
      </van-collapse-item>
      <van-collapse-item title="性别" name="4">
        {{ info.sex }}
      </van-collapse-item>
      <van-collapse-item title="电话" name="5">
        {{ info.telephone }}
      </van-collapse-item>
      <van-collapse-item title="住址" name="6">
        {{ info.address }}
      </van-collapse-item>
      <van-collapse-item title="QQ" name="7">
        {{ info.qq }}
      </van-collapse-item>
    </van-collapse>
    <br>
    <el-button :disabled="modifyEnable" @click="modifyInfo2">修改信息</el-button>
    <br><br>
    <span style="font-size: small;color: red" @click="applyVisible=true">信息有误,需要修改?点击申请</span>
  </div>

  <el-dialog
      v-model="applyVisible"
      title="申请表"
      width="90%"
  >
    <el-form label-width="5rem">
      <el-form-item label="申请原因">
        <el-input type="textarea" v-model="auditTableInfo.reasonContent"/>
      </el-form-item>
      <el-button @click="makeSureApply">确认</el-button>
    </el-form>

  </el-dialog>

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
        <el-input v-model="modifyInfo.stuNumber" disabled />
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
        <el-input v-model="modifyInfo.telephone" clearable maxlength="11" show-word-limit />
      </el-form-item>
      <el-form-item label="家庭住址">
        <el-input v-model="modifyInfo.address" clearable/>
      </el-form-item>
      <el-form-item label="QQ">
        <el-input v-model="modifyInfo.qq" clearable maxlength="11" show-word-limit />
      </el-form-item>
      <el-button @click="submit">提交</el-button>
    </el-form>
  </el-dialog>

</template>

<script lang="ts" setup>

import {reactive, ref} from "vue";
import request from "@/request/request";
import {ElMessage} from "element-plus";

//学号
const stuNum = ref('')
//信息可见值
const infoVisible = ref(false)
const activeNames = ref(["1", "2", "3", "4", "5", "6", "7"]);
//修改按钮是否能用
const modifyEnable = ref(true)
//申请对话框可见性
const applyVisible = ref(false)
//修改对话框可见性
const modifyInfoVisible = ref(false)

interface stuInfo {
  stuId: string,
  stuNumber: string,
  stuName: string,
  age: number,
  sex: string,
  telephone: string,
  address: string,
  qq: string,
  permissions: number,
  learningAbility: string,
  expressAbility: string,
  thinkingAbility: string,
  executeAbility: string
}

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
const modifyInfo2 = () => {
  modifyInfoVisible.value = true
  modifyInfo.value = JSON.parse(JSON.stringify(info.value))
}

const submit = () => {
  if (modifyInfo.value.stuName===''){
    ElMessage({
      showClose:true,
      type: 'error',
      message:'名字不能为空'
    })
    return
  }
  if (modifyInfo.value.address===''){
    ElMessage({
      showClose:true,
      type: 'error',
      message:'地址不能为空'
    })
    return
  }
  if (modifyInfo.value.telephone===''){
    ElMessage({
      showClose:true,
      type: 'error',
      message:'电话不能为空'
    })
    return
  }
  request.post("/student-info-entity/updateStudent",modifyInfo.value).then(res=>{
    ElMessage({
      showClose:true,
      type: 'success',
      message:res.data.message
    })
    request.get("/student-info-entity/findStudentByStuNumber/" + stuNum.value).then(res => {
      info.value = res.data.data
      modifyInfoVisible.value=false
    })
  })
}

const auditTableInfo = reactive({
  applicant: '',
  auditor: null,
  reasonContent: '',
  result: '',
})


//通过学号查找信息
const findStudentInfo = () => {
  request.get("/student-info-entity/findStudentByStuNumber/" + stuNum.value).then(res => {
    console.log(res.data)
    if (res.data.data==null){
      ElMessage({
        type:'error',
        message:'该学号学生未填写信息',
        showClose:true,
      })
    }
    else {
      info.value = res.data.data
      console.log(info.value)
      if (info.value.permissions == 1) {
        modifyEnable.value = false
      }
      infoVisible.value = true
    }
  })
}
//确认提交申请
const makeSureApply = () => {
  auditTableInfo.applicant = info.value.stuId
  auditTableInfo.result = "未通过"

  request.post("/audit-table-entity/insertAuditTable", auditTableInfo).then(res => {
    console.log(res.data)
    applyVisible.value = false
    ElMessage({
      type: 'success',
      message: '提交申请成功,等待审核成功',
      showClose: true
    })
  })
}

</script>

