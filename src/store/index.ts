import {  defineStore } from "pinia";
 
export const mainstore= defineStore("main",{
  state:()=>{
    return{
      rightnum:[0,0,0,0,0],//答对的题数数组
      falsenum:[0,0,0,0,0],//答错的题数数组
      count:[0,0,0,0],//各科已答题数
      list:[],//存放题目的数组

      index:[0,0,0,0,0],//题目的索引数组

      // 因为每一门课都需要一个数组 所以是二维数组
      statuslist:[[]],//题目答题状态的二维数组 
      answerlist:[[]],//题目是否被答过的二维数组
      pannellist:[[]],//题板的状态二维数组

      autoCollect:true,//错题自动收藏
      historyGrade:[],//历史成绩
      randomList:[],//随机数数组

      // 题库数组
      pocoList:[],
      cnetList:[],
      osList:[],
      dsList:[],

      // 收藏夹
      pocoCollectlist:[],//计组题目的收藏数组
      cnetCollectlist:[],//计网题目的收藏数组
      osCollectlist:[],//操作系统的收藏数组
      dsCollectlist:[],//数据结构的收藏数组
      
      // 错题本
      pocoErrorlist:[],//计组题目的错题数组
      cnetErrorlist:[],//计网题目的错题数组
      osErrorlist:[],//操作系统的错题数组
      dsErrorlist:[],//数据结构的错题数组
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

