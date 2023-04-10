import service from "..";
export const send=(suggestion:string,date:string)=>{
    return service({
        method:"GET",
        url:`/api/send?suggestion=${suggestion}&date=${date}`
    })
}