<template>
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
})
</script>
