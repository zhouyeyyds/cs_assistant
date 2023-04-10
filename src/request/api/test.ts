import service from "..";
export const getlist=(cid:number)=>{
    return service({
        method:"GET",
        url:`/api/test?cid=${cid}`
    })
}