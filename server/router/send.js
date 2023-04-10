const express=require("express");
const router=express.Router()

// 导入处理函数
const send_handle=require("../router_handle/send_handle")
// 路由挂载 请求所有的题目
router.get("/api/send",send_handle.send)


module.exports=router;