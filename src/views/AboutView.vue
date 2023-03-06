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
      <van-collapse-item title="qq" name="7">
        {{ info.qq }}
      </van-collapse-item>
    </van-collapse>
    <el-button :disabled="modify">修改信息</el-button>
    <span>信息有误,需要修改?</span>
    <el-button @click="applyVisible=true">申请修改</el-button>
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

</template>

<script lang="ts" setup>

import {reactive, ref} from "vue";
import request from "@/request/request";

//学号
const stuNum = ref('')
//信息可见值
const infoVisible = ref(false)
const activeNames = ref(["1", "2", "3", "4", "5", "6", "7"]);
const modify = ref(true)
const applyVisible = ref(false)


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

const auditTableInfo = reactive({
  applicant: '',
  auditor: null,
  reasonContent: '',
  result: '',
})

const findStudentInfo = () => {
  request.get("/student-info-entity/findStudentByStuNumber/" + stuNum.value).then(res => {
    info.value = res.data.data
    console.log(info.value)
    if (info.value.permissions == 1) {
      modify.value = false
    }
    infoVisible.value = true
  })
}

const makeSureApply = () => {
  auditTableInfo.applicant=info.value.stuId
  auditTableInfo.result="未通过"

  request.post("/audit-table-entity/insertAuditTable",auditTableInfo).then(res=>{
    console.log(res.data)
    applyVisible.value=false
  })
}

</script>

