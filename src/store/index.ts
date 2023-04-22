import {  defineStore } from "pinia";
import {Ianswer} from "@/utils/type/answer"

export const mainstore= defineStore("main",{
  state:()=>{
    return{
      rightnum:[0,0,0,0,0],//答对的题数数组
      falsenum:[0,0,0,0,0],//答错的题数数组
      count:[0,0,0,0],//各科已答题数
      list:[] as Ianswer[],//存放题目的数组

      index:[0,0,0,0,0],//题目的索引数组
      curIndex:0,//当前正在练习的科目的索引号

      // 因为每一门课都需要一个数组 所以是二维数组
      statuslist:[[]] as [Ianswer[]],//题目答题状态的二维数组 
      answerlist:[[]] as [Ianswer[]],//题目是否被答过的二维数组
      pannellist:[[]] as [Ianswer[]],//题板的状态二维数组

      autoCollect:true,//错题自动收藏
      historyGrade:[] as number[],//历史成绩
      randomList:[] as number[],//随机数数组

      // 题库数组
      pocoList:[] as Ianswer[],
      cnetList:[] as Ianswer[],
      osList:[] as Ianswer[],
      dsList:[] as Ianswer[],

      // 收藏夹
      pocoCollectlist:[] as Ianswer[],//计组题目的收藏数组
      cnetCollectlist:[] as Ianswer[],//计网题目的收藏数组
      osCollectlist:[] as Ianswer[],//操作系统的收藏数组
      dsCollectlist:[] as Ianswer[],//数据结构的收藏数组
      
      // 错题本
      pocoErrorlist:[] as Ianswer[],//计组题目的错题数组
      cnetErrorlist:[] as Ianswer[],//计网题目的错题数组
      osErrorlist:[] as Ianswer[],//操作系统的错题数组
      dsErrorlist:[] as Ianswer[],//数据结构的错题数组

      searchHistory:[] as string[],//搜索历史
    }
  },
  getters:{
    falsecount(store){//计算出所有的错题数
      return store.pocoErrorlist.length+store.cnetErrorlist.length+store.osErrorlist.length+store.dsErrorlist.length
    },
    collectcount(store){//计算出所有的收藏数
      return store.pocoCollectlist.length+store.cnetCollectlist.length+store.osCollectlist.length+store.dsCollectlist.length
    }
  },
  actions:{
      
  },
  // 开启数据持久化缓存
  // persist: {
  //   enabled: true,
  //   strategies: [
  //     {
  //       storage: localStorage,
  //     }
  //   ]
  // }
})

