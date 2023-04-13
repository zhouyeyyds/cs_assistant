const mysql=require("mysql");//引入mysql模块
const db=mysql.createPool({//创建连接池
    host:"localhost",//主机号
    user:"root",//用户名
    password:"123456",//密码
    database:"test",//数据库
})

module.exports=db;//最后导出