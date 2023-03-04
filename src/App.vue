<template>



<!--  <van-dialog v-model:show="show" title="标题" show-cancel-button>-->
<!--    <div v-for="item in questionTable.info">-->
<!--    <van-row >-->
<!--      <van-col :span="24">-->
<!--      {{item.content}}-->

      <van-radio-group v-model="questionTable.info[1].answer" direction="horizontal">
        <van-radio name="fds">{{questionTable.info[1].optionA}}</van-radio>
        <van-radio :name="questionTable.info[1].optionB">{{questionTable.info[1].optionB}}</van-radio>
        <van-radio :name="questionTable.info[1].optionC">{{questionTable.info[1].optionC}}</van-radio>
        <van-radio :name="questionTable.info[1].optionD">{{questionTable.info[1].optionD}}</van-radio>
      </van-radio-group>



<!--      </van-col>-->
<!--    </van-row>-->
<!--    </div>-->
<!--  </van-dialog>-->


</template>

<script lang="ts"  setup>
import {onMounted, reactive,ref} from "vue";
import request from "@/request/request";
const show = ref(true);
const questionTable= reactive({
  info:[{
    id:'',
    content:'',
    questionType:'',
    optionA:'',
    optionB:'',
    optionC:'',
    optionD:'',
    scoreA:0,
    scoreB:0,
    scoreC:0,
    scoreD:0,
    answer:''
  }]
})

interface stuInfo{
  stuId: string,
  stuNumber: string,
  stuName:string,
  age: number,
  sex:string,
  telephone: string,
  address: string,
  qq: string,
  permissions:number,
  learningAbility:string,
  expressAbility:string,
  thinkingAbility:string,
  executeAbility:string
}

const calculateScore = ()=>{
for (let i=0;i<questionTable.info.length;i++){
  if (questionTable.info[i].answer==='A'){
    if (questionTable.info[i].questionType==="学习能力"){
      form.learningAbility=form.learningAbility+questionTable.info[i].scoreA
    }
    if (questionTable.info[i].questionType==="执行能力"){
      form.executeAbility=form.executeAbility+questionTable.info[i].scoreA
    }
    if (questionTable.info[i].questionType==="表达能力"){
      form.expressAbility=form.expressAbility+questionTable.info[i].scoreA
    }
    if (questionTable.info[i].questionType==="思维能力"){
      form.thinkingAbility=form.thinkingAbility+questionTable.info[i].scoreA
    }
  }
  if (questionTable.info[i].answer==='B'){
    if (questionTable.info[i].questionType==="学习能力"){
      form.learningAbility=form.learningAbility+questionTable.info[i].scoreB
    }
    if (questionTable.info[i].questionType==="执行能力"){
      form.executeAbility=form.executeAbility+questionTable.info[i].scoreB
    }
    if (questionTable.info[i].questionType==="表达能力"){
      form.expressAbility=form.expressAbility+questionTable.info[i].scoreB
    }
    if (questionTable.info[i].questionType==="思维能力"){
      form.thinkingAbility=form.thinkingAbility+questionTable.info[i].scoreB
    }
  }
  if (questionTable.info[i].answer==='C'){
    if (questionTable.info[i].questionType==="学习能力"){
      form.learningAbility=form.learningAbility+questionTable.info[i].scoreC
    }
    if (questionTable.info[i].questionType==="执行能力"){
      form.executeAbility=form.executeAbility+questionTable.info[i].scoreC
    }
    if (questionTable.info[i].questionType==="表达能力"){
      form.expressAbility=form.expressAbility+questionTable.info[i].scoreC
    }
    if (questionTable.info[i].questionType==="思维能力"){
      form.thinkingAbility=form.thinkingAbility+questionTable.info[i].scoreC
    }
  }
  if (questionTable.info[i].answer==='D'){
    if (questionTable.info[i].questionType==="学习能力"){
      form.learningAbility=form.learningAbility+questionTable.info[i].scoreD
    }
    if (questionTable.info[i].questionType==="执行能力"){
      form.executeAbility=form.executeAbility+questionTable.info[i].scoreD
    }
    if (questionTable.info[i].questionType==="表达能力"){
      form.expressAbility=form.expressAbility+questionTable.info[i].scoreD
    }
    if (questionTable.info[i].questionType==="思维能力"){
      form.thinkingAbility=form.thinkingAbility+questionTable.info[i].scoreD
    }
  }
}
}

const form:stuInfo = reactive({
  stuId: "",
  stuNumber: " ",
  stuName:"",
  age: 0,
  sex:"",
  telephone: "",
  address: "",
  qq: " ",
  permissions:0,
  learningAbility:"",
  expressAbility:"",
  thinkingAbility:"",
  executeAbility:""
})

onMounted(()=>{
  request.get("/question-source-entity/getAllQuestion").then(res=>{
    questionTable.info.push(res.data.data)
    // questionTable.info=res.data.data
    console.log(questionTable.info)
  })
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
