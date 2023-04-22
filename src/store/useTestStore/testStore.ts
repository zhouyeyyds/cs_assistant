import { defineStore } from "pinia";
import {Ianswer,Istatus} from "@/utils/type/answer"

export const useTestStore= defineStore("test",{
  state:()=>{
    return{
      rightnum:0,//答对的题数
      falsenum:0,//答错的题数
      count:0,//已经答题的数目
      index:0,//题目的索引
      statuslist:[] as Istatus[],//题目答题状态的数组
      answerlist:[] as number[],//题目是否被答过的数组
      pannellist:[] as number[],//题板的状态
      errorList:[] as Ianswer[],//当此的错题

      // 最近七次的模拟成绩
      pocoGrade:[0,0,0,0,0,0,0,],
      cnetGrade:[0,0,0,0,0,0,0,],
      osGrade:[0,0,0,0,0,0,0,],
      dsGrade:[0,0,0,0,0,0,0,],
    }
  },
  getters:{
    pocoAvg:(state)=>{
      let sum=0;
      for(let i=0;i<7;i++){
        sum+=state.pocoGrade[i]
      }
      return (sum/7).toFixed(0);
    },
    cnetAvg:(state)=>{
      let sum=0;
      for(let i=0;i<7;i++){
        sum+=state.cnetGrade[i]
      }
      return (sum/7).toFixed(0);
    },
    osAvg:(state)=>{
      let sum=0;
      for(let i=0;i<7;i++){
        sum+=state.osGrade[i]
      }
      return (sum/7).toFixed(0);
    },
    dsAvg:(state)=>{
      let sum=0;
      for(let i=0;i<7;i++){
        sum+=state.dsGrade[i]
      }
      return (sum/7).toFixed(0);
    },

  },
  actions:{
      
  },
  // 开启数据持久化缓存
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
      }
    ]
  }
})

