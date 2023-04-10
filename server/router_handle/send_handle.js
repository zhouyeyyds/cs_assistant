const db=require("../sql")

exports.send=(req,res)=>{
    const sql="insert into suggestion(suggestion,date) values (?,?)"
    db.query(sql,[req.query.suggestion,req.query.date],(err,result)=>{
        if(err)
        return res.send({status:1,message:err.message})
        
        if(result.affectedRows!==1)
        return res.send({status:1,message:"发送失败"})
        
        console.log("/api/send");
        return res.send({status:0,message:"发送成功",data:result})
    })
}

