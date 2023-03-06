import axios from 'axios';//原生的axios



const request= axios.create({
    baseURL:'http://47.109.49.197:9090',
})


//整体导出
export default request;
