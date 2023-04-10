const mysql=require("mysql");
const db=mysql.createPool({
    host:"localhost",
    user:"root",
    database:"test",
    password:"123456",
})

module.exports=db;