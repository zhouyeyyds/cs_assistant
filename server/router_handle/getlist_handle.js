const db=require("../sql")

exports.getlist=(req,res)=>{
    const sql="select * from course where cid=?";
    db.query(sql,req.query.cid,(err,result)=>{
        if(err)
        return res.send(err.message);

        console.log(`/api/test?cid=${req.query.cid}`);
        return res.send(result)
    })
}