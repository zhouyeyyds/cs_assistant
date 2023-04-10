const express=require("express");
const cors=require("cors")
const app=express();

// 配置解析表单数据的中间件
app.use(express.urlencoded({extended:false}))
// 配置跨域请求 需要在配置路由之前
app.use(cors())

const listRouter=require("./router/getlist")
const sendRouter=require("./router/send")

app.use(listRouter)
app.use(sendRouter)


app.listen(3000,()=>{
    console.log("localhost:3000 已经启动");
})