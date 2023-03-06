<template>
  <div v-for="item in questionInfo">
    <van-space direction="vertical">
    <van-row>
      <van-col span="24">{{item.content}}</van-col>
    </van-row>
    <van-radio-group icon-size="small" v-model="item.answer" direction="horizontal">
      <van-radio name="A">{{item.optionA}}</van-radio>
      <van-radio name="B">{{item.optionA}}</van-radio>
      <van-radio name="C">{{item.optionA}}</van-radio>
      <van-radio name="D">{{item.optionA}}</van-radio>
    </van-radio-group>
    </van-space>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive} from "vue";
import request from "@/request/request";
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
  answer:string,
}
const questionInfo:question[] = reactive([])

onMounted(()=>{
  request.get("/question-source-entity/getAllQuestion").then(res=>{
    questionInfo.push(...res.data.data)
    console.log(questionInfo)
  })
})
</script>

