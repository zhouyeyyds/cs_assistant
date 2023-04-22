const mysql=require("mysql");//引入mysql模块
const db=mysql.createPool({//创建连接池
    host:"127.0.0.1",//主机号
    user:"zhouye_yyds",//用户名
    password:"123456",//密码
    database:"zhouye_yyds",//数据库
})

module.exports=db;//最后导出