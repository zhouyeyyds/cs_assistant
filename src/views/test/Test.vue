<script setup lang="ts">
import Tabbar from "@/components/tabbar/Tabbar.vue"
import Card   from "@/components/test/Card.vue"
import {ref,reactive, watch, onBeforeUnmount,onMounted} from "vue"
import { useRouter } from "vue-router"
import {mainstore} from "@/store/index"


      const store=mainstore();
      const router=useRouter();

      const customColors =reactive([
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 },
      ]);
      const index=ref(0); 
      const namearr=ref(["计算机组成原理","计算机网络","操作系统","数据结构"])
      const showpop=ref(false);

      // 前往具体练习页面
      const gopractice=()=>{
        router.push({name:"practice",query:{id:Number(index.value+1)}})
      }

      // 开始测试
      const start=()=>{
        showpop.value=false;
        // 生成50个随机数
        while(store.randomList.length!=50){
          let num=Math.floor(Math.random()*store.list.length);
          if(!store.randomList.includes(num)){
            store.randomList.push(num)
          }
        }
        router.push({name:'simulate',query:{id:index.value+1}})
      }

      // 监视索引的变化 
     watch(index,(newval)=>{
        newval==0?store.list=store.pocoList:
        newval==1?store.list=store.cnetList:
        newval==2?store.list=store.osList:
        newval==3?store.list=store.dsList:0
     },{immediate:true})

</script>

<template>
    <!-- ui待优化 -->
    <div class="fixed left-0 top-0 flex-col f-b-c p-10px w-100% h-70px text-16px bg-white  navbar" >
      <p class="text-18px text-[#35a1fc]">当前科目 :</p>
      <span class="text-[#35a1fc]">{{ namearr[index] }}</span>
    </div>
    <!-- 标签栏 -->
    <div class="fixed left-0 top-71px w-100% mt-1px mb-2px shadow-sm" >
        <van-tabs v-model:active="index" swipeable  lazy-render>
          <van-tab title="计组" class="my-15px px-20px"/>
          <van-tab title="计网" class="my-15px px-20px"/>
          <van-tab title="操作系统" class="my-15px px-20px"/>
          <van-tab title="数据结构" class="my-15px px-20px"/>
        </van-tabs>
    </div>
    <div class="mt-116px f-b-c flex-col p-10px bg-white h-500px" >
      <!-- 练习进度条 -->
        <div class="m-y-20px m-x-10px" @click="gopractice">
            <el-progress type="circle" :percentage="store.count[index]/store.list.length*100" status="success" :color="customColors" :width="180" :indeterminate="true" :duration="5">
              <div class="flex-col">
                <span class="mt-10px text-17px">{{ store.count[index]?store.count[index]:0}}/{{store.list.length}}</span>
                <span class="mt-10px text-12px ">顺序练习</span>
              </div>
            </el-progress>  
        </div>

        <!-- 测试进度条 -->
        <div class="m-y-20px m-x-10px" @click="showpop=true">
          <el-progress type="dashboard" :percentage="store.historyGrade[index]" status="success" :color="customColors" :width="180" :indeterminate="true" :duration="5">
            <div class="flex-col">
              <span class=" mt-10px text-20px ">{{ store.historyGrade[index]?store.historyGrade[index]:0 }}</span>
              <span class="mt-10px text-12px  ">模拟考试</span>
            </div>
          </el-progress>
        </div>
        
        <!-- 提示测验内容 -->
        <van-popup v-model:show="showpop" :style="{ padding: '20px' ,width:'80%',height:'27%'}" round> 
          <div class="flex flex-col justify-between w-100% h-100%">
            <div>
              <span class="iconfont icon-kaoshi1"></span>
              <span class="ml-10px">模拟考试</span>
            </div>
            <div class="text-14px">考试时间：45分钟</div>
            <p class="text-14px">内容：判断题 50题</p>
            <p class="text-14px">总分：100分</p>
            <div class="text-14px ml-160px" >
              <span @click="showpop=false">取消</span>
              <span class="ml-30px text-[#35a1fc]" @click="start">确认</span>
            </div>
          </div>
        </van-popup>
    </div>
    <!-- 底部导航 -->
    <Tabbar></Tabbar>
</template>

<style  scoped>

</style>