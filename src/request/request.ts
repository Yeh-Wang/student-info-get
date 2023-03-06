import axios from 'axios';//原生的axios



const request= axios.create({
    baseURL:'http://192.168.54.152:9090',
})


//整体导出
export default request;
