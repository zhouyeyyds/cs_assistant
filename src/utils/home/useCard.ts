import { mainstore } from '@/store/index';

const store=mainstore()

interface Icard{
    titel:string;
    svg:string,
    length:number
}

// 接收一个参数 表示要展示的类型
export const useCard=(type:string)=>{
    const name:string=  type=="lib"?"liblist":
                        type=="collect"?"bookmarks":
                        type=="error"?"error":''
    const card:Icard[]=[
        {
            titel:"计组",
            svg:"#icon-poco",
            length: type=="lib"?store.pocoList.length:
                    type=="collect"?store.pocoCollectlist.length:
                    type=="error"?store.pocoErrorlist.length:0
        },
        {
            titel:"计网",
            svg:"#icon-cnet",
            length: type=="lib"?store.cnetList.length:
                    type=="collect"?store.cnetCollectlist.length:
                    type=="error"?store.cnetErrorlist.length:0
        },
        {
            titel:"操作系统",
            svg:"#icon-os",
            length: type=="lib"?store.osList.length:
                    type=="collect"?store.osCollectlist.length:
                    type=="error"?store.osErrorlist.length:0
        },
        {
            titel:"数据结构",
            svg:"#icon-ds",
            length: type=="lib"?store.dsList.length:
                    type=="collect"?store.dsCollectlist.length:
                    type=="error"?store.dsErrorlist.length:0
        },

    ]

    return{
        name,card
    }
}