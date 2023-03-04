import axios from 'axios';//原生的axios



const request= axios.create({
    baseURL:'http://localhost:9090',
})


//整体导出
export default request;
