<template>


  <van-nav-bar title="学生信息录入"/>
  <van-form @submit="onSubmit" v-model="form">
    <van-field v-model="form.stuNumber" name="学号" label="学号" :rules="[{ required: true, message: '请填写学号' }]"/>
    <van-field v-model="form.stuName" name="名字" label="名字" :rules="[{ required: true, message: '请填写姓名' }]"/>
    <van-field
        v-model="result"
        is-link
        readonly
        name="datePicker"
        label="生日"
        placeholder="点击选择日期"
        @click="showPicker = true"
    />
    <van-popup :show="showPicker" position="bottom">
      <van-date-picker :min-date="minDate" :max-date="maxDate" @confirm="onConfirm" @cancel="showPicker = false" />
    </van-popup>
    <van-field name="radio" label="性别">
      <template #input>
        <van-radio-group v-model="form.sex" direction="horizontal">
          <van-radio name="男">男</van-radio>
          <van-radio name="女">女</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <van-field
        v-model="form.telephone"
        rows="2"
        label="电话号码"
        maxlength="11"
        placeholder="请输入电话号码"
        show-word-limit
    />
    <van-field
        v-model="result_1"
        is-link
        readonly
        name="area"
        label="家庭住址"
        placeholder="点击选择省市区"
        @click="showArea = true"
    />
    <van-popup :show="showArea" position="bottom">
      <van-area
          :area-list="areaList"
          @confirm="onConfirm_1"
          @cancel="showArea = false"
      />
    </van-popup>
    <van-field
        v-model="form.qq"
        rows="2"
        label="QQ"
        maxlength="11"
        placeholder="请输入QQ号码"
        show-word-limit
    />
    <div>
      <van-row>
        <van-col :span="6">学习能力测试</van-col>
        <van-col :span="6">思维能力测试</van-col>
        <van-col :span="6">da能力测试</van-col>
        <van-col :span="6">能力测试</van-col>
      </van-row>
    </div>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

  <!--  <div v-for="item in questionTable.info">-->
  <!--    {{item.content}}-->
  <!--    <van-radio-group v-model="item.answer" direction="horizontal">-->
  <!--      <van-radio name="1">单选框 1</van-radio>-->
  <!--      <van-radio name="2">单选框 2</van-radio>-->
  <!--    </van-radio-group>-->
  <!--  </div>-->
  <!--  <div v-for="(item,index) in questionTable" :key="index">-->
  <!--    {{item.content}}-->
  <el-radio-group v-model="result_1" direction="horizontal">
<!--          <el-radio name="1">{{ questionTable[0].optionB }}</el-radio>-->
    <el-radio name="2">单选框 2</el-radio>

  </el-radio-group>
  <p>{{questionTable[0]}}</p>
  <el-button @click="goToTest">goto Test</el-button>
  <el-button @click="test">www</el-button>
  <!--  </div>-->
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import request from "@/request/request";
import { areaList } from '@vant/area-data';
import {create} from "axios";
import router from "@/router";
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

interface question{
  id:string,
  content:string,
  optionA:string,
  optionB:string,
  optionC:string,
  optionD:string,
  questionType:string,
  scoreA:number,
  scoreB:number,
  scoreC:number,
  scoreD:number,
}
const form: stuInfo = reactive({
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

const questionTable:question[] = reactive([])

const now_date = new Date()
const minDate = ref(new Date(1990, 1, 1))
const maxDate= ref(new Date(2025, 1, 1))
const result = ref('');
const showPicker = ref(false);
const onConfirm = ({ selectedValues }) => {
  result.value = selectedValues.join('');
  result.value = result.value.slice(0,4)
  form.age=now_date.getFullYear()- parseInt(result.value)
  showPicker.value = false;
};
const result_1 = ref('');
const showArea = ref(false);
const onConfirm_1 = ({ selectedOptions }) => {
  showArea.value = false;
  result_1.value = selectedOptions.map((item) => item.text).join('/');
};

const onSubmit = () =>{
  // request.post("/student-info-entity/insertStudentInfo",form).then(res =>{
  //   console.log(res.data)
  // })
}

const goToTest = () =>{
  router.push({
    path:'/test'
  })
}

const test = ()=>{
  request.get("/question-source-entity/getAllQuestion").then(res => {
    questionTable.push(...res.data.data)
    // console.log(questionTable.info)
    // console.log(questionTable)
    // console.log(questionTable[0])
  })
}

onMounted(() => {
  request.get("/question-source-entity/getAllQuestion").then(res => {
    questionTable.push(...res.data.data)
    // console.log(questionTable.info)
    // console.log(questionTable)
    // console.log(questionTable[0])
  })
})
</script>

<style lang="scss">
#app {
  font-family: 'Helvetica Neue', Helvetica, Avenir, 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
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
