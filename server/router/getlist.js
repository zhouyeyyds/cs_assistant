const express=require("express");
const router=express.Router()

// 导入处理函数
const getlist_handle=require("../router_handle/getlist_handle")
// 路由挂载 请求所有的题目
router.get("/api/test",getlist_handle.getlist)


module.exports=router;

