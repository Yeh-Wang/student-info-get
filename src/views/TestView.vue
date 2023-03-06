<template>
  {{questionTable.info}}
</template>

<script lang="ts">
import {defineComponent, reactive} from "vue";
import request from "@/request/request";


export default defineComponent({
  name: "TestView",
  created() {
    request.get("/question-source-entity/getAllQuestion").then(res => {
      this.questionTable.info=res.data.data
      console.log(res.data.data)
      // console.log(questionTable.info)
      // console.log(questionTable)
      console.log(this.questionTable.info)
    })
  },
  setup(){
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
    // const questionTable:question[] = reactive([])
    const questionTable = reactive({
      info:[{
        id:'',
        content:'',
        optionA:'',
        optionB:'',
        optionC:'',
        optionD:'',
        questionType:'',
        scoreA:0,
        scoreB:0,
        scoreC:0,
        scoreD:0,
      }]
    })

    return{
      questionTable,

    }
  }
})
</script>

<style scoped>

</style>