import { mainstore } from "@/store";
import { ref,} from "vue";
import {getlist}  from "@/request/api/test"  //请求题目的接口
import { showToast } from 'vant';


    const store=mainstore();
    

interface Idata{
    name:string;
    key:string
}

export const useHome=()=>{
    const active=ref(0);
    const data:Idata[]=[
        {
            name:"浏览题库",
            key:"lib"
        },
        {
            name:"收藏夹",
            key:"collect"
        },
        {
            name:"错题本",
            key:"errorbook"
        },
        {
            name:"成绩分析",
            key:"analysis"
        },
    ]

    const tabs:string[]=[
        "计组","计网","操作系统","数据结构"
    ]

    // 调用接口访问数据库 获得题库
    const getAllList=async ()=>{
        if(store.pocoList.length==0){
            store.pocoList=(await getlist(1)).data;
            store.cnetList=(await getlist(2)).data;
            store.osList=(await getlist(3)).data;
            store.dsList=(await getlist(4)).data;
        }
      }

      
    const loading = ref(false);
    const onRefresh =async () => {
        loading.value=true;
        store.pocoList=(await getlist(1)).data;
        
        store.cnetList=(await getlist(2)).data;
        store.osList=(await getlist(3)).data;
        store.dsList=(await getlist(4)).data;
        showToast({
          message:'刷新成功',
          position:"bottom"
        });
        loading.value = false;
    };

    return{
        data,getAllList,active,tabs,loading,onRefresh
    }
}