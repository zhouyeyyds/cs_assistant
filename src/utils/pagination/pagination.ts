import {onMounted, ref} from "vue"

// 接收一个参数 表示要进行分页的数组
export const pagination=(list:any)=>{
    const sourList=list
    const currentPage=ref(1)
    const pageSize=10;
    const showlist=ref([]);

    const curshow=()=>{
        let begin=(currentPage.value-1)*pageSize;
        let end=currentPage.value*pageSize;
        showlist.value=sourList.slice(begin,end)
    }

    const changepage=()=>{
        curshow()
    }

    onMounted(()=>{
        curshow()
    })

    return{
        sourList,currentPage,pageSize,showlist,curshow,changepage
    }
}