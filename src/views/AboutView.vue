<template>
  <!--  <div v-for="item in questionInfo">-->
  <!--    <van-space direction="vertical">-->
  <!--    <van-row>-->
  <!--      <van-col span="24">{{item.content}}</van-col>-->
  <!--    </van-row>-->
  <!--    <van-radio-group icon-size="small" v-model="item.answer" direction="horizontal">-->
  <!--      <van-radio name="A">{{item.optionA}}</van-radio>-->
  <!--      <van-radio name="B">{{item.optionB}}</van-radio>-->
  <!--      <van-radio name="C">{{item.optionC}}</van-radio>-->
  <!--      <van-radio name="D">{{item.optionD}}</van-radio>-->
  <!--    </van-radio-group>-->
  <!--    </van-space>-->
  <!--  </div>-->
  <div v-for="(item, i) in questionInfo" :key="i">
    <div class="van-hairline--top"></div>
    <div class="question"><span style="color: red">*</span>{{ ++i }}.{{ item.content }}</div>
    <br>
    <van-radio-group v-model="item.answer" icon-size="small">
      <van-space wrap>
        <van-radio name="A">{{ item.optionA }}</van-radio>
        <van-radio name="B">{{ item.optionB }}</van-radio>
        <van-radio name="C">{{ item.optionC }}</van-radio>
        <van-radio name="D">{{ item.optionD }}</van-radio>
      </van-space>
    </van-radio-group>
    <br>
    <div class="van-hairline--bottom"></div>
<!--    <van-button @click="showAnswer(item)">Show Answer</van-button>-->

  </div>

</template>

<script lang="ts" setup>
import {onMounted, reactive} from "vue";
import request from "@/request/request";

interface question {
  id: string,
  content: string,
  optionA: string,
  optionB: string,
  optionC: string,
  optionD: string,
  questionType: string,
  scoreA: number,
  scoreB: number,
  scoreC: number,
  scoreD: number,
  answer: string,
}

const questionInfo: question[] = reactive([])
const showAnswer = (row:question)=>{
  alert(row.answer)
}

onMounted(() => {
  request.get("/question-source-entity/getAllQuestion").then(res => {
    questionInfo.push(...res.data.data)
    console.log(questionInfo)
  })
})
</script>

