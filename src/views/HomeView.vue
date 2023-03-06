<template>
  <van-nav-bar title="学生信息录入"/>
  <van-form @submit="onSubmit" v-model="form">
    <van-field v-model="form.stuNumber" name="学号" maxlength="11" show-word-limit label="学号" :rules="[{ required: true, message: '请填写学号' }]"/>
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
    <van-popup :show="showArea" position="bottom" >
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
        <van-col :span="6">
          <van-button plain :disabled="oneBut" size="small" type="primary" @click="getLearnAbility">学习能力</van-button>
        </van-col>
        <van-col :span="6">
          <van-button plain :disabled="twoBut" size="small" type="primary" @click="getThinkingAbility">思维能力</van-button></van-col>
        <van-col :span="6">
          <van-button plain :disabled="threeBut" size="small" type="primary" @click="getExpressAbility">表达能力</van-button></van-col>
        <van-col :span="6">
          <van-button plain :disabled="fourBut" size="small" type="primary" @click="getExecuteAbility">执行能力</van-button></van-col>
      </van-row>
    </div>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit" :disabled="submitBut">
        提交
      </van-button>
    </div>
  </van-form>

  <el-dialog v-model="showAbility" width="90%" title="能力测试">
    <div v-for="(item, i) in questionInfo" :key="i" class="learnShow">
      <div class="van-hairline--top"></div>
      <div class="question" style="text-align: left"><span style="color: red;">*</span>{{ ++i }}.{{ item.content }}</div>
      <br>
      <van-radio-group v-model="item.answer" icon-size="small">
<!--        <van-space wrap>-->
          <van-radio name="A">A.{{ item.optionA }}</van-radio>
        <br>
          <van-radio name="B">B.{{ item.optionB }}</van-radio>
        <br>
          <van-radio name="C">C.{{ item.optionC }}</van-radio>
        <br>
          <van-radio name="D">D.{{ item.optionD }}</van-radio>
<!--        </van-space>-->
      </van-radio-group>
      <br>
      <div class="van-hairline--bottom"></div>
      <!--    <van-button @click="showAnswer(item)">Show Answer</van-button>-->
    </div>
    <van-button type="primary" block @click="confirm(str)">提交</van-button>
  </el-dialog>

</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import request from "@/request/request";
import { areaList } from '@vant/area-data';
import {showDialog} from "vant";
import {ElMessage} from "element-plus";
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

const submitBut = ref(false)

const now_date = new Date()
const minDate = ref(new Date(1990, 1, 1))
const maxDate= ref(new Date(2025, 1, 1))
const result = ref('');
const showPicker = ref(false);
const onConfirm = ({ selectedValues }) => {
  result.value = selectedValues.join('');
  form.age=now_date.getFullYear()- parseInt(result.value.slice(0,4))
  showPicker.value = false;
};
const result_1 = ref('');
const showArea = ref(false);
const onConfirm_1 = ({ selectedOptions }) => {
  showArea.value = false;
  result_1.value = selectedOptions.map((item) => item.text).join('/');
  form.address=result_1.value
};
const onSubmit = () => {
  request.post("/student-info-entity/insertStudentInfo",form).then(res =>{
    ElMessage.success(res.data.message)
    submitBut.value=true
  })
}
//能力测试
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


const str = ref("")
//学习能力
const oneBut = ref(false)
const twoBut = ref(false)
const threeBut = ref(false)
const fourBut = ref(false)
const showAbility = ref(false)
const getLearnAbility = ()=>{
  str.value="1"
  request.get("/question-source-entity/getQuestionByType/"+"学习能力").then(res =>{
    questionInfo.splice(0,questionInfo.length)
    questionInfo.push(...res.data.data)
    showAbility.value=true
  })
}
const getThinkingAbility = ()=>{
  str.value="2"
  showAbility.value=true
  request.get("/question-source-entity/getQuestionByType/"+"思维能力").then(res =>{
    questionInfo.splice(0,questionInfo.length)
    questionInfo.push(...res.data.data)
  })
}
const getExpressAbility = ()=>{
  str.value="3"
  request.get("/question-source-entity/getQuestionByType/"+"表达能力").then(res =>{
    questionInfo.splice(0,questionInfo.length)
    questionInfo.push(...res.data.data)
    showAbility.value=true
  })
}
const getExecuteAbility = ()=>{
  str.value="4"
  request.get("/question-source-entity/getQuestionByType/"+"执行能力").then(res =>{
    questionInfo.splice(0,questionInfo.length)
    questionInfo.push(...res.data.data)
    showAbility.value=true
  })
}

const confirm = (str:string)=>{
  if(str==="1"){
    let score = 0;
    for(let i=0;i<questionInfo.length;i++){
      if(questionInfo[i].answer==="A"){
        score=score+questionInfo[i].scoreA
      }else if(questionInfo[i].answer==="B"){
        score=score+questionInfo[i].scoreB
      }else if(questionInfo[i].answer==="C"){
        score=score+questionInfo[i].scoreC
      }else if(questionInfo[i].answer==="D"){
        score=score+questionInfo[i].scoreD
      }
    }
    form.learningAbility=score.toString()
    oneBut.value=true

  }else if(str==="2"){
    let score = 0;
    for(let i=0;i<questionInfo.length;i++){
      if(questionInfo[i].answer==="A"){
        score=score+questionInfo[i].scoreA
      }else if(questionInfo[i].answer==="B"){
        score=score+questionInfo[i].scoreB
      }else if(questionInfo[i].answer==="C"){
        score=score+questionInfo[i].scoreC
      }else if(questionInfo[i].answer==="D"){
        score=score+questionInfo[i].scoreD
      }
    }
    form.thinkingAbility=score.toString()
    twoBut.value=true
  }else if(str==="3"){
    let score = 0;
    for(let i=0;i<questionInfo.length;i++){
      if(questionInfo[i].answer==="A"){
        score=score+questionInfo[i].scoreA
      }else if(questionInfo[i].answer==="B"){
        score=score+questionInfo[i].scoreB
      }else if(questionInfo[i].answer==="C"){
        score=score+questionInfo[i].scoreC
      }else if(questionInfo[i].answer==="D"){
        score=score+questionInfo[i].scoreD
      }
    }
    form.expressAbility=score.toString()
    threeBut.value=true
  }else if(str==="4"){
    let score = 0;
    for(let i=0;i<questionInfo.length;i++){
      if(questionInfo[i].answer==="A"){
        score=score+questionInfo[i].scoreA
      }else if(questionInfo[i].answer==="B"){
        score=score+questionInfo[i].scoreB
      }else if(questionInfo[i].answer==="C"){
        score=score+questionInfo[i].scoreC
      }else if(questionInfo[i].answer==="D"){
        score=score+questionInfo[i].scoreD
      }
    }
    form.executeAbility=score.toString()
    fourBut.value=true
  }
  showAbility.value=false
}

onMounted(()=>{
})
</script>

<style>
.learnShow{
  font-size: 15px;
}
</style>
