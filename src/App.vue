<template>

<router-view/>

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

const goToAbout = () =>{
  router.push({
    path:'/test'
  })
}

const test = ()=>{
  request.get("/question-source-entity/getAllQuestion").then(res => {
    questionTable.push(...res.data.data)
    // console.log(questionTable.info)
    // console.log(questionTable)
    console.log(questionTable[0])
  })
}

onMounted(() => {
  request.get("/question-source-entity/getAllQuestion").then(res => {
    questionTable.push(...res.data.data)
    // console.log(questionTable.info)
    // console.log(questionTable)
    console.log(questionTable[0])
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
