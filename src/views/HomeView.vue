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
<!--    <div>-->
<!--      <van-row>-->
<!--        <van-col :span="6">-->
<!--          <van-button icon="plus" @click="getLearnAbility"/>-->
<!--        </van-col>-->
<!--        <van-col :span="6">思维能力测试</van-col>-->
<!--        <van-col :span="6">da能力测试</van-col>-->
<!--        <van-col :span="6">能力测试</van-col>-->
<!--      </van-row>-->
<!--    </div>-->
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import request from "@/request/request";
import { areaList } from '@vant/area-data';
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

onMounted(()=>{
})
</script>
