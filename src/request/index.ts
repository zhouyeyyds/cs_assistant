import axios from "axios";// 先引入 

const service=axios.create({// 然后创建实例
    baseURL:"http://118.178.89.214:3000",// 配置公共请求头
    // 配置延迟时间
    timeout:3000  //设置延迟时间 比如3秒钟后回应请求超时 重新请求
})

// 请求拦截
service.interceptors.request.use(config=>{
    return config
},err=>{
    Promise.reject(err)
})

// 响应拦截
service.interceptors.response.use(res=>{
    return res
},err=>{
    Promise.reject(err)
})

//最后导出service实例
export default service